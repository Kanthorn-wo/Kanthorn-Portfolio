"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { useTheme } from "./ThemeProvider";

/* A single sliding knob inside a hairline track. The knob carries
   the accent gradient - one of the few places accent is allowed. */
export default function ThemeToggle() {
  const t = useTranslations("theme");
  const { theme, toggle } = useTheme();
  const knobRef = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const knob = knobRef.current;
    if (!knob) return;
    gsap.to(knob, {
      xPercent: theme === "light" ? 100 : 0,
      duration: prefersReducedMotion() ? 0 : 0.45,
      ease: "power3.inOut",
    });
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? t("switchToLight") : t("switchToDark")}
      aria-pressed={theme === "light"}
      data-cursor="open"
      className="relative h-6 w-11 shrink-0 rounded-full border border-[var(--line-strong)] p-[3px] transition-colors hover:border-[var(--accent-cyan)]"
    >
      <span
        ref={knobRef}
        aria-hidden="true"
        className="block h-[16px] w-[16px] rounded-full bg-[linear-gradient(120deg,var(--accent-purple),var(--accent-cyan))]"
      />
    </button>
  );
}
