/* ============================================================
   LOCALIZED CONTENT
   Per-entity prose (project descriptions, experience, about
   blocks, etc.) lives as one object with both languages inline,
   not split into a separate translation file - see i18n/routing.ts
   and messages/*.json for short, reusable UI chrome instead.
   ============================================================ */

import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = {
  en: T;
  th: T;
};

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.en;
}
