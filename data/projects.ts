/* ============================================================
   PROJECTS
   Seeded from the real work found on your machine.
   Edit freely - the showcase reads straight from this array.

   IMAGES: leave `image` undefined and the card renders a
   generated particle-mesh visual seeded from the project id
   (stable and unique per project). Drop a screenshot into
   /public/projects/ and set `image` to swap in a real one.
   ============================================================ */

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  tech: string[];
  description: string;
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
    title: "JAI Online Backoffice",
    category: "Web Application",
    year: "2023",
    tech: ["Next.js", "Tailwind CSS", "DaisyUI", "NextAuth", "Jenkins"],
    description:
      "A production content and operations backoffice. Role-based authentication, a rich text publishing pipeline, and form-heavy admin flows built to stay fast with large datasets, shipped through a Jenkins CI pipeline.",
    featured: true,
  },
  {
    id: "jaa-moo",
    index: "02",
    title: "Jaa Moo",
    category: "Full-Stack Product",
    year: "2023",
    tech: ["React", "Redux Toolkit", "MUI", "Express", "MongoDB"],
    description:
      "A full-stack product built end to end. React client with a Redux Toolkit state layer and a component system on MUI, talking to an Express API. The project the previous portfolio took its name from.",
  },
  {
    id: "dosl",
    index: "03",
    title: "Document Student Loan Fund System",
    category: "System Design / Thesis",
    year: "2023",
    tech: ["Laravel", "MySQL", "Linux", "Figma"],
    description:
      "Thesis project. Analysed the student loan document workflow, designed the database schema and the UX for data-dense presentation, built it on Laravel and deployed it to a Linux server.",
    href: "https://github.com/Kanthorn1995/Project_DOSL",
  },
  {
    id: "touch-news",
    index: "04",
    title: "News Platform",
    category: "Front-End / Internship",
    year: "2021",
    tech: ["React", "Figma", "Git"],
    description:
      "Built at Touch Technologies. Took news website interfaces from Figma wireframe and prototype through to a working React front-end, collaborating with a multi-member team through Git.",
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];
