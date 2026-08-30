"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { readThemeColors } from "@/lib/theme";
import Magnetic from "@/components/animation/Magnetic";

/* ============================================================
   PLAYGROUND EXPERIMENTS

   These are live, not screenshots of live things. The section
   claims the author understands animation, so the section has
   to actually demonstrate it under the visitor's own pointer.
   ============================================================ */

const box =
  "relative flex h-full w-full items-center justify-center overflow-hidden";

/* -------------------------------------------- 01 Magnetic */
export function MagneticDemo() {
  return (
    <div className={box}>
      <Magnetic strength={0.6}>
        <button
          type="button"
          className="rounded-full border border-[var(--line-strong)] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
        >
          Pull me
        </button>
      </Magnetic>
    </div>
  );
}

/* -------------------------------------------- 02 Particle node */
export function NetworkDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (prefersReducedMotion()) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const pts = Array.from({ length: 26 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0012,
      vy: (Math.random() - 0.5) * 0.0012,
    }));
    const pointer = { x: -1, y: -1, on: false };

    const size = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loop = () => {
      const c = readThemeColors();
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
      }

      const screen = pts.map((p) => {
        let x = p.x * w;
        let y = p.y * h;
        if (pointer.on) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < 90 && d > 0.01) {
            const f = (1 - d / 90) ** 2 * 26;
            x += (dx / d) * f;
            y += (dy / d) * f;
          }
        }
        return { x, y };
      });

      const [lr, lg, lb] = c.link;
      ctx.lineWidth = 1;
      for (let i = 0; i < screen.length; i++) {
        for (let j = i + 1; j < screen.length; j++) {
          const d = Math.hypot(
            screen[i].x - screen[j].x,
            screen[i].y - screen[j].y
          );
          if (d > 88) continue;
          ctx.strokeStyle = `rgba(${lr},${lg},${lb},${(1 - d / 88) * 0.4})`;
          ctx.beginPath();
          ctx.moveTo(screen[i].x, screen[i].y);
          ctx.lineTo(screen[j].x, screen[j].y);
          ctx.stroke();
        }
      }

      const [nr, ng, nb] = c.particle;
      ctx.fillStyle = `rgba(${nr},${ng},${nb},0.7)`;
      for (const s of screen) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(loop);
    };

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.on = true;
    };
    const leave = () => {
      pointer.on = false;
    };

    size();
    loop();
    const ro = new ResizeObserver(size);
    ro.observe(canvas);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}

/* -------------------------------------------- 03 Scroll reveal */
export function RevealDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".rd-bar", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.9,
        stagger: 0.06,
        ease: "power4.out",
      });
    }, ref);
    return () => ctx.revert();
  }, [key]);

  return (
    <button
      type="button"
      onClick={() => setKey((k) => k + 1)}
      className={box + " cursor-pointer"}
      aria-label="Replay reveal animation"
    >
      <div ref={ref} className="flex h-1/2 items-end gap-1.5" key={key}>
        {[0.4, 0.7, 1, 0.55, 0.85, 0.3, 0.65].map((v, i) => (
          <span
            key={i}
            className="rd-bar w-2 rounded-sm bg-[linear-gradient(to_top,var(--accent-purple),var(--accent-cyan))]"
            style={{ height: `${v * 100}%` }}
          />
        ))}
      </div>
    </button>
  );
}

/* -------------------------------------------- 04 Text distortion */
export function DistortionDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const text = "DISTORT";

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const chars = Array.from(el.querySelectorAll<HTMLElement>(".dd-char"));
    const setters = chars.map((c) => ({
      y: gsap.quickTo(c, "y", { duration: 0.5, ease: "power3.out" }),
      skew: gsap.quickTo(c, "skewX", { duration: 0.5, ease: "power3.out" }),
      scale: gsap.quickTo(c, "scaleY", { duration: 0.5, ease: "power3.out" }),
    }));

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = e.clientX - r.left;
      chars.forEach((c, i) => {
        const cr = c.getBoundingClientRect();
        const cx = cr.left - r.left + cr.width / 2;
        const d = Math.abs(px - cx);
        const f = Math.max(0, 1 - d / 120);
        setters[i].y(-f * 22);
        setters[i].skew(-f * 14);
        setters[i].scale(1 + f * 0.35);
      });
    };
    const leave = () => {
      setters.forEach((s) => {
        s.y(0);
        s.skew(0);
        s.scale(1);
      });
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className={box}>
      <div ref={ref} className="flex" aria-label={text}>
        {text.split("").map((ch, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="dd-char inline-block font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-[-0.02em] will-change-transform"
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------- 05 Parallax tilt */
export function TiltDemo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const card = el.querySelector<HTMLElement>(".tilt-card");
    const layerA = el.querySelector<HTMLElement>(".tilt-a");
    const layerB = el.querySelector<HTMLElement>(".tilt-b");
    if (!card || !layerA || !layerB) return;

    const rx = gsap.quickTo(card, "rotateX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(card, "rotateY", { duration: 0.6, ease: "power3.out" });
    const ax = gsap.quickTo(layerA, "x", { duration: 0.6, ease: "power3.out" });
    const ay = gsap.quickTo(layerA, "y", { duration: 0.6, ease: "power3.out" });
    const bx = gsap.quickTo(layerB, "x", { duration: 0.6, ease: "power3.out" });
    const by = gsap.quickTo(layerB, "y", { duration: 0.6, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      ry(nx * 22);
      rx(-ny * 22);
      // layers move at different rates - that is the parallax
      ax(nx * 16);
      ay(ny * 16);
      bx(nx * 34);
      by(ny * 34);
    };
    const leave = () => {
      rx(0); ry(0); ax(0); ay(0); bx(0); by(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={box} style={{ perspective: "800px" }}>
      <div
        className="tilt-card relative h-24 w-40 rounded-lg border border-[var(--line-strong)] bg-[var(--bg-elevated)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <span className="tilt-a absolute left-4 top-4 font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">
          LAYER 01
        </span>
        <span className="tilt-b absolute bottom-4 right-4 h-6 w-6 rounded-full bg-[linear-gradient(120deg,var(--accent-purple),var(--accent-cyan))]" />
      </div>
    </div>
  );
}

/* -------------------------------------------- 06 Scramble text */
const SCRAMBLE_GLYPHS = "!<>-_\\/[]{}=+*^?#01";
const SCRAMBLE_WORD = "MOTION";

export function ScrambleDemo() {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    el.textContent = SCRAMBLE_WORD;
    if (prefersReducedMotion()) return;

    // Direct textContent writes on an rAF loop, not React state - a
    // re-render per glyph flip would be paid for nothing, since the
    // DOM node itself is the only thing that needs to change.
    let raf = 0;
    let frame = 0;
    let running = false;

    const run = () => {
      let output = "";
      let settled = true;
      for (let i = 0; i < SCRAMBLE_WORD.length; i++) {
        const revealAt = i * 3 + 6; // left-to-right cascade
        if (frame >= revealAt) {
          output += SCRAMBLE_WORD[i];
        } else {
          output +=
            SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
          settled = false;
        }
      }
      el.textContent = output;
      frame++;
      if (!settled) {
        raf = requestAnimationFrame(run);
      } else {
        running = false;
      }
    };

    const onEnter = () => {
      if (running) return;
      running = true;
      frame = 0;
      raf = requestAnimationFrame(run);
    };

    el.addEventListener("pointerenter", onEnter);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return (
    <div className={box}>
      <span
        ref={spanRef}
        className="font-mono text-[clamp(1.15rem,2.4vw,1.5rem)] font-medium uppercase tracking-[0.1em]"
      />
    </div>
  );
}
