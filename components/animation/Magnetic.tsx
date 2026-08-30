"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, isCoarsePointer } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { EASE } from "@/lib/animations";

type Props = {
  children: ReactNode;
  /** How far the element follows the pointer, as a fraction of the offset. */
  strength?: number;
  className?: string;
};

/* ============================================================
   Magnetic pull.

   The one place elastic easing is allowed: on release, because
   a physical object that was pulled and let go should overshoot.
   Used for ambient motion it just reads as wobbly.
   ============================================================ */
export default function Magnetic({
  children,
  strength = 0.4,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isCoarsePointer()) return;

    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: EASE.out });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: EASE.out });

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };

      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: EASE.elastic });
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    }, ref);

    return () => ctx.revert();
  }, [strength]);

  return (
    <div ref={ref} data-magnetic className={className}>
      {children}
    </div>
  );
}
