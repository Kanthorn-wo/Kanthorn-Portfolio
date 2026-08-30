"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { skills } from "@/data/skills";
import { lerp, EASE } from "@/lib/animations";

/* ============================================================
   TOOLS I SPEAK

   No bars, no percentages - those claim a precision nobody has.
   Instead each tool sits at a depth: the ones I reach for daily
   are large and near, the rest recede. One `z` value in the data
   drives size, opacity, blur and scroll speed together, so the
   section reads as a space you are moving through.
   ============================================================ */
export default function Stack() {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".stack-item");

      items.forEach((el) => {
        const z = parseFloat(el.dataset.z || "0.5");
        /* Near items travel further and faster than far ones. Capped
           lower than before: at the old 190px max, a high-z word could
           already be dragged up over the "Tools I speak" heading the
           moment the section entered, since the range starts at
           "top bottom" - before the heading is anywhere near centred.
           Still not enough at 90px - a near-z=1 word can render up to
           ~112px tall (its own font-size cap), taller than the heading
           box it was supposed to hide behind, so any overlap showed as
           a sliced glyph rather than a clean hide. Capped further. */
        const travel = lerp(20, 45, z);

        gsap.fromTo(
          el,
          { y: travel },
          {
            y: -travel,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      gsap.from(items, {
        opacity: 0,
        duration: 0.9,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });

      // Same masked-line technique as Hero/Statement/Contact - the
      // heading tag itself stays outside the mask, so it keeps its
      // normal place in the accessibility tree's heading outline.
      gsap.from(".stack-head-line", {
        yPercent: 115,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: EASE.outStrong,
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative z-10 mx-auto max-w-[1600px] overflow-hidden px-6 py-32 md:px-12 md:py-48"
    >
      {/* No index number: this section is not a nav destination, so it
          never had a real slot in the nav's 01-04 sequence. A previous
          version hardcoded "04" here, which quietly disagreed with
          Contact's nav-driven "04" - see data/site.ts sectionMeta. */}
      <div className="line-mask mb-4">
        <p className="stack-head-line type-meta">Stack</p>
      </div>
      {/* relative/z-10/bg/pb are load-bearing: they keep parallaxing
          .stack-item words from painting over this heading as they
          drift upward on scroll. Coverage lives in padding-bottom
          (opaque), not margin (transparent): a near-z=1 skill word
          can render up to 7rem tall, taller than this h2's own 5rem
          cap, so a gap sized to just the heading's own line-height
          wasn't enough to fully hide it mid-transit - confirmed live,
          it sliced through NEXT.JS/TYPESCRIPT even with parallax
          travel near zero. This padding has to live on a wrapper
          OUTSIDE .line-mask, not combined onto the same element:
          .line-mask's own padding-bottom (the descender-shear fix)
          is an unlayered global rule in globals.css, which beats any
          Tailwind utility class regardless of source order - a
          pb-* class placed directly on .line-mask silently loses. */}
      <div className="relative z-10 bg-[var(--bg)] pb-16 md:pb-24">
        <div className="line-mask">
          <h2 className="stack-head-line type-section-title">Tools I speak</h2>
        </div>
      </div>

      <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-4 md:gap-x-14 md:gap-y-6">
        {skills.map((s) => (
          <li
            key={s.name}
            data-z={s.z}
            className="stack-item font-display font-bold uppercase tracking-[-0.04em] will-change-transform"
            style={{
              // Depth expressed in three channels at once.
              fontSize: `clamp(${lerp(1.1, 2.4, s.z).toFixed(2)}rem, ${lerp(
                3,
                9,
                s.z
              ).toFixed(1)}vw, ${lerp(2.5, 7, s.z).toFixed(2)}rem)`,
              opacity: lerp(0.28, 1, s.z),
              filter: s.z < 0.5 ? `blur(${lerp(1.6, 0, s.z / 0.5)}px)` : "none",
              color: s.z > 0.9 ? "var(--accent-cyan)" : "var(--text)",
            }}
          >
            {s.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
