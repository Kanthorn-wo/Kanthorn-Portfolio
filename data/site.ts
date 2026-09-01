/* ============================================================
   SITE IDENTITY
   Everything personal lives here. Change it in this one file
   and it updates everywhere on the page.
   ============================================================ */

import type { Locale } from "@/i18n/routing";
import { pick, type Localized } from "@/lib/localized";

export const site = {
  // Spelled per your resume + email address (kanthorn.wo@).
  // The old site rendered "KANTHRON" — change here if you prefer that.
  firstName: "KANTHORN",
  lastName: "WONGSOMA",

  // Thai spelling of the same name - used in structured data and the
  // About section so the site is findable by Thai-language name search.
  nameTh: "กันต์ธร วงษ์โสมะ",

  role: { en: "Front-End Developer", th: "นักพัฒนาฝั่ง Front-End" } as Localized,
  title: { en: "Computer Engineer", th: "วิศวกรคอมพิวเตอร์" } as Localized,
  identity: {
    en: "Creative Front-End Engineer / Interactive Web Developer",
    th: "วิศวกร Front-End เชิงสร้างสรรค์ / นักพัฒนาเว็บเชิงอินเทอร์แอกทีฟ",
  } as Localized,

  // From your resume. Change to "Bangkok / Thailand" if you have moved.
  location: "Nakhon Ratchasima / Thailand",
  coordinates: "14.9799 N / 102.0977 E",

  tagline: {
    en: "I build digital experiences where code meets motion.",
    th: "ผมสร้างประสบการณ์ดิจิทัลที่โค้ดมาบรรจบกับการเคลื่อนไหว",
  } as Localized,

  email: "kanthorn.wo@gmail.com",
  github: "https://github.com/Kanthorn-wo",
  linkedin: "https://www.linkedin.com/in/kanthorn-wongsoma-438083244/",

  available: true,
  availableLabel: {
    en: "Available for opportunities",
    th: "เปิดรับโอกาสใหม่ ๆ",
  } as Localized,

  year: "2026",
} as const;

// TODO: swap for the custom domain once one is bought - every metadata
// URL (canonical, sitemap, OG image, JSON-LD) is derived from this.
export const siteUrl = "https://kanthorn-portfolio.vercel.app";

/** Editorial labels floating in the hero. Keep to 4 - more reads as badge soup. */
export const heroMeta = ["FRONT-END", "NEXT.JS", "TYPESCRIPT", "GSAP"] as const;

/* ============================================================
   Section registry - the ONLY place a section's number or label
   is defined. Nav links, the nav's active-state tracking, and
   every in-page "0X / Name" badge all read from this array.

   Previously each section component hand-typed its own "0X /"
   string, and none of them agreed with each other or with the
   nav (About said 01, nav said 02 for the same section; Contact
   said 06, nav said 04). Six independent sources of truth for
   the same number is how that kind of drift happens - so there
   is now exactly one.
   ============================================================ */
export const sections = [
  {
    id: "hero",
    label: { en: "INDEX", th: "หน้าแรก" } as Localized,
    index: "00",
    inNav: false,
  },
  {
    id: "work",
    label: { en: "WORK", th: "ผลงาน" } as Localized,
    index: "01",
    inNav: true,
  },
  {
    id: "about",
    label: { en: "ABOUT", th: "เกี่ยวกับ" } as Localized,
    index: "02",
    inNav: true,
  },
  {
    id: "experience",
    label: { en: "EXPERIENCE", th: "ประสบการณ์" } as Localized,
    index: "03",
    inNav: true,
  },
  {
    id: "contact",
    label: { en: "CONTACT", th: "ติดต่อ" } as Localized,
    index: "04",
    inNav: true,
  },
] as const;

/** Look up a section's number/label pair for an in-page badge. */
export function sectionMeta(id: (typeof sections)[number]["id"], locale: Locale) {
  const s = sections.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown section id: ${id}`);
  return `${s.index} / ${pick(s.label, locale)}`;
}
