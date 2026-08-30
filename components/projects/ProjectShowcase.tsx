"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { projects } from "@/data/projects";
import { sectionMeta } from "@/data/site";
import ProjectCard from "./ProjectCard";
import Magnetic from "@/components/animation/Magnetic";

/* ============================================================
   PROJECT SHOWCASE

   A pinned stack rather than a grid. Cards replace one another
   in the same physical spot: the outgoing card scales down and
   drifts back, the incoming one rises to meet you. A grid asks
   you to compare thumbnails; this asks you to look at one thing
   at a time, which is how you actually want work to be read.

   Above 768px only. On a phone the pin fights the scroll, so it
   degrades to a vertical story - which is genuinely better there.
   ============================================================ */
export default function ProjectShowcase({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    // Gated on `ready` - see the full explanation in Statement.tsx.
    if (!root || !ready || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");
        const n = cards.length;
        if (n < 2) return;

        /* Each card's on-screen state is computed directly as a pure
           function of overall scroll progress, rather than composed
           from N-1 independent fromTo/to tween pairs. The tween-chain
           version looked right but, at speed or with variable content
           height, could evaluate a card outside the transition it
           belonged to - leaving one stuck mid-opacity at rest, two
           cards briefly sharing full opacity, or (worst case) landing
           between two segments with nothing on screen at all. A pure
           function of progress cannot drift out of sync with itself:
           every card's state is fully determined by where you are on
           the timeline, every frame, with nothing left to accumulate. */
        function render(progress: number) {
          const p = gsap.utils.clamp(0, n - 1, progress * (n - 1));
          const current = Math.min(n - 2, Math.floor(p));
          const frac = p - current;

          cards.forEach((card, i) => {
            if (i < current) {
              gsap.set(card, { opacity: 0, yPercent: -6, scale: 0.9 });
            } else if (i === current) {
              if (i === n - 1) {
                gsap.set(card, { opacity: 1, yPercent: 0, scale: 1 });
              } else {
                gsap.set(card, {
                  opacity: 1 - frac,
                  yPercent: -6 * frac,
                  scale: 1 - 0.1 * frac,
                });
              }
            } else if (i === current + 1) {
              gsap.set(card, { yPercent: 105 * (1 - frac), opacity: 1, scale: 1 });
            } else {
              // Parked below the fold, waiting its turn. `overflow-hidden`
              // on the stage keeps it truly invisible regardless of its
              // own natural content height on very tall viewports.
              gsap.set(card, { yPercent: 105, opacity: 1, scale: 1 });
            }
          });
        }

        render(0);

        /* No `pin` option. GSAP's own pin mechanism (position:fixed
           OR pinType:"transform") applied a wrong, stuck offset to
           this element specifically once it became the 3rd pinned
           section in a stack of 4 - confirmed independent of chained
           vs closed-form start/end math, independent of fixed vs
           transform pinType. CSS `position: sticky` on the inner box
           below achieves the same "stay in view while its tall parent
           scrolls past" effect without GSAP computing any offset at
           all - the browser owns that math, which is why it can't
           have this bug. ScrollTrigger here only supplies scroll
           progress (0-1) across the parent's own height to drive the
           card render() function. */
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => render(self.progress),
        });
      });

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  /* This tall wrapper is what makes `position: sticky` work as a pin:
     the inner box (100svh) sticks to the top of the viewport while
     this outer box - taller by the desired "scroll-through" amount -
     continues scrolling underneath it, and releases naturally once
     its own bottom is reached. `--scroll-h` is read by the md+ rule
     in globals.css; below 768px the section is plain unpinned flow. */
  const scrollVh = (1 + (projects.length - 1) * 1.1) * 100;

  return (
    <div
      ref={rootRef}
      className="project-scroll-outer relative"
      style={{ "--scroll-h": `${scrollVh}vh` } as React.CSSProperties}
    >
      <div className="sticky top-0 z-10 flex min-h-[100svh] flex-col justify-center px-6 py-24 md:px-12">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
            <p className="type-meta">{sectionMeta("work")}</p>
            <div className="flex items-baseline gap-6">
              <p className="type-meta">
                {String(projects.length).padStart(2, "0")} Projects
              </p>
              <Magnetic strength={0.3}>
                <Link
                  href="/projects"
                  data-cursor="open"
                  className="group inline-flex items-center gap-2 border-b border-[var(--line-strong)] pb-1 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
                >
                  View all
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* One list, two presentations. Rendering it twice would put
              every project into the accessibility tree twice, since
              `hidden` utilities are CSS-only.

              overflow-hidden matters on very tall viewports (1920x1080
              confirmed): a card parked off-screen at yPercent:105 is
              only guaranteed invisible if its box can't exceed the
              stage's own fixed height. Without this, a card whose
              natural content (a long description, more tech tags) is
              taller than 62vh could still paint into the stage even
              while "below" it, overlapping the active card's text. */}
          <div className="relative flex flex-col gap-10 overflow-hidden md:block md:h-[62vh]">
            {projects.map((p, i) => (
              <div
                key={p.id}
                className="project-card h-[58vh] will-change-transform md:absolute md:inset-0 md:h-auto"
                style={{ zIndex: i + 1 }}
              >
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
