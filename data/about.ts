/* ============================================================
   ABOUT
   Moved out of the component so `body` can hold both languages.
   Block 1 interpolates the author's name via a `{name}` token,
   replaced after `pick()` resolves the string for the active
   locale (name itself is a proper noun, not translated).
   See components/about/About.tsx.
   ============================================================ */

import type { Localized } from "@/lib/localized";

export type AboutBlock = {
  n: string;
  title: Localized;
  body: Localized;
};

export const aboutBlocks: AboutBlock[] = [
  {
    n: "01",
    title: { en: "Who", th: "ใคร" },
    body: {
      en: "I'm {name} — a Computer Engineer working as a Front-End Developer, building modern web experiences from the interface down to the architecture underneath.",
      th: "ผมคือ {name} — วิศวกรคอมพิวเตอร์ที่ทำงานเป็นนักพัฒนาฝั่ง Front-End สร้างประสบการณ์เว็บสมัยใหม่ตั้งแต่หน้าตาที่มองเห็นไปจนถึงสถาปัตยกรรมเบื้องหลัง",
    },
  },
  {
    n: "02",
    title: { en: "How", th: "อย่างไร" },
    body: {
      en: "I start from the interaction. A layout is only finished when it knows how it behaves — how it enters, how it responds, how it degrades. Motion is part of the design, not decoration added afterwards.",
      th: "ผมเริ่มต้นจาก interaction เสมอ เลย์เอาต์จะเสร็จสมบูรณ์ก็ต่อเมื่อรู้ว่ามันทำงานอย่างไร — เข้ามาอย่างไร ตอบสนองอย่างไร และเสื่อมสภาพอย่างไรเมื่อจำเป็น การเคลื่อนไหวเป็นส่วนหนึ่งของงานออกแบบ ไม่ใช่ของตกแต่งที่ใส่เพิ่มทีหลัง",
    },
  },
  {
    n: "03",
    title: { en: "What", th: "อะไร" },
    body: {
      en: "Production work in Next.js and TypeScript, backoffice systems that stay fast under real data, and full-stack builds across Laravel and Node. Front-end is where I focus, but I've shipped the layers behind it too.",
      th: "งานจริงด้าน Next.js และ TypeScript ระบบหลังบ้านที่ยังเร็วอยู่แม้ข้อมูลจริงจะเยอะ และงาน full-stack ทั้งฝั่ง Laravel และ Node แม้ Front-end จะเป็นจุดที่ผมโฟกัสที่สุด แต่ผมก็เคยพัฒนาชั้นที่อยู่เบื้องหลังมาแล้วเช่นกัน",
    },
  },
  {
    n: "04",
    title: { en: "Why", th: "ทำไม" },
    body: {
      en: "Because the web is the one medium where craft is immediately felt and rarely present. A site that moves well tells you someone cared — before a single word is read.",
      th: "เพราะเว็บเป็นสื่อเดียวที่ความใส่ใจในงานถูกรับรู้ได้ทันที แต่กลับพบเห็นได้ยาก เว็บไซต์ที่เคลื่อนไหวได้ดีบอกได้เลยว่ามีคนใส่ใจ — ก่อนจะอ่านคำแรกด้วยซ้ำ",
    },
  },
];
