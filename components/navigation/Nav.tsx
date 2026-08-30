"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { site, sections } from "@/data/site";
import ThemeToggle from "@/components/theme/ThemeToggle";

const navLinks = sections.filter((s) => s.inNav);

/* ============================================================
   NAVIGATION

   Starts as a full-width editorial header. Once the hero is
   behind you it contracts into a floating pill - the page has
   stopped introducing itself and the nav becomes a tool.
   ============================================================ */
export default function Nav() {
  const barRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasMenuOpenRef = useRef(false);
  const [active, setActive] = useState<string>("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  /* Focus trap for the full-screen mobile menu.

     Tabbing used to walk straight past the last link into content that
     sits behind the overlay (still in the DOM, still focusable, just
     visually hidden) - "View Work" behind a full-bleed menu is
     reachable but invisible, which is worse than not having a trap at
     all. Escape did nothing either.

     Approach: while open, move focus onto the first link, then
     intercept Tab/Shift+Tab only at the boundaries of the menu's own
     focusable set and wrap there. Everything in between still uses
     native Tab order, so this stays cheap. */
  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    if (!menu) return;

    const getFocusable = () =>
      Array.from(
        menu.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

    getFocusable()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Whenever the menu closes - Escape, a link click, the hamburger
  // toggling it shut - send focus back to the button that opened it.
  useEffect(() => {
    if (menuOpen) {
      wasMenuOpenRef.current = true;
      return;
    }
    if (wasMenuOpenRef.current) {
      wasMenuOpenRef.current = false;
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  useIsomorphicLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      // The "compact floating pill" end state: solid background, border,
      // blur. This is what makes the bar readable over scrolled-under
      // content, independent of whether it arrives via an animated scrub
      // or is simply switched on.
      const pillState = {
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: "var(--line)",
        backgroundColor: "color-mix(in srgb, var(--bg) 78%, transparent)",
        backdropFilter: "blur(14px)",
        borderRadius: 999,
      };

      if (prefersReducedMotion()) {
        // Same end state, no scrub: applied instantly once scrolled past
        // the hero, removed instantly on the way back up. Without this
        // the reduced-motion branch previously did nothing at all, so
        // the nav stayed fully transparent for the whole page and any
        // scrolled content showed straight through the links.
        ScrollTrigger.create({
          trigger: document.body,
          start: "top+=80 top",
          onEnter: () => gsap.set(bar, pillState),
          onLeaveBack: () => gsap.set(bar, { clearProps: "all" }),
        });
      } else {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: document.body,
              start: "top+=80 top",
              end: "top+=200 top",
              scrub: 0.6,
            },
          })
          .to(bar, { ...pillState, ease: "none" });
      }

      /* Active-section tracking.

         One trigger per section with onToggle does not work here: the
         wrappers around pinned sections are 3-4k px tall, so their
         active ranges overlap heavily, and onToggle only ever fires on
         the way IN - nothing resets the indicator on the way out. The
         result was a nav that ran a full section ahead of the content.

         Measuring live rects each update is deterministic and cannot go
         stale when pins or lazy-loaded sections change the page height.
         Five getBoundingClientRect calls per frame is nothing. */
      const pickActive = () => {
        const mid = window.innerHeight / 2;
        let current: string = sections[0].id;
        for (const s of sections) {
          const el = document.getElementById(s.id);
          if (!el) continue;
          const b = el.getBoundingClientRect();
          if (b.top <= mid && b.bottom >= mid) {
            current = s.id;
            break;
          }
          if (b.top <= mid) current = s.id;
        }
        // React bails out when the value is unchanged, so this does not
        // re-render on every scroll frame.
        setActive((prev) => (prev === current ? prev : current));
      };

      /* A plain passive scroll listener, rAF-throttled. A ScrollTrigger
         spanning the document only fired onUpdate once here, and this
         needs to be correct on every frame regardless. Lenis scrolls the
         window natively, so this receives its updates too. */
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
    }, barRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <a href="#main" className="skip-link font-mono text-xs">
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-[110] px-4 pt-4 md:px-8 md:pt-6">
        <div
          ref={barRef}
          className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 border border-transparent px-4 py-2 md:px-6"
        >
          <a
            href="#hero"
            data-cursor="open"
            className="font-mono text-xs uppercase tracking-[0.2em]"
          >
            {site.firstName}
            <span className="text-[var(--muted)]"> / 01</span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    data-cursor="open"
                    aria-current={active === link.id ? "true" : undefined}
                    className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-[var(--text)] aria-[current]:text-[var(--text)]"
                  >
                    <span className="text-[9px] opacity-50">{link.index}</span>{" "}
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1.5 left-0 h-px bg-[var(--accent-cyan)] transition-all duration-500 ${
                        active === link.id ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-6 w-6 flex-col items-end justify-center gap-[5px] md:hidden"
            >
              <span
                aria-hidden="true"
                className={`block h-px bg-[var(--text)] transition-all duration-300 ${
                  menuOpen ? "w-5 translate-y-[3px] rotate-45" : "w-5"
                }`}
              />
              <span
                aria-hidden="true"
                className={`block h-px bg-[var(--text)] transition-all duration-300 ${
                  menuOpen ? "w-5 -translate-y-[3px] -rotate-45" : "w-3"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Primary"
        hidden={!menuOpen}
        className="fixed inset-0 z-[105] flex flex-col justify-center gap-2 bg-[var(--bg)] px-6 md:hidden"
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={() => setMenuOpen(false)}
            className="font-display text-[clamp(2.5rem,12vw,4rem)] font-semibold uppercase leading-[1.05] tracking-[-0.03em]"
          >
            <span className="type-meta mr-3 align-middle">{link.index}</span>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
