"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import {
  driver,
  DRIVER_STATES,
  type DriverStateName,
} from "@/lib/particleDriver";

type Props = {
  state: DriverStateName;
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
};

/* ============================================================
   Hands a section control of the shared particle field.

   Wrapping a section in this is the ONLY thing needed to give it
   its own particle behaviour - it tweens the shared driver object
   on enter and back on leave. Because the driver is a plain
   object and the canvas polls it, this produces zero re-renders
   no matter how many sections are on screen.
   ============================================================ */
export default function SectionDriver({
  state,
  children,
  className,
  id,
  as: Tag = "section",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const target = DRIVER_STATES[state];

      const apply = () => {
        gsap.to(driver, {
          ...target,
          duration: 1.2,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      };

      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          // Fires once the section owns the majority of the viewport,
          // so the field settles into place rather than flickering
          // between states at every boundary.
          start: "top 60%",
          end: "bottom 40%",
          onEnter: apply,
          onEnterBack: apply,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [state]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement & HTMLDivElement>}
      id={id}
      className={className}
    >
      {children}
    </Tag>
  );
}
