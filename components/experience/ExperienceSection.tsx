"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { experience } from "@/data/experience";
import { sectionMeta } from "@/data/site";
import { pick } from "@/lib/localized";
import type { Locale } from "@/i18n/routing";

/* ============================================================
   EXPERIENCE

   Not a CV timeline. The year is a huge ghost numeral behind the
   content and the panel swaps as you travel - so scrolling feels
   like moving along a career rather than reading a list of jobs.

   Pinned above 768px only. On a phone the pin costs more than it
   gives, so it falls back to an honest vertical stack.
   ============================================================ */
export default function ExperienceSection({ ready }: { ready: boolean }) {
  const t = useTranslations("experience");
  const locale = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    // Gated on `ready` - see the full explanation in Statement.tsx.
    if (!root || !ready || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".exp-panel");

        // No `pin` option - see the long comment in ProjectShowcase.tsx.
        // Sticky positioning (in the JSX below) replaces it here too.
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const i = Math.min(
              experience.length - 1,
              Math.floor(self.progress * experience.length)
            );
            setActive(i);
          },
        });

        // Cross-fade the panels themselves.
        panels.forEach((panel, i) => {
          gsap.set(panel, { opacity: i === 0 ? 1 : 0 });
        });
      });

      // Eyebrow reveal - deliberately outside the matchMedia block
      // above, since it isn't part of the desktop-only pin mechanics
      // and should still play on mobile's plain vertical stack.
      gsap.from(".exp-eyebrow", {
        opacity: 0,
        y: 14,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  // Cross-fade only exists above 768px. Below that the panels are a
  // static list, so forcing opacity here would blank most of it out.
  // Not gated on `ready` - it only tweens opacity on `active` changes,
  // which cannot happen before the pin above exists to drive them.
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const panels = document.querySelectorAll<HTMLElement>(".exp-panel");
    panels.forEach((p, i) => {
      gsap.to(p, {
        opacity: i === active ? 1 : 0,
        y: i === active ? 0 : 18,
        duration: 0.5,
        ease: "power2.out",
        pointerEvents: i === active ? "auto" : "none",
      });
    });
    const year = document.querySelector<HTMLElement>(".exp-year");
    if (year) {
      /* 0.05, not 1 - this is a ghost numeral behind the content.
         Tweening it to full opacity buries the whole section. */
      gsap.fromTo(
        year,
        { opacity: 0, y: 24 },
        { opacity: 0.05, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [active]);

  // Same sticky mechanism as ProjectShowcase - see the comment there
  // for why GSAP's own `pin` option is not used.
  const scrollVh = (1 + experience.length) * 100;

  return (
    <div
      ref={rootRef}
      className="exp-scroll-outer relative"
      style={{ "--scroll-h": `${scrollVh}vh` } as React.CSSProperties}
    >
      <div className="sticky top-0 z-10 flex min-h-[100svh] flex-col justify-center px-6 py-28 md:px-12">
        <div className="mx-auto w-full max-w-[1600px]">
          <p className="exp-eyebrow type-meta mb-12">{sectionMeta("experience", locale)}</p>

          {/* Ghost year - the background clock for the whole section */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-1/2 -z-10 -translate-y-1/2 md:inset-x-12"
          >
            <span className="exp-year block font-display text-[clamp(8rem,26vw,22rem)] font-bold leading-none tracking-[-0.05em] text-[var(--text)] opacity-[0.05]">
              {experience[active]?.year}
            </span>
          </div>

          {/* One list, two presentations: cross-faded panels above 768px,
              a plain vertical story below. Duplicating the markup would
              read every entry twice to a screen reader. No aria-hidden
              here either - all three entries are real content, and the
              cross-fade between them is purely visual. */}
          <div className="relative flex flex-col gap-14 md:block md:min-h-[340px]">
            {experience.map((e) => (
              <article
                key={e.year}
                className="exp-panel md:absolute md:inset-0"
              >
                <p className="mb-3 font-display text-4xl font-bold tracking-[-0.03em] text-[var(--muted)] md:hidden">
                  {e.year}
                </p>
                <ExperienceBody item={e} t={t} locale={locale} />
              </article>
            ))}
          </div>

          {/* Progress rail */}
          <ol className="mt-14 hidden gap-6 md:flex" aria-label="Timeline">
            {experience.map((e, i) => (
              <li key={e.year} className="flex-1">
                <span
                  aria-hidden="true"
                  className={`block h-px transition-colors duration-500 ${
                    i <= active
                      ? "bg-[var(--accent-cyan)]"
                      : "bg-[var(--line-strong)]"
                  }`}
                />
                <span
                  className={`mt-3 block font-mono text-[11px] tracking-[0.2em] transition-colors duration-500 ${
                    i === active ? "text-[var(--text)]" : "text-[var(--muted)]"
                  }`}
                >
                  {e.year}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function ExperienceBody({
  item,
  t,
  locale,
}: {
  item: (typeof experience)[number];
  t: ReturnType<typeof useTranslations>;
  locale: Locale;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-16">
      <div>
        <p className="type-meta mb-2">{t("role")}</p>
        <h3 className="mb-5 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em]">
          {pick(item.role, locale)}
        </h3>
        <p className="type-meta mb-1">{t("organisation")}</p>
        <p
          className={`text-lg ${
            item.placeholder ? "text-[var(--muted)] italic" : ""
          }`}
        >
          {pick(item.org, locale)}
        </p>
        <p className="type-meta mt-4">{item.period}</p>
      </div>

      <div>
        <p className="type-meta mb-3">{t("description")}</p>
        <p className="mb-8 max-w-[52ch] break-words text-[clamp(1rem,1.4vw,1.25rem)] leading-relaxed text-[var(--muted)]">
          {pick(item.description, locale)}
        </p>
        <p className="type-meta mb-3">{t("technology")}</p>
        <ul className="flex flex-wrap gap-2">
          {item.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-[var(--line-strong)] px-3 py-1 font-mono text-[11px] tracking-[0.1em]"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
