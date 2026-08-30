"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { driver } from "@/lib/particleDriver";
import { readThemeColors, type ThemeColors } from "@/lib/theme";
import { clamp, lerp } from "@/lib/animations";

/* ============================================================
   INTERACTIVE NEURAL NETWORK

   One canvas for the entire page. It never unmounts and never
   re-renders - sections steer it through the shared `driver`
   object and this loop reads that object every frame.

   Two things make it hold 60fps:
   1. A spatial hash grid, so neighbour lookup is O(n) instead
      of the O(n^2) every-pair scan the old site used.
   2. Alpha bucketing, so ~500 links become 6 draw calls
      instead of 500 stroke() calls.

   Depth is real: each particle carries a z in [0,1] that drives
   radius, alpha and parallax together, and links only form
   between particles at similar depth. That is what separates
   this from a flat mesh.
   ============================================================ */

const LINK_DIST = 132;
const Z_BAND = 0.35; // only connect particles within this depth difference
const MOUSE_RADIUS = 190;
const MOUSE_PUSH = 34;
const PARALLAX = 46;
const ALPHA_BUCKETS = 6;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number;
  /** screen-space position after parallax + mouse displacement */
  sx: number;
  sy: number;
};

function particleCountFor(width: number) {
  if (width < 640) return 60;
  if (width < 1024) return 90;
  if (width < 1440) return 120;
  return 160;
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];

    /* Mouse is lerped toward the raw pointer, never read directly.
       Raw values make the field twitch; the lag gives it weight. */
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    let colors: ThemeColors = readThemeColors();
    /* Live colour values, tweened by GSAP on theme change so the
       canvas crossfades in step with the CSS transition. */
    const rgb = {
      pr: colors.particle[0],
      pg: colors.particle[1],
      pb: colors.particle[2],
      lr: colors.link[0],
      lg: colors.link[1],
      lb: colors.link[2],
      linkMax: colors.linkMax,
      ar: colors.accentCyan[0],
      ag: colors.accentCyan[1],
      ab: colors.accentCyan[2],
    };

    // ---------------------------------------------------------- setup

    function seed() {
      const count = particleCountFor(width);
      particles = new Array(count).fill(null).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        z: Math.random(),
        sx: 0,
        sy: 0,
      }));
      /* Sorted back-to-front so nearer particles paint over farther
         ones without needing a depth test. */
      particles.sort((a, b) => a.z - b.z);
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) render();
    }

    // ---------------------------------------------------------- grid

    let cols = 0;
    let rows = 0;
    let grid: number[][] = [];

    function buildGrid() {
      cols = Math.max(1, Math.ceil(width / LINK_DIST));
      rows = Math.max(1, Math.ceil(height / LINK_DIST));
      const cells = cols * rows;
      if (grid.length !== cells) {
        grid = new Array(cells).fill(null).map(() => [] as number[]);
      } else {
        for (let i = 0; i < cells; i++) grid[i].length = 0;
      }
    }

    // ---------------------------------------------------------- render

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const globalOpacity = driver.opacity;
      if (globalOpacity <= 0.001) return;

      const activeCount = Math.max(
        0,
        Math.floor(particles.length * driver.density)
      );
      if (activeCount === 0) return;

      // ease the mouse toward its target
      if (mouse.active) {
        mouse.x = lerp(mouse.x, mouse.tx, 0.12);
        mouse.y = lerp(mouse.y, mouse.ty, 0.12);
      }

      const cx = width / 2;
      const cy = height / 2;
      const mpx = mouse.active ? ((mouse.x - cx) / width) * PARALLAX : 0;
      const mpy = mouse.active ? ((mouse.y - cy) / height) * PARALLAX : 0;

      buildGrid();

      // ---- integrate + project ----
      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];

        if (!reduced) {
          const depthSpeed = 0.4 + p.z * 0.6; // nearer particles travel faster
          p.x += (p.vx * depthSpeed + driver.drift * p.z) * driver.speed;
          p.y += p.vy * depthSpeed * driver.speed;

          // converge toward centre (the closing ending-scene move)
          if (driver.converge > 0) {
            p.x += (cx - p.x) * 0.0016 * driver.converge;
            p.y += (cy - p.y) * 0.0016 * driver.converge;
          }

          // wrap with margin so particles never pop at the edge
          const m = 60;
          if (p.x < -m) p.x = width + m;
          else if (p.x > width + m) p.x = -m;
          if (p.y < -m) p.y = height + m;
          else if (p.y > height + m) p.y = -m;
        }

        let sx = p.x + mpx * p.z;
        let sy = p.y + mpy * p.z;

        // mouse repulsion - displacement only, so it always settles back
        if (mouse.active && !reduced) {
          const dx = sx - mouse.x;
          const dy = sy - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_RADIUS * MOUSE_RADIUS && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = 1 - d / MOUSE_RADIUS;
            const push = f * f * MOUSE_PUSH * (0.35 + p.z * 0.65);
            sx += (dx / d) * push;
            sy += (dy / d) * push;
          }
        }

        p.sx = sx;
        p.sy = sy;

        const gxi = clamp(Math.floor(sx / LINK_DIST), 0, cols - 1);
        const gyi = clamp(Math.floor(sy / LINK_DIST), 0, rows - 1);
        grid[gyi * cols + gxi].push(i);
      }

      // ---- links, bucketed by alpha ----
      const linkCeiling = rgb.linkMax * globalOpacity * driver.linkAlpha;

      if (linkCeiling > 0.004) {
        const linkPaths: Path2D[] = [];
        for (let b = 0; b < ALPHA_BUCKETS; b++) linkPaths.push(new Path2D());

        for (let i = 0; i < activeCount; i++) {
          const p = particles[i];
          const gx = clamp(Math.floor(p.sx / LINK_DIST), 0, cols - 1);
          const gy = clamp(Math.floor(p.sy / LINK_DIST), 0, rows - 1);

          for (let oy = -1; oy <= 1; oy++) {
            const ny = gy + oy;
            if (ny < 0 || ny >= rows) continue;
            for (let ox = -1; ox <= 1; ox++) {
              const nx = gx + ox;
              if (nx < 0 || nx >= cols) continue;

              const cell = grid[ny * cols + nx];
              for (let k = 0; k < cell.length; k++) {
                const j = cell[k];
                if (j <= i) continue; // visit each pair once
                const q = particles[j];

                // depth banding: this is what creates visible strata
                const dz = p.z - q.z;
                if (dz > Z_BAND || dz < -Z_BAND) continue;

                const dx = p.sx - q.sx;
                const dy = p.sy - q.sy;
                const d2 = dx * dx + dy * dy;
                if (d2 > LINK_DIST * LINK_DIST) continue;

                const d = Math.sqrt(d2);
                const zAvg = (p.z + q.z) * 0.5;
                const closeness = 1 - d / LINK_DIST;
                const bandFade = 1 - Math.abs(dz) / Z_BAND;
                const a =
                  closeness * bandFade * (0.25 + zAvg * 0.75) * linkCeiling;
                if (a < 0.004) continue;

                const bucket = Math.min(
                  ALPHA_BUCKETS - 1,
                  Math.floor((a / linkCeiling) * ALPHA_BUCKETS)
                );
                linkPaths[bucket].moveTo(p.sx, p.sy);
                linkPaths[bucket].lineTo(q.sx, q.sy);
              }
            }
          }
        }

        ctx.lineWidth = 1;
        for (let b = 0; b < ALPHA_BUCKETS; b++) {
          const a = ((b + 0.5) / ALPHA_BUCKETS) * linkCeiling;
          ctx.strokeStyle =
            "rgba(" +
            (rgb.lr | 0) +
            "," +
            (rgb.lg | 0) +
            "," +
            (rgb.lb | 0) +
            "," +
            a +
            ")";
          ctx.stroke(linkPaths[b]);
        }
      }

      // ---- nodes, also bucketed ----
      const nodeBuckets: Particle[][] = [];
      for (let b = 0; b < ALPHA_BUCKETS; b++) nodeBuckets.push([]);

      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];
        const zEff = clamp(p.z + driver.zOffset, 0, 1.4);
        const a = lerp(0.12, 0.78, Math.min(zEff, 1)) * globalOpacity;
        if (a < 0.004) continue;
        const bucket = Math.min(
          ALPHA_BUCKETS - 1,
          Math.floor((a / globalOpacity) * ALPHA_BUCKETS)
        );
        nodeBuckets[bucket].push(p);
      }

      // accent mix: nodes tint toward the accent as `accent` rises
      const nr = lerp(rgb.pr, rgb.ar, driver.accent);
      const ng = lerp(rgb.pg, rgb.ag, driver.accent);
      const nb = lerp(rgb.pb, rgb.ab, driver.accent);
      const nodeColor =
        "rgba(" + (nr | 0) + "," + (ng | 0) + "," + (nb | 0) + ",";

      for (let b = 0; b < ALPHA_BUCKETS; b++) {
        const list = nodeBuckets[b];
        if (!list.length) continue;
        const a = ((b + 0.5) / ALPHA_BUCKETS) * globalOpacity;
        ctx.fillStyle = nodeColor + a + ")";
        ctx.beginPath();
        for (let i = 0; i < list.length; i++) {
          const p = list[i];
          const zEff = clamp(p.z + driver.zOffset, 0, 1.4);
          const r = lerp(0.7, 2.4, Math.min(zEff, 1));
          ctx.moveTo(p.sx + r, p.sy);
          ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    }

    // ---------------------------------------------------------- events

    function onPointerMove(e: PointerEvent) {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      if (!mouse.active) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
      }
    }
    function onPointerLeave() {
      mouse.active = false;
      mouse.x = mouse.y = mouse.tx = mouse.ty = -9999;
    }

    let resizeTimer: number | undefined;
    function onResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    }

    /* Theme change: tween the canvas colours so they land in step
       with the 400ms CSS token transition. */
    const themeObserver = new MutationObserver(() => {
      colors = readThemeColors();
      gsap.to(rgb, {
        pr: colors.particle[0],
        pg: colors.particle[1],
        pb: colors.particle[2],
        lr: colors.link[0],
        lg: colors.link[1],
        lb: colors.link[2],
        linkMax: colors.linkMax,
        ar: colors.accentCyan[0],
        ag: colors.accentCyan[1],
        ab: colors.accentCyan[2],
        duration: 0.4,
        ease: "power2.inOut",
        onUpdate: reduced ? render : undefined,
      });
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    resize();
    window.addEventListener("resize", onResize);
    if (!coarse) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
    }

    /* Reduced motion gets one static frame and no loop at all -
       the field stays visible, it just does not move. */
    if (reduced) {
      driver.opacity = 0.18;
      render();
    } else {
      gsap.ticker.add(render);
    }

    return () => {
      gsap.ticker.remove(render);
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
