"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { marqueeWords } from "@/data/skills";
import { clamp } from "@/lib/animations";

/* ============================================================
   MARQUEE

   The reason this earns its place: it reads scroll velocity and
   feeds it into timeScale, and it flips direction with the
   scroll. The band stops being decoration and becomes a readout
   of how you are moving - the page acquires a sense of momentum.
   ============================================================ */
export default function Marquee() {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const track = root.querySelector<HTMLElement>(".marquee-track");
      if (!track) return;

      // -50% because the content is duplicated exactly once.
      const tl = gsap.to(track, {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });

      let direction = 1;

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          if (v === 0) return;

          const nextDir = v > 0 ? 1 : -1;
          if (nextDir !== direction) {
            direction = nextDir;
            gsap.to(tl, { timeScale: direction, duration: 0.4 });
          }

          // Nudge, do not launch. Clamped so a flick never turns
          // the band into an unreadable blur.
          const boost = clamp(Math.abs(v) / 900, 0, 3.5);
          gsap.to(tl, {
            timeScale: direction * (1 + boost),
            duration: 0.2,
            overwrite: true,
            onComplete: () => {
              gsap.to(tl, { timeScale: direction, duration: 1.2 });
            },
          });
        },
      });

      return () => {
        st.kill();
        tl.kill();
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const words = [...marqueeWords, ...marqueeWords];

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="relative z-10 overflow-hidden border-y border-[var(--line)] py-6 md:py-10"
    >
      <div className="marquee-track flex w-max items-center gap-10 will-change-transform md:gap-16">
        {words.map((w, i) => (
          <span key={w + i} className="flex items-center gap-10 md:gap-16">
            <span className="font-display text-[clamp(2rem,6vw,5rem)] font-bold uppercase tracking-[-0.04em]">
              {w}
            </span>
            <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent-cyan)]" />
          </span>
        ))}
      </div>
    </div>
  );
}
