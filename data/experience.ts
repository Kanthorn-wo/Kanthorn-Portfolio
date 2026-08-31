/* ============================================================
   EXPERIENCE
   Only entries confirmed from your resume are filled in.
   The 2024 entry is a placeholder: employment history was not
   invented. Fill it in and it renders exactly like the rest.
   ============================================================ */

import type { Localized } from "@/lib/localized";

export type Experience = {
  year: string;
  role: Localized;
  org: Localized;
  period: string;
  tech: string[];
  description: Localized;
  /** Remove once filled in - hides the "to be completed" styling. */
  placeholder?: boolean;
};

export const experience: Experience[] = [
  {
    year: "2021",
    role: { en: "Front-End Developer, Internship", th: "นักพัฒนาฝั่ง Front-End (นักศึกษาฝึกงาน)" },
    org: { en: "Touch Technologies", th: "Touch Technologies" },
    period: "Nov 2021 - Feb 2022",
    tech: ["React", "Figma", "Git"],
    description: {
      en: "Designed news website interfaces as wireframes and prototypes in Figma, then built them out in React. Worked inside a multi-member team using Git for day-to-day collaboration.",
      th: "ออกแบบหน้าตาเว็บไซต์ข่าวเป็น wireframe และ prototype ด้วย Figma แล้วนำมาพัฒนาต่อด้วย React ทำงานร่วมกับทีมหลายคนโดยใช้ Git ในการทำงานร่วมกันในแต่ละวัน",
    },
  },
  {
    year: "2023",
    role: { en: "Computer Engineer, B.Eng", th: "วิศวกรคอมพิวเตอร์ (วศ.บ.)" },
    org: {
      en: "Rajamangala University of Technology Isan",
      th: "มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน",
    },
    period: "2019 - 2023",
    tech: ["Laravel", "MySQL", "Linux"],
    description: {
      en: "Graduated in Computer Engineering. Thesis: the Document Student Loan Fund System. System analysis, database design, UX for data presentation, built on Laravel and deployed to a Linux server.",
      th: "จบการศึกษาสาขาวิศวกรรมคอมพิวเตอร์ วิทยานิพนธ์: ระบบเอกสารกองทุนเงินให้กู้ยืมเพื่อการศึกษา วิเคราะห์ระบบ ออกแบบฐานข้อมูล ออกแบบ UX สำหรับการนำเสนอข้อมูล พัฒนาด้วย Laravel และ deploy บนเซิร์ฟเวอร์ Linux",
    },
  },
  {
    // TODO: replace with your actual current role.
    year: "2024",
    role: { en: "Front-End Developer", th: "นักพัฒนาฝั่ง Front-End" },
    org: { en: "Add your company", th: "ใส่ชื่อบริษัทของคุณ" },
    period: "2024 - Present",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    description: {
      en: "Add what you are building now: the products, the stack, the problems you solved. This entry is a placeholder in data/experience.ts.",
      th: "ใส่รายละเอียดสิ่งที่กำลังทำอยู่ตอนนี้ เช่น โปรดักต์ สแตกที่ใช้ และปัญหาที่แก้ไข รายการนี้เป็นเพียง placeholder ในไฟล์ data/experience.ts",
    },
    placeholder: true,
  },
];
