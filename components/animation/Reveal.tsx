"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { EASE, STAGGER } from "@/lib/animations";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: boolean;
  className?: string;
  as?: ElementType;
};

/* ============================================================
   The workhorse entrance.

   Critical detail: the hidden state is applied by GSAP, not by
   CSS. If it lived in a stylesheet, anyone with reduced motion
   or a JS failure would be left staring at invisible content.
   Here the content ships visible and JS chooses to hide it.
   ============================================================ */
export default function Reveal({
  children,
  delay = 0,
  y = 40,
  stagger = false,
  className,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : [el];
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay,
          ease: EASE.out,
          stagger: stagger ? STAGGER.base : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, y, stagger]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
