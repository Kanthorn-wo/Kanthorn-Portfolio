"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { featuredProject } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";
import Magnetic from "@/components/animation/Magnetic";

/* ============================================================
   FEATURED PROJECT

   The visual opens with a clip-path wipe rather than a fade,
   because a wipe implies something being revealed and a fade
   just implies something arriving late. Inside it, the image
   scale runs slightly ahead of the frame, so the reveal has
   parallax within itself.
   ============================================================ */
export default function Featured() {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            end: "bottom top",
            once: true,
          },
        })
        .from(".feat-eyebrow", {
          opacity: 0,
          y: 14,
          duration: 0.7,
          ease: "power3.out",
        })
        .fromTo(
          ".feat-frame",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "expo.out",
          },
          "-=0.3"
        )
        .from(
          ".feat-inner",
          { scale: 1.25, duration: 1.7, ease: "expo.out" },
          "<"
        )
        .from(
          ".feat-line",
          { yPercent: 110, duration: 1, stagger: 0.08, ease: "power4.out" },
          "-=1.15"
        )
        // CTA / description / tech pills - everything that was static.
        // The CTA link is targeted directly rather than via its
        // <Magnetic> wrapper, so this y-tween can't fight Magnetic's
        // own quickTo(x/y) on that wrapper's div.
        .from(
          ".feat-body-in",
          { opacity: 0, y: 18, duration: 0.8, stagger: 0.08, ease: "power3.out" },
          "-=0.6"
        );

      // Continuing parallax on the visual as it passes through.
      gsap.fromTo(
        ".feat-inner",
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const p = featuredProject;

  return (
    <section
      ref={rootRef}
      className="relative z-10 mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mb-8 flex items-baseline justify-between">
        <p className="feat-eyebrow type-meta">Project {p.index} — Featured</p>
        <p className="feat-eyebrow type-meta">{p.category}</p>
      </div>

      <div className="feat-frame relative mb-10 h-[52vh] overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg-elevated)] md:h-[76vh]">
        <div className="feat-inner absolute inset-[-6%] will-change-transform">
          <ProjectVisual
            seed={p.id + "-featured"}
            image={p.image}
            alt={`${p.title} preview`}
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-16">
        <div>
          <h2 className="mb-6 type-section-title">
            <span className="line-mask">
              <span className="feat-line block">{p.title}</span>
            </span>
          </h2>
          <Magnetic strength={0.3}>
            <a
              href={p.href ?? "#contact"}
              {...(p.href
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              data-cursor="open"
              className="feat-body-in group inline-flex items-center gap-3 border-b border-[var(--line-strong)] pb-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
            >
              View case study
              <span
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </Magnetic>
        </div>

        <div>
          <p className="feat-body-in mb-8 max-w-[48ch] text-[clamp(1rem,1.3vw,1.1875rem)] leading-relaxed text-[var(--muted)]">
            {p.description}
          </p>
          <p className="feat-body-in type-meta mb-3">Technology</p>
          <ul className="feat-body-in flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-[var(--line-strong)] px-3 py-1 font-mono text-[11px] tracking-[0.1em]"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
