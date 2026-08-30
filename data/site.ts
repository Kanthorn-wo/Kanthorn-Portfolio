/* ============================================================
   SITE IDENTITY
   Everything personal lives here. Change it in this one file
   and it updates everywhere on the page.
   ============================================================ */

export const site = {
  // Spelled per your resume + email address (kanthorn.wo@).
  // The old site rendered "KANTHRON" — change here if you prefer that.
  firstName: "KANTHORN",
  lastName: "WONGSOMA",

  role: "Front-End Developer",
  title: "Computer Engineer",
  identity: "Creative Front-End Engineer / Interactive Web Developer",

  // From your resume. Change to "Bangkok / Thailand" if you have moved.
  location: "Nakhon Ratchasima / Thailand",
  coordinates: "14.9799 N / 102.0977 E",

  tagline: "I build digital experiences where code meets motion.",

  email: "kanthorn.wo@gmail.com",
  github: "https://github.com/Kanthorn1995",
  // TODO: add your LinkedIn URL - the link stays hidden until this is filled in.
  linkedin: "",

  available: true,
  availableLabel: "Available for opportunities",

  year: "2026",
} as const;

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
  { id: "hero", label: "INDEX", index: "00", inNav: false },
  { id: "work", label: "WORK", index: "01", inNav: true },
  { id: "about", label: "ABOUT", index: "02", inNav: true },
  { id: "experience", label: "EXPERIENCE", index: "03", inNav: true },
  { id: "contact", label: "CONTACT", index: "04", inNav: true },
] as const;

/** Look up a section's number/label pair for an in-page badge. */
export function sectionMeta(id: (typeof sections)[number]["id"]) {
  const s = sections.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown section id: ${id}`);
  return `${s.index} / ${s.label}`;
}
