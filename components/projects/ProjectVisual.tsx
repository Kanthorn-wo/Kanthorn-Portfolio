"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { seededRandom } from "@/lib/animations";
import { readThemeColors } from "@/lib/theme";

/* ============================================================
   PROJECT VISUAL

   Screenshots are optional. When a project has no `image`, this
   draws a mesh seeded from the project id - deterministic, so
   the same project always gets the same figure, and distinct,
   so the cards never look interchangeable.

   It is the same visual language as the page-wide network,
   which is the point: the portfolio illustrates itself rather
   than borrowing stock imagery while it waits for assets.
   ============================================================ */
export default function ProjectVisual({
  seed,
  image,
  alt,
}: {
  seed: string;
  image?: string;
  alt: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (image) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = rect.width;
      const h = rect.height;
      if (w === 0 || h === 0) return;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const colors = readThemeColors();
      const rand = seededRandom(seed);

      const count = 34;
      const nodes = Array.from({ length: count }, () => ({
        x: rand() * w,
        y: rand() * h,
        z: rand(),
      }));

      // gradient wash, angled per-seed so each project reads differently
      const angle = rand() * Math.PI;
      const g = ctx.createLinearGradient(
        w / 2 - (Math.cos(angle) * w) / 2,
        h / 2 - (Math.sin(angle) * h) / 2,
        w / 2 + (Math.cos(angle) * w) / 2,
        h / 2 + (Math.sin(angle) * h) / 2
      );
      const [pr, pg, pb] = colors.accentPurple;
      const [cr, cg, cb] = colors.accentCyan;
      g.addColorStop(0, `rgba(${pr},${pg},${pb},0.18)`);
      g.addColorStop(1, `rgba(${cr},${cg},${cb},0.14)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // links
      const [lr, lg, lb] = colors.link;
      ctx.lineWidth = 1;
      const maxD = Math.min(w, h) * 0.42;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const a = nodes[i];
          const b = nodes[j];
          if (Math.abs(a.z - b.z) > 0.4) continue;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > maxD) continue;
          const alpha = (1 - d / maxD) * 0.3 * ((a.z + b.z) / 2 + 0.35);
          ctx.strokeStyle = `rgba(${lr},${lg},${lb},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // nodes
      const [nr, ng, nb] = colors.particle;
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${nr},${ng},${nb},${0.2 + n.z * 0.55})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 0.9 + n.z * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Draw once on mount, and again if the theme or size changes.
    draw();

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    });
    ro.observe(canvas);

    const mo = new MutationObserver(() => {
      // Wait out the 400ms token transition so colours are settled.
      window.setTimeout(draw, 420);
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      mo.disconnect();
    };
  }, [seed, image]);

  if (image) {
    return (
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="h-full w-full"
    />
  );
}
