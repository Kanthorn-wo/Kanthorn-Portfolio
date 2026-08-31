"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { driver } from "@/lib/particleDriver";
import { DRIVER_STATES } from "@/lib/particleDriver";
import { site } from "@/data/site";
import { pick } from "@/lib/localized";

const SESSION_KEY = "kw-preloaded";

/* ============================================================
   PRELOADER

   ~1.2s, and it never blocks a second visit within the session.
   The counter animates a plain object, not React state, so the
   whole thing costs zero renders.

   It exits with a clip-path wipe rather than a fade because the
   wipe reads as a curtain opening onto the hero, which is the
   only reason to have a preloader at all.
   ============================================================ */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const t = useTranslations("preloader");
  const locale = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  const [skip] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Already seen this session, or motion is unwelcome: go straight in.
    if (skip || prefersReducedMotion()) {
      gsap.set(root, { display: "none" });
      /* Under reduced motion the canvas has already drawn its single
         static frame at its own opacity and there is no ticker to
         redraw it, so leave the driver alone. */
      if (!prefersReducedMotion()) {
        driver.opacity = DRIVER_STATES.hero.opacity;
      }
      onDone();
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode - the preloader simply runs again next time */
    }

    const ctx = gsap.context(() => {
      const progress = { value: 0 };
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          onDone();
        },
      });

      tl.fromTo(
        [nameRef.current, roleRef.current],
        { yPercent: 120 },
        { yPercent: 0, duration: 0.7, stagger: 0.08, ease: "power4.out" },
        0
      )
        .to(
          progress,
          {
            value: 100,
            duration: 1.0,
            ease: "power2.inOut",
            onUpdate: () => {
              const v = Math.round(progress.value);
              if (counterRef.current) {
                counterRef.current.textContent =
                  String(v).padStart(2, "0") + "%";
              }
              if (barRef.current) {
                barRef.current.style.transform = `scaleX(${progress.value / 100})`;
              }
            },
          },
          0.1
        )
        // Bring the particle field up underneath, so the wipe reveals
        // a hero that is already alive rather than one that pops in.
        .to(driver, { opacity: DRIVER_STATES.hero.opacity, duration: 0.9 }, 0.5)
        .to([nameRef.current, roleRef.current], {
          yPercent: -120,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.in",
        })
        .to(
          [counterRef.current, barRef.current?.parentElement ?? null],
          { opacity: 0, duration: 0.4 },
          "<"
        )
        .to(
          root,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.9,
            ease: "expo.inOut",
          },
          "-=0.15"
        )
        .set(root, { display: "none" });
    }, rootRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [skip, onDone]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[150] flex flex-col justify-between bg-[var(--bg)] px-6 py-8 md:px-12 md:py-12"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="type-meta">{t("loading")}</div>

      <div className="flex flex-col gap-3">
        <div className="line-mask">
          <div ref={nameRef} className="font-display text-[clamp(1.75rem,6vw,4.5rem)] font-bold uppercase leading-none tracking-[-0.03em]">
            {site.firstName}{" "}
            <span className="gradient-text">{site.lastName}</span>
          </div>
        </div>
        <div className="line-mask">
          <div ref={roleRef} className="type-meta">
            / {pick(site.role, locale)}
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="h-px flex-1 bg-[var(--line)]">
          <span
            ref={barRef}
            className="block h-full origin-left bg-[linear-gradient(90deg,var(--accent-purple),var(--accent-cyan))]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <span
          ref={counterRef}
          className="font-mono text-[clamp(1.5rem,4vw,2.5rem)] font-medium tabular-nums leading-none"
        >
          00%
        </span>
      </div>
    </div>
  );
}
