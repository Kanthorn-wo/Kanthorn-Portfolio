"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { allProjects } from "@/data/allProjects";
import { site } from "@/data/site";
import { pick } from "@/lib/localized";
import ProjectVisual from "./ProjectVisual";
import Reveal from "@/components/animation/Reveal";
import ThemeToggle from "@/components/theme/ThemeToggle";
import LocaleSwitcher from "@/components/locale/LocaleSwitcher";

/* ============================================================
   PROJECTS ARCHIVE

   The homepage's ProjectShowcase is a pinned, one-at-a-time
   storytelling stack - deliberate, per the site's own rule that
   a plain grid can't be the *main* project experience. This page
   is the other half of that rule: once someone has asked to see
   everything, a calm, legible grid is exactly right. No pin, no
   scrub, no particle field - a listing page should read fast.

   9 cards per page (3x3 on desktop) so a full page fits within
   one screen without the grid itself forcing a scroll.
   ============================================================ */
const PAGE_SIZE = 9;

export default function ProjectsArchive() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.max(1, Math.ceil(allProjects.length / PAGE_SIZE));
  const pageItems = allProjects.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const goTo = (next: number) => {
    const clamped = Math.min(totalPages, Math.max(1, next));
    if (clamped === page) return;
    setPage(clamped);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-[var(--line)] bg-[var(--bg)]/85 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <Link
            href="/"
            data-cursor="open"
            className="font-mono text-xs uppercase tracking-[0.2em]"
          >
            {site.firstName}
            <span className="text-[var(--muted)]"> {t("archiveBrandSuffix")}</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/#work"
              data-cursor="open"
              className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-[var(--text)] md:inline"
            >
              {t("backToHome")}
            </Link>
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
        <div ref={gridRef} className="mb-14 max-w-2xl scroll-mt-24 md:mb-20">
          <p className="type-meta mb-4">{t("archiveEyebrow")}</p>
          <h1 className="type-section-title mb-6">{t("allProjects")}</h1>
          <p className="text-[clamp(1rem,1.3vw,1.1875rem)] leading-relaxed text-[var(--muted)]">
            {t("archiveSubtitle", { n: allProjects.length })}
          </p>
        </div>

        <Reveal
          as="ul"
          key={page}
          stagger
          y={24}
          className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pageItems.map((p) => {
              const title = pick(p.title, locale);
              const Wrapper = p.href ? "a" : "div";
              const wrapperProps = p.href
                ? {
                    href: p.href,
                    target: "_blank",
                    rel: "noreferrer noopener",
                    "data-cursor": "view" as const,
                  }
                : {};

              return (
                <li key={p.id}>
                  <Wrapper {...wrapperProps} className="group block">
                    <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg-elevated)]">
                      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                        <ProjectVisual
                          seed={p.id}
                          image={p.image}
                          alt={`${title} preview`}
                        />
                      </div>
                      <span className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">
                        {p.index}
                      </span>
                      {p.featured && (
                        <span className="absolute right-3 top-3 rounded-full border border-[var(--accent-cyan)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--accent-cyan)]">
                          {t("featured")}
                        </span>
                      )}
                    </div>
                    <p className="type-meta mb-1.5">
                      {pick(p.category, locale)} — {p.year}
                    </p>
                    <h2 className="mb-2 font-display text-lg font-semibold leading-tight tracking-[-0.02em] transition-colors group-hover:text-[var(--accent-cyan)]">
                      {title}
                    </h2>
                    <p className="line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
                      {pick(p.description, locale)}
                    </p>
                  </Wrapper>
                </li>
              );
            })}
        </Reveal>

        <nav
          aria-label={t("pagination")}
          className="mt-16 flex items-center justify-between border-t border-[var(--line)] pt-8 md:mt-20"
        >
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            data-cursor="open"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-[var(--text)] disabled:pointer-events-none disabled:opacity-30"
          >
            {t("prev")}
          </button>
          <p className="type-meta" aria-live="polite">
            {String(page).padStart(2, "0")} /{" "}
            {String(totalPages).padStart(2, "0")}
          </p>
          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            data-cursor="open"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-[var(--text)] disabled:pointer-events-none disabled:opacity-30"
          >
            {t("next")}
          </button>
        </nav>
      </main>
    </div>
  );
}
