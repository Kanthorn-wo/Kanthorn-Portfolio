/* ============================================================
   TECH STACK - "TOOLS I SPEAK"
   `z` is depth: 0 = far background, 1 = foreground.
   It drives size, opacity, blur and parallax speed together,
   so one number places a word in space. No bars, no percentages.
   ============================================================ */

export type Skill = { name: string; z: number };

export const skills: Skill[] = [
  { name: "NEXT.JS", z: 1.0 },
  { name: "TYPESCRIPT", z: 0.92 },
  { name: "REACT", z: 0.85 },
  { name: "GSAP", z: 0.78 },
  { name: "TAILWIND", z: 0.62 },
  { name: "SCSS", z: 0.5 },
  { name: "ANGULAR", z: 0.44 },
  { name: "NODE.JS", z: 0.38 },
  { name: "LARAVEL", z: 0.3 },
  { name: "PHP", z: 0.24 },
  { name: "MYSQL", z: 0.18 },
  { name: "MONGODB", z: 0.12 },
];

import type { Localized } from "@/lib/localized";

/** The About section "I care about" list. */
export const principles: Localized<string>[] = [
  { en: "Interaction", th: "อินเทอร์แอกชัน" },
  { en: "Motion", th: "การเคลื่อนไหว" },
  { en: "Performance", th: "ประสิทธิภาพ" },
  { en: "Clean Architecture", th: "สถาปัตยกรรมที่สะอาด" },
  { en: "User Experience", th: "ประสบการณ์ผู้ใช้" },
];

/** Marquee words. Kept short - long words read as noise at speed. */
export const marqueeWords = [
  "BUILD",
  "MOVE",
  "INTERACT",
  "CREATE",
  "PERFORM",
  "REFINE",
] as const;
