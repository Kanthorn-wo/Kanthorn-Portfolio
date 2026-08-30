"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import type { Project } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";

/* ============================================================
   Hover is built on quickTo rather than CSS transitions so the
   visual and the title share one interpolator - they move as a
   single object instead of two things that happen to animate at
   the same time.
   ============================================================ */
export default function ProjectCard({ project }: { project: Project }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const visual = root.querySelector(".pc-visual");
      const title = root.querySelector(".pc-title");
      const overlay = root.querySelector(".pc-overlay");
      if (!visual || !title || !overlay) return;

      const scaleTo = gsap.quickTo(visual, "scale", {
        duration: 0.7,
        ease: "power3.out",
      });
      const titleTo = gsap.quickTo(title, "x", {
        duration: 0.7,
        ease: "power3.out",
      });
      const overlayTo = gsap.quickTo(overlay, "opacity", {
        duration: 0.5,
        ease: "power2.out",
      });

      const enter = () => {
        scaleTo(1.05);
        titleTo(14);
        overlayTo(1);
      };
      const leave = () => {
        scaleTo(1);
        titleTo(0);
        overlayTo(0);
      };

      root.addEventListener("pointerenter", enter);
      root.addEventListener("pointerleave", leave);
      root.addEventListener("focusin", enter);
      root.addEventListener("focusout", leave);

      return () => {
        root.removeEventListener("pointerenter", enter);
        root.removeEventListener("pointerleave", leave);
        root.removeEventListener("focusin", enter);
        root.removeEventListener("focusout", leave);
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const Wrapper = project.href ? "a" : "div";
  const wrapperProps = project.href
    ? {
        href: project.href,
        target: "_blank",
        rel: "noreferrer noopener",
        "data-cursor": "view",
      }
    : { "data-cursor": "view" as const };

  return (
    <div
      ref={rootRef}
      className="grid h-full grid-rows-[1fr_auto] gap-5 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:grid-rows-1 md:items-stretch md:gap-12"
    >
      {/* Visual */}
      <Wrapper
        {...wrapperProps}
        className="relative block overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg-elevated)]"
      >
        <div className="pc-visual absolute inset-0 will-change-transform">
          <ProjectVisual
            seed={project.id}
            image={project.image}
            alt={`${project.title} preview`}
          />
        </div>
        <div className="pc-overlay pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--bg)_80%,transparent),transparent_55%)] opacity-0" />
        <span className="absolute left-4 top-4 font-mono text-[11px] tracking-[0.2em] text-[var(--muted)]">
          {project.index}
        </span>
        {project.featured && (
          <span className="absolute right-4 top-4 rounded-full border border-[var(--accent-cyan)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--accent-cyan)]">
            Featured
          </span>
        )}
      </Wrapper>

      {/* Meta */}
      <div className="flex flex-col justify-center">
        <p className="type-meta mb-3">
          {project.category} — {project.year}
        </p>
        <h3 className="pc-title mb-4 font-display text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] will-change-transform">
          {project.title}
        </h3>
        <p className="mb-6 max-w-[46ch] text-[clamp(0.9rem,1.1vw,1rem)] leading-relaxed text-[var(--muted)]">
          {project.description}
        </p>
        <ul className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-[var(--line-strong)] px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-[var(--muted)]"
            >
              {t}
            </li>
          ))}
        </ul>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="open"
            className="mt-6 inline-flex w-fit items-center gap-2 border-b border-[var(--line-strong)] pb-1 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
          >
            View repository <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </div>
  );
}
