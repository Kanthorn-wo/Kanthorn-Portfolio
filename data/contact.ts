/* ============================================================
   CONTACT
   The big animated closing statement, moved out of the component
   so each line can hold both languages. See components/contact/Contact.tsx.
   ============================================================ */

import type { Localized } from "@/lib/localized";

export type ContactLine = {
  id: string;
  text: Localized;
  gradient?: boolean;
};

export const contactLines: ContactLine[] = [
  { id: "c1", text: { en: "LET'S BUILD", th: "มาสร้าง" } },
  { id: "c2", text: { en: "SOMETHING", th: "บางสิ่ง" } },
  { id: "c3", text: { en: "INTERESTING.", th: "ที่น่าสนใจกัน" }, gradient: true },
];
