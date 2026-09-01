"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { site, sectionMeta } from "@/data/site";
import { principles } from "@/data/skills";
import { aboutBlocks } from "@/data/about";
import { pick } from "@/lib/localized";
import Reveal from "@/components/animation/Reveal";

const fullName = `${site.firstName.charAt(0)}${site.firstName
  .slice(1)
  .toLowerCase()} ${site.lastName.charAt(0)}${site.lastName.slice(1).toLowerCase()}`;

// Both spellings, on both locales - the Thai name has nowhere else to
// appear as real page content, and this is what makes the site findable
// when someone searches "กันต์ธร วงษ์โสมะ".
const displayName = `${fullName} (${site.nameTh})`;

/* ============================================================
   ABOUT

   Editorial two-column. The left rail is sticky and tracks which
   block you are reading, so the section behaves like a spread in
   a magazine rather than a stack of paragraphs.
   ============================================================ */
export default function About() {
  const t = useTranslations("about");
  const locale = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* One ScrollTrigger per block with onToggle looked right but was
         not: their "top 60% / bottom 60%" ranges overlap, onToggle only
         fires on entry, and nothing re-asserts an earlier block once a
         later one has toggled on. A fast scroll (or Lenis inertia
         overshoot) could fire block 4's onToggle before block 2's, and
         the rail would then show 04 while blocks 01-02 sat on screen -
         exactly what happened. Same bug, same fix as the nav indicator:
         measure which block actually owns the viewport, every frame. */
      const items = gsap.utils.toArray<HTMLElement>(".about-block");

      const pickActive = () => {
        const mid = window.innerHeight * 0.55;
        let current = 0;
        items.forEach((el, i) => {
          const b = el.getBoundingClientRect();
          if (b.top <= mid) current = i;
        });
        setActive((prev) => (prev === current ? prev : current));
      };

      let frame = 0;
      const onScroll = () => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          pickActive();
        });
      };

      pickActive();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });

      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const reduced = typeof window !== "undefined" && prefersReducedMotion();

  return (
    <div
      ref={rootRef}
      className="relative z-10 mx-auto max-w-[1600px] px-6 py-28 md:px-12 md:py-40"
    >
      <div className="grid gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-20">
        {/* Sticky rail */}
        <div className="md:sticky md:top-32 md:self-start">
          {/* Reveal, not a masked-line split: the h2 has a nested
              <span> for the muted second line, and SplitText would
              have to rewrap it - Reveal only tweens y/opacity on the
              block, so the nested markup is untouched. */}
          <Reveal stagger>
            <p className="type-meta mb-8">{sectionMeta("about", locale)}</p>
            <h2 className="type-section-title mb-12">
              {t("headingLine1")}
              <br />
              <span className="text-[var(--muted)]">{t("headingLine2")}</span>
            </h2>
          </Reveal>

          <ol className="hidden md:block" aria-label="Section progress">
            {aboutBlocks.map((b, i) => (
              <li
                key={b.n}
                className="flex items-center gap-3 py-2"
                aria-current={active === i ? "step" : undefined}
              >
                <span
                  aria-hidden="true"
                  className={`h-px transition-all duration-500 ${
                    active === i
                      ? "w-10 bg-[var(--accent-cyan)]"
                      : "w-4 bg-[var(--line-strong)]"
                  }`}
                />
                <span
                  className={`font-mono text-[11px] tracking-[0.2em] transition-colors duration-500 ${
                    active === i ? "text-[var(--text)]" : "text-[var(--muted)]"
                  }`}
                >
                  {b.n} {pick(b.title, locale).toUpperCase()}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Narrative */}
        <div className="flex flex-col gap-16 md:gap-24">
          {aboutBlocks.map((b) => (
            <Reveal key={b.n} className="about-block" y={reduced ? 0 : 40}>
              <p className="type-meta mb-4">{b.n}</p>
              <p className="max-w-[46ch] break-words text-[clamp(1.125rem,2vw,1.75rem)] leading-[1.45] tracking-[-0.01em]">
                {pick(b.body, locale).replace("{name}", displayName)}
              </p>
            </Reveal>
          ))}

          <Reveal className="border-t border-[var(--line)] pt-10">
            <p className="type-meta mb-6">{t("careEyebrow")}</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {principles.map((p) => (
                <li
                  key={p.en}
                  className="font-display text-[clamp(1.25rem,2.4vw,2rem)] font-medium tracking-[-0.02em]"
                >
                  {pick(p, locale)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
