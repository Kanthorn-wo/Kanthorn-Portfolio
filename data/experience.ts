/* ============================================================
   EXPERIENCE
   Only entries confirmed from your resume are filled in.
   The 2024 entry is a placeholder: employment history was not
   invented. Fill it in and it renders exactly like the rest.
   ============================================================ */

export type Experience = {
  year: string;
  role: string;
  org: string;
  period: string;
  tech: string[];
  description: string;
  /** Remove once filled in - hides the "to be completed" styling. */
  placeholder?: boolean;
};

export const experience: Experience[] = [
  {
    year: "2021",
    role: "Front-End Developer, Internship",
    org: "Touch Technologies",
    period: "Nov 2021 - Feb 2022",
    tech: ["React", "Figma", "Git"],
    description:
      "Designed news website interfaces as wireframes and prototypes in Figma, then built them out in React. Worked inside a multi-member team using Git for day-to-day collaboration.",
  },
  {
    year: "2023",
    role: "Computer Engineer, B.Eng",
    org: "Rajamangala University of Technology Isan",
    period: "2019 - 2023",
    tech: ["Laravel", "MySQL", "Linux"],
    description:
      "Graduated in Computer Engineering. Thesis: the Document Student Loan Fund System. System analysis, database design, UX for data presentation, built on Laravel and deployed to a Linux server.",
  },
  {
    // TODO: replace with your actual current role.
    year: "2024",
    role: "Front-End Developer",
    org: "Add your company",
    period: "2024 - Present",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    description:
      "Add what you are building now: the products, the stack, the problems you solved. This entry is a placeholder in data/experience.ts.",
    placeholder: true,
  },
];
