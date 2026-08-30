/* ============================================================
   ALL PROJECTS
   Full archive for the /projects listing page. `data/projects.ts`
   stays a small, curated set for the homepage showcase - this is
   the long tail behind "View all".

   MOCK DATA: these are placeholder entries, not real client work.
   Swap them for the real archive whenever it exists; the shape
   matches `Project` from data/projects.ts exactly, so ProjectCard
   and ProjectVisual need no changes to render them.
   ============================================================ */

import type { Project } from "./projects";

export const allProjects: Project[] = [
  {
    id: "arc-dashboard",
    index: "01",
    title: "Arc Analytics Dashboard",
    category: "Data Visualization",
    year: "2024",
    tech: ["Next.js", "TypeScript", "D3.js", "Tailwind CSS"],
    description:
      "Real-time metrics dashboard for a fictional ops team - streaming charts, saved views, and a dense but legible data grid.",
  },
  {
    id: "haven-booking",
    index: "02",
    title: "Haven Booking Platform",
    category: "Full-Stack Product",
    year: "2024",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    description:
      "Multi-property reservation system with calendar-based availability, deposit handling, and a host-facing admin console.",
  },
  {
    id: "lumen-cms",
    index: "03",
    title: "Lumen Headless CMS",
    category: "Developer Tooling",
    year: "2024",
    tech: ["Next.js", "GraphQL", "MongoDB"],
    description:
      "Content model editor with live schema validation and a preview pane that renders drafts against the real front-end components.",
  },
  {
    id: "pixel-forge",
    index: "04",
    title: "Pixel Forge Design System",
    category: "Design System",
    year: "2023",
    tech: ["React", "Storybook", "TypeScript", "SCSS"],
    description:
      "Token-driven component library with automated visual regression tests and a Figma-to-code sync pipeline.",
  },
  {
    id: "orbit-crm",
    index: "05",
    title: "Orbit CRM",
    category: "SaaS Product",
    year: "2023",
    tech: ["Vue", "Laravel", "MySQL"],
    description:
      "Pipeline-based sales CRM with drag-and-drop deal stages, email sync, and role-based team permissions.",
  },
  {
    id: "signal-chat",
    index: "06",
    title: "Signal Support Chat",
    category: "Real-Time App",
    year: "2023",
    tech: ["React", "Socket.io", "Express", "Redis"],
    description:
      "Live customer-support widget with typing indicators, canned replies, and queue routing for a small support team.",
  },
  {
    id: "north-storefront",
    index: "07",
    title: "North Storefront",
    category: "E-Commerce",
    year: "2023",
    tech: ["Next.js", "Shopify API", "Tailwind CSS"],
    description:
      "Headless storefront on top of a Shopify backend - custom checkout flow, bundle logic, and a fast product filter UI.",
  },
  {
    id: "vantage-portfolio",
    index: "08",
    title: "Vantage Portfolio Tracker",
    category: "Fintech",
    year: "2023",
    tech: ["React", "TypeScript", "Chart.js"],
    description:
      "Personal investment tracker with cost-basis calculations, allocation charts, and CSV import from brokerage exports.",
  },
  {
    id: "meridian-lms",
    index: "09",
    title: "Meridian LMS",
    category: "EdTech",
    year: "2022",
    tech: ["Next.js", "PostgreSQL", "Prisma"],
    description:
      "Course-authoring and delivery platform with progress tracking, quiz branching, and certificate generation.",
  },
  {
    id: "kite-scheduler",
    index: "10",
    title: "Kite Team Scheduler",
    category: "Internal Tool",
    year: "2022",
    tech: ["React", "Node.js", "PostgreSQL"],
    description:
      "Shift-planning tool for a fictional retail chain - conflict detection, availability requests, and a printable weekly view.",
  },
  {
    id: "harbor-inventory",
    index: "11",
    title: "Harbor Inventory System",
    category: "Operations",
    year: "2022",
    tech: ["Vue", "Express", "MySQL"],
    description:
      "Warehouse stock tracker with barcode scanning support, low-stock alerts, and multi-location transfer records.",
  },
  {
    id: "cascade-blog",
    index: "12",
    title: "Cascade Publishing",
    category: "Content Platform",
    year: "2022",
    tech: ["Next.js", "MDX", "Contentful"],
    description:
      "Editorial site with a custom MDX pipeline, reading-time estimation, and an admin flow for scheduled publishing.",
  },
  {
    id: "quartz-portfolio-builder",
    index: "13",
    title: "Quartz Portfolio Builder",
    category: "SaaS Product",
    year: "2022",
    tech: ["React", "Firebase", "Tailwind CSS"],
    description:
      "Drag-and-drop site builder aimed at freelance creatives - live preview, custom domains, and section-level theming.",
  },
  {
    id: "ember-fitness",
    index: "14",
    title: "Ember Fitness Tracker",
    category: "Mobile Web",
    year: "2022",
    tech: ["React", "TypeScript", "PWA"],
    description:
      "Installable workout logger with offline support, rest-timer notifications, and a weekly progress summary.",
  },
  {
    id: "atlas-maps",
    index: "15",
    title: "Atlas Fleet Tracking",
    category: "Logistics",
    year: "2021",
    tech: ["React", "Mapbox GL", "Node.js"],
    description:
      "Live vehicle tracking board with route replay, geofence alerts, and a dispatcher-facing assignment panel.",
  },
  {
    id: "solace-booking-widget",
    index: "16",
    title: "Solace Booking Widget",
    category: "Embeddable Widget",
    year: "2021",
    tech: ["TypeScript", "Web Components", "Vite"],
    description:
      "Framework-agnostic embeddable appointment widget, shipped as a single script tag for small clinics and studios.",
  },
  {
    id: "beacon-status-page",
    index: "17",
    title: "Beacon Status Page",
    category: "Developer Tooling",
    year: "2021",
    tech: ["Next.js", "PostgreSQL", "WebSockets"],
    description:
      "Public incident and uptime status page with live updates, historical uptime charts, and subscriber notifications.",
  },
  {
    id: "gable-recipe",
    index: "18",
    title: "Gable Recipe Box",
    category: "Content Platform",
    year: "2021",
    tech: ["React", "Node.js", "MongoDB"],
    description:
      "Recipe organizer with unit conversion, ingredient scaling, and a shareable printable card view.",
  },
  {
    id: "trove-marketplace",
    index: "19",
    title: "Trove Marketplace",
    category: "Full-Stack Product",
    year: "2021",
    tech: ["Next.js", "Stripe Connect", "PostgreSQL"],
    description:
      "Two-sided marketplace for handmade goods - seller onboarding, escrow-style payouts, and review moderation.",
  },
  {
    id: "wren-notes",
    index: "20",
    title: "Wren Team Notes",
    category: "Productivity",
    year: "2021",
    tech: ["React", "Yjs", "Node.js"],
    description:
      "Collaborative note-taking app with real-time multi-cursor editing and a block-based document model.",
  },
  {
    id: "hollow-portfolio-cms",
    index: "21",
    title: "Hollow Studio Site",
    category: "Agency Site",
    year: "2020",
    tech: ["Next.js", "Sanity", "GSAP"],
    description:
      "Motion-heavy agency showcase site with a case-study template driven entirely by a headless CMS schema.",
  },
  {
    id: "current-weather-app",
    index: "22",
    title: "Current Weather",
    category: "Utility App",
    year: "2020",
    tech: ["React", "TypeScript", "OpenWeather API"],
    description:
      "Minimal weather app with hourly and 7-day views, saved locations, and severe-weather alert banners.",
  },
  {
    id: "tally-expense",
    index: "23",
    title: "Tally Expense Splitter",
    category: "Fintech",
    year: "2020",
    tech: ["Vue", "Firebase"],
    description:
      "Shared-expense tracker for roommates and trips - itemized splits, running balances, and settle-up suggestions.",
  },
  {
    id: "grove-events",
    index: "24",
    title: "Grove Events Platform",
    category: "Events",
    year: "2020",
    tech: ["Next.js", "PostgreSQL", "Stripe"],
    description:
      "Ticketed-event platform with seating charts, promo codes, and a check-in scanner app for door staff.",
  },
  {
    id: "ridge-portfolio-v1",
    index: "25",
    title: "Ridge — Personal Site v1",
    category: "Personal Site",
    year: "2020",
    tech: ["React", "Gatsby", "SCSS"],
    description:
      "An earlier personal portfolio - static-generated, simple case-study pages, first project to ship a custom cursor.",
  },
  {
    id: "pier-realestate",
    index: "26",
    title: "Pier Real Estate Listings",
    category: "Marketplace",
    year: "2019",
    tech: ["React", "Node.js", "MySQL"],
    description:
      "Property listing site with map-based search, saved searches, and agent contact workflows.",
  },
  {
    id: "loft-invoicing",
    index: "27",
    title: "Loft Invoicing Tool",
    category: "Internal Tool",
    year: "2019",
    tech: ["Laravel", "MySQL", "Vue"],
    description:
      "Freelancer invoicing tool with recurring invoices, PDF generation, and simple payment-status tracking.",
  },
  {
    id: "flint-quiz",
    index: "28",
    title: "Flint Quiz Builder",
    category: "EdTech",
    year: "2019",
    tech: ["React", "Firebase"],
    description:
      "Timed-quiz builder for classroom use with live leaderboards and auto-graded question banks.",
  },
  {
    id: "coast-menu",
    index: "29",
    title: "Coast Digital Menu",
    category: "Hospitality",
    year: "2019",
    tech: ["React", "Node.js"],
    description:
      "QR-code restaurant menu system with allergen tags, daily specials, and a lightweight owner-facing editor.",
  },
  {
    id: "yield-habit-tracker",
    index: "30",
    title: "Yield Habit Tracker",
    category: "Productivity",
    year: "2018",
    tech: ["React", "TypeScript"],
    description:
      "Streak-based habit tracker with a calendar heatmap view and weekly reflection prompts.",
  },
  {
    id: "bramble-blog-theme",
    index: "31",
    title: "Bramble Blog Theme",
    category: "Open Source",
    year: "2018",
    tech: ["Next.js", "MDX"],
    description:
      "Open-source blog starter theme - typography-first layout, dark mode, and RSS out of the box.",
  },
  {
    id: "acorn-todo",
    index: "32",
    title: "Acorn Task Manager",
    category: "Productivity",
    year: "2018",
    tech: ["React", "Redux"],
    description:
      "Early task manager built while learning Redux - nested projects, due dates, and keyboard-first navigation.",
  },
];
