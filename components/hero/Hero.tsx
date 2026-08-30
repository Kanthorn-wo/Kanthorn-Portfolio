"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { driver } from "@/lib/particleDriver";
import { heroStart, heroEnd } from "@/lib/pinLayout";
import { EASE } from "@/lib/animations";
import { site, heroMeta } from "@/data/site";
import Magnetic from "@/components/animation/Magnetic";

/* ============================================================
   HERO

   Two jobs, and they are separate timelines:

   1. ENTRANCE - a strict sequence. Background, then field, then
      the name, then role, description, CTA. It reads as a
      camera arriving rather than a page loading.

   2. EXIT - scrubbed and pinned. The name scales up and drifts
      back while the particle field is pushed forward through
      zOffset, so you pass *through* the network instead of
      watching the hero scroll away. That single shared value is
      what sells the "camera walking through digital space" idea.
   ============================================================ */
export default function Hero({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!ready) return;
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // ---------------- entrance ----------------
      const tl = gsap.timeline({ defaults: { ease: EASE.outStrong } });

      tl.from(".hero-line-inner", {
        yPercent: 115,
        duration: 1.2,
        stagger: 0.1,
      })
        .from(
          ".hero-role",
          { yPercent: 110, opacity: 0, duration: 0.9 },
          "-=0.75"
        )
        .from(
          ".hero-desc",
          { y: 24, opacity: 0, duration: 0.9 },
          "-=0.6"
        )
        .from(
          ".hero-cta",
          { y: 20, opacity: 0, duration: 0.8 },
          "-=0.65"
        )
        .from(
          ".hero-meta-item",
          { opacity: 0, y: 12, duration: 0.7, stagger: 0.07 },
          "-=0.7"
        )
        .from(
          ".hero-scroll",
          { opacity: 0, duration: 0.6 },
          "-=0.5"
        );

      // ---------------- exit ----------------
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: heroStart,
            end: heroEnd,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        })
        // The name recedes: bigger and softer, like it is passing
        // overhead rather than sliding up out of frame.
        .to(
          ".hero-name",
          { scale: 1.28, yPercent: -12, opacity: 0, ease: "none" },
          0
        )
        .to(
          ".hero-supporting",
          { y: -70, opacity: 0, ease: "none" },
          0
        )
        .to(
          ".hero-meta-item",
          { opacity: 0, ease: "none", stagger: 0.02 },
          0
        )
        .to(".hero-scroll", { opacity: 0, ease: "none" }, 0)
        // ...while the field comes toward the camera.
        .to(driver, { zOffset: 0.42, ease: "none" }, 0);
    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative z-10 flex min-h-[100svh] flex-col justify-between px-6 pb-10 pt-28 md:px-12 md:pb-14 md:pt-32"
    >
      {/* floating editorial metadata - each label sits at a different
          depth so the corners of the frame have parallax too */}
      <ul
        className="pointer-events-none absolute right-6 top-28 hidden flex-col items-end gap-2 md:flex md:right-12 md:top-32"
        aria-hidden="true"
      >
        {heroMeta.map((m) => (
          <li key={m} className="hero-meta-item type-meta">
            {m}
          </li>
        ))}
      </ul>

      <div className="hero-name origin-center w-fit self-start">
        <h1 className="type-display">
          <span className="line-mask">
            <span className="hero-line-inner">{site.firstName}</span>
          </span>
          <span className="line-mask">
            <span className="hero-line-inner gradient-text">
              {site.lastName}
            </span>
          </span>
        </h1>
      </div>

      <div className="hero-supporting flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <div className="line-mask mb-5">
            <p className="hero-role font-display text-[clamp(1.25rem,2.6vw,2rem)] font-medium uppercase tracking-[-0.02em]">
              {site.role}
              <span className="text-[var(--muted)]"> / {site.title}</span>
            </p>
          </div>
          <p className="hero-desc max-w-md text-[clamp(0.95rem,1.15vw,1.0625rem)] leading-relaxed text-[var(--muted)]">
            {site.tagline}
          </p>
        </div>

        <div className="hero-cta">
          <Magnetic strength={0.35}>
            <a
              href="#work"
              data-cursor="open"
              className="group inline-flex items-center gap-4 rounded-full border border-[var(--line-strong)] px-7 py-4 transition-colors hover:border-[var(--accent-cyan)]"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em]">
                View Work
              </span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="hero-scroll mt-10 flex items-center justify-between border-t border-[var(--line)] pt-5">
        <span className="type-meta">Scroll to explore</span>
        <span className="type-meta hidden sm:inline">{site.coordinates}</span>
        <span className="type-meta">{site.location}</span>
      </div>
    </section>
  );
}
