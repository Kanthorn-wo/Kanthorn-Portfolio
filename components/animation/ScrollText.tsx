"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { EASE, STAGGER } from "@/lib/animations";

type Props = {
  children: ReactNode;
  /** Split granularity. Words read as editorial; chars read as techy. */
  mode?: "words" | "lines" | "chars";
  /** Entry direction. Alternate deliberately between lines - never randomly. */
  from?: "left" | "right" | "up";
  scrub?: boolean;
  className?: string;
};

/* ============================================================
   Scroll-linked text reveal built on SplitText.

   SplitText is reverted on cleanup so the DOM returns to plain
   text nodes - otherwise screen readers and fast-refresh both
   end up walking a tree of orphaned per-word spans.
   ============================================================ */
export default function ScrollText({
  children,
  mode = "words",
  from = "up",
  scrub = false,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let split: InstanceType<typeof SplitText> | null = null;

    const ctx = gsap.context(() => {
      split = new SplitText(el, {
        type: mode,
        // Masking each piece gives the clean editorial slide rather
        // than a fade, which is what keeps it feeling printed.
        mask: mode === "lines" ? "lines" : undefined,
        // Without a linesClass, GSAP's mask wrapper gets no class at
        // all (SplitText only appends "-mask" to a class the line
        // already has). Naming it gives globals.css something to
        // target for the same descender-padding fix .line-mask uses.
        linesClass: mode === "lines" ? "st-line" : undefined,
      });

      const targets =
        mode === "words" ? split.words : mode === "chars" ? split.chars : split.lines;

      const fromVars =
        from === "left"
          ? { xPercent: -60, opacity: 0 }
          : from === "right"
            ? { xPercent: 60, opacity: 0 }
            : { yPercent: 110, opacity: 0 };

      gsap.fromTo(
        targets,
        fromVars,
        {
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          duration: scrub ? 1 : 1.1,
          ease: EASE.outStrong,
          stagger: STAGGER.base,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: scrub ? "bottom 55%" : undefined,
            scrub: scrub ? 1 : false,
            once: !scrub,
          },
        }
      );
    }, ref);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, [mode, from, scrub]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
