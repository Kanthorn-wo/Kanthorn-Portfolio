"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";

/* ============================================================
   CUSTOM CURSOR

   A fast dot and a slow ring. The lag between them is the whole
   point - it gives the pointer weight instead of making it feel
   like a sticker glued to the mouse.

   Hover states are read through ONE delegated listener on the
   document rather than a listener per element, so adding
   data-cursor to new markup costs nothing.
   ============================================================ */

const LABELS: Record<string, string> = {
  view: "VIEW",
  open: "OPEN",
  explore: "EXPLORE",
  send: "SEND",
};

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isCoarsePointer() || prefersReducedMotion()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.documentElement.setAttribute("data-custom-cursor", "on");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    // quickTo keeps this off the tween-creation path entirely.
    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    let visible = false;
    let magneticEl: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }

      let x = e.clientX;
      let y = e.clientY;

      /* When over a magnetic target the ring is pulled toward its
         centre, so the cursor visibly "locks on" before the click. */
      if (magneticEl) {
        const r = magneticEl.getBoundingClientRect();
        const mx = r.left + r.width / 2;
        const my = r.top + r.height / 2;
        x += (mx - x) * 0.35;
        y += (my - y) * 0.35;
      }

      dotX(e.clientX);
      dotY(e.clientY);
      ringX(x);
      ringY(y);
    };

    const setState = (kind: string | null, el: HTMLElement | null) => {
      magneticEl = el && el.hasAttribute("data-magnetic") ? el : null;

      if (kind && LABELS[kind]) {
        label.textContent = LABELS[kind];
        gsap.to(ring, {
          width: 74,
          height: 74,
          borderColor: "var(--accent-cyan)",
          backgroundColor: "color-mix(in srgb, var(--accent-cyan) 12%, transparent)",
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(label, { opacity: 1, duration: 0.3 });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      } else {
        gsap.to(ring, {
          width: 32,
          height: 32,
          borderColor: "var(--line-strong)",
          backgroundColor: "transparent",
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(label, { opacity: 0, duration: 0.2 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const hit = target?.closest<HTMLElement>("[data-cursor]");
      setState(hit?.getAttribute("data-cursor") ?? null, hit ?? null);
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.removeAttribute("data-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[120]">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line-strong)] opacity-0"
      >
        <span
          ref={labelRef}
          className="font-mono text-[9px] tracking-[0.18em] text-[var(--text)] opacity-0"
        />
      </div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-[var(--accent-cyan)] opacity-0"
      />
    </div>
  );
}
