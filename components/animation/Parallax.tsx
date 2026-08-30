"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

type Props = {
  children: ReactNode;
  /** Positive drifts slower than scroll (recedes), negative moves ahead of it. */
  speed?: number;
  /** Parallax on the x axis instead of y. */
  axis?: "x" | "y";
  className?: string;
  as?: ElementType;
};

/* Layered depth via scrub. Half strength below 768px, where the
   viewport is too short for large offsets to read as anything but
   content jumping around. */
export default function Parallax({
  children,
  speed = 0.2,
  axis = "y",
  className,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const distance = () => {
        const scale = window.innerWidth < 768 ? 0.5 : 1;
        return speed * 100 * scale;
      };

      gsap.fromTo(
        el,
        { [axis]: () => -distance() },
        {
          [axis]: () => distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [speed, axis]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
