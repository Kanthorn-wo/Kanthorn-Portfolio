/* ============================================================
   STATEMENT
   Moved out of the component so `text` can hold both languages -
   direction is authored per line, never randomised, and the
   strikethrough target is an explicit flag (not a string match)
   so it survives translation. See components/statement/Statement.tsx.
   ============================================================ */

import type { Localized } from "@/lib/localized";

export type StatementLine = {
  id: string;
  text: Localized;
  from: "left" | "right";
  strike?: boolean;
};

export const PHRASE_A: StatementLine[] = [
  { id: "a1", text: { en: "I DON'T", th: "ผมไม่ได้" }, from: "left" },
  { id: "a2", text: { en: "JUST BUILD", th: "แค่สร้าง" }, from: "right" },
  { id: "a3", text: { en: "WEBSITES.", th: "เว็บไซต์" }, from: "left", strike: true },
];

export const PHRASE_B: StatementLine[] = [
  { id: "b1", text: { en: "I BUILD", th: "ผมสร้าง" }, from: "right" },
  { id: "b2", text: { en: "DIGITAL", th: "ประสบการณ์" }, from: "left" },
  { id: "b3", text: { en: "EXPERIENCES.", th: "ดิจิทัล" }, from: "right" },
];
