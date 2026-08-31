/* ============================================================
   PROJECTS
   Seeded from the real work found on your machine.
   Edit freely - the showcase reads straight from this array.

   IMAGES: leave `image` undefined and the card renders a
   generated particle-mesh visual seeded from the project id
   (stable and unique per project). Drop a screenshot into
   /public/projects/ and set `image` to swap in a real one.
   ============================================================ */

import type { Localized } from "@/lib/localized";

export type Project = {
  id: string;
  index: string;
  title: Localized;
  category: Localized;
  year: string;
  tech: string[];
  description: Localized;
  /** e.g. "/projects/jai-online.png" - optional, see note above */
  image?: string;
  href?: string;
  /** Exactly one project should be featured - it gets the full-viewport treatment. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "jai-online",
    index: "01",
    title: { en: "JAI Online Backoffice", th: "JAI Online Backoffice" },
    category: { en: "Web Application", th: "เว็บแอปพลิเคชัน" },
    year: "2023",
    tech: ["Next.js", "Tailwind CSS", "DaisyUI", "NextAuth", "Jenkins"],
    description: {
      en: "A production content and operations backoffice. Role-based authentication, a rich text publishing pipeline, and form-heavy admin flows built to stay fast with large datasets, shipped through a Jenkins CI pipeline.",
      th: "ระบบหลังบ้านสำหรับจัดการเนื้อหาและปฏิบัติการที่ใช้งานจริง มีระบบยืนยันตัวตนตาม role, pipeline สำหรับเผยแพร่ rich text และหน้าฟอร์มจัดการข้อมูลจำนวนมากที่ยังคงเร็วแม้ข้อมูลจะใหญ่ ส่งขึ้นระบบผ่าน Jenkins CI pipeline",
    },
    featured: true,
  },
  {
    id: "jaa-moo",
    index: "02",
    title: { en: "Jaa Moo", th: "Jaa Moo" },
    category: { en: "Full-Stack Product", th: "โปรดักต์ Full-Stack" },
    year: "2023",
    tech: ["React", "Redux Toolkit", "MUI", "Express", "MongoDB"],
    description: {
      en: "A full-stack product built end to end. React client with a Redux Toolkit state layer and a component system on MUI, talking to an Express API. The project the previous portfolio took its name from.",
      th: "โปรดักต์ full-stack ที่พัฒนาครบทุกส่วน ฝั่ง client ใช้ React ร่วมกับ Redux Toolkit จัดการ state และระบบ component บน MUI เชื่อมต่อกับ Express API เป็นโปรเจกต์ที่พอร์ตโฟลิโอเวอร์ชันก่อนหน้านำชื่อมาใช้",
    },
  },
  {
    id: "dosl",
    index: "03",
    title: {
      en: "Document Student Loan Fund System",
      th: "Document Student Loan Fund System",
    },
    category: { en: "System Design / Thesis", th: "ออกแบบระบบ / วิทยานิพนธ์" },
    year: "2023",
    tech: ["Laravel", "MySQL", "Linux", "Figma"],
    description: {
      en: "Thesis project. Analysed the student loan document workflow, designed the database schema and the UX for data-dense presentation, built it on Laravel and deployed it to a Linux server.",
      th: "โปรเจกต์วิทยานิพนธ์ วิเคราะห์ขั้นตอนเอกสารกองทุนเงินให้กู้ยืมเพื่อการศึกษา ออกแบบโครงสร้างฐานข้อมูลและ UX สำหรับการนำเสนอข้อมูลจำนวนมาก พัฒนาด้วย Laravel และ deploy บนเซิร์ฟเวอร์ Linux",
    },
    href: "https://github.com/Kanthorn1995/Project_DOSL",
  },
  {
    id: "touch-news",
    index: "04",
    title: { en: "News Platform", th: "แพลตฟอร์มข่าว" },
    category: { en: "Front-End / Internship", th: "Front-End / ฝึกงาน" },
    year: "2021",
    tech: ["React", "Figma", "Git"],
    description: {
      en: "Built at Touch Technologies. Took news website interfaces from Figma wireframe and prototype through to a working React front-end, collaborating with a multi-member team through Git.",
      th: "พัฒนาที่ Touch Technologies นำหน้าตาเว็บไซต์ข่าวจาก wireframe และ prototype ใน Figma มาพัฒนาต่อจนเป็นหน้าเว็บ React ที่ใช้งานได้จริง ทำงานร่วมกับทีมหลายคนผ่าน Git",
    },
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];
