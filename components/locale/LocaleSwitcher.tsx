"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";

/* A link pair, not a stateful toggle - switching locale is a real
   navigation (see i18n/routing.ts), so the inactive language is an
   actual <Link locale="..."> that preserves the current path. Matches
   Nav's own mono/uppercase/tracked link idiom rather than ThemeToggle's
   knob (that gradient is reserved for the theme switch - see the
   comment in ThemeToggle.tsx). */
export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em]">
      <Link
        href={pathname}
        locale="en"
        data-cursor="open"
        aria-current={locale === "en" ? "page" : undefined}
        className={`transition-colors hover:text-[var(--text)] ${
          locale === "en" ? "text-[var(--text)]" : "text-[var(--muted)]"
        }`}
      >
        EN
      </Link>
      <span aria-hidden="true" className="text-[var(--muted)]">
        /
      </span>
      <Link
        href={pathname}
        locale="th"
        data-cursor="open"
        aria-current={locale === "th" ? "page" : undefined}
        className={`transition-colors hover:text-[var(--text)] ${
          locale === "th" ? "text-[var(--text)]" : "text-[var(--muted)]"
        }`}
      >
        TH
      </Link>
    </div>
  );
}
