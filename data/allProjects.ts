/* ============================================================
   ALL PROJECTS
   Full archive for the /projects listing page. `data/projects.ts`
   stays a small, curated set for the homepage showcase - this is
   the long tail behind "View all".

   Sourced from git commit history across client/agency repos.
   Entries are intentionally generic (no client names, brands, or
   live URLs) pending sign-off from each client/agency before any
   of that gets attached publicly. The shape matches `Project`
   from data/projects.ts exactly, so ProjectCard and ProjectVisual
   need no changes to render them.
   ============================================================ */

import type { Project } from "./projects";

export const allProjects: Project[] = [
  {
    id: "corporate-realestate-a",
    index: "01",
    title: "Property Developer Corporate Site",
    category: "Corporate Website",
    year: "2025–2026",
    tech: ["PHP", "LESS", "jQuery", "Payment Gateway API", "i18n", "GitLab CI", "SonarQube"],
    description:
      "Long-running corporate site for a property developer. Built and maintained an online booking/reservation flow with payment and OTP verification, led a site-wide SEO overhaul, and provided sustained production support.",
  },
  {
    id: "corporate-realestate-b",
    index: "02",
    title: "Real Estate Group Website",
    category: "Corporate Website",
    year: "2024–2026",
    tech: ["PHP", "LESS", "jQuery", "MySQL", "Facebook/Google API", "Sentry"],
    description:
      "Large-scale property developer website maintained for over two years — project detail pages, marketing microsites shipped on a monthly campaign cadence, and backend/SEO improvements.",
  },
  {
    id: "medical-case-platform",
    index: "03",
    title: "Medical Case Management Platform",
    category: "Healthcare Platform",
    year: "2025–2026",
    tech: ["PHP", "LESS", "jQuery", "Composer", "Sentry"],
    description:
      "Case management and teleconsultation platform for a specialist medical network — case workflows, role-based notifications, and a SonarQube-driven code quality pass.",
  },
  {
    id: "membership-sso-platform",
    index: "04",
    title: "Government-Linked Membership Platform",
    category: "Membership Platform",
    year: "2025–2026",
    tech: ["PHP", "LESS", "jQuery", "Docker", "SSO / Token Auth"],
    description:
      "Bilingual membership platform integrated with a national digital-ID SSO. Hardened the login flow by moving sensitive tokens server-side and resolved live production login failures.",
  },
  {
    id: "telemedicine-portal",
    index: "05",
    title: "Telemedicine Patient Portal",
    category: "Telemedicine Platform",
    year: "2024–2025",
    tech: ["Angular 18", "TypeScript", "RxJS", "Socket.IO", "SCSS"],
    description:
      "Multi-role telemedicine web app for patients, doctors, nurses and pharmacists — real-time chat/video consultations, a tele-pharmacy queue, and a hardened OTP authentication flow.",
  },
  {
    id: "grant-analytics-dashboard",
    index: "06",
    title: "Grant & Fund Analytics Dashboard",
    category: "Data Visualization",
    year: "2024–2026",
    tech: ["PHP", "Chart.js", "D3.js", "Flatpickr", "Composer"],
    description:
      "Analytics dashboard suite for a grant-tracking system, built with Chart.js and D3.js — sunburst/tree-map views, image export, and complex filterable data tables.",
  },
  {
    id: "membership-loyalty-platform",
    index: "07",
    title: "Membership & Privileges Platform",
    category: "Membership Platform",
    year: "2024–2025",
    tech: ["Next.js", "React", "TypeScript", "JWT / NextAuth"],
    description:
      "Multi-step registration and profile platform for a privilege-card membership program, with country-aware validation, WebP performance work, and multi-language support.",
  },
  {
    id: "investor-booking-site",
    index: "08",
    title: "Property Investor & Booking Site",
    category: "Corporate Website",
    year: "2025–2026",
    tech: ["Next.js", "React", "Redux", "i18next", "Chart.js"],
    description:
      "Combined investor-relations and online property booking site — reservation flow with OTP and e-signature, plus a trilingual investor-relations section.",
  },
  {
    id: "vc-corporate-site",
    index: "09",
    title: "Venture Capital Firm Website",
    category: "Corporate Website",
    year: "2026",
    tech: ["PHP (MVC)", "LESS", "jQuery", "Swiper.js"],
    description:
      "Marketing site for a corporate venture-capital firm — new page sections for a full design refresh, a cookie-consent system, and interaction polish.",
  },
  {
    id: "ticket-booking-app",
    index: "10",
    title: "Transport Ticket Booking App",
    category: "Mobile App",
    year: "2025–2026",
    tech: ["Flutter", "Dart", "Firebase", "JWT"],
    description:
      "Cross-platform Flutter app for bus-ticket booking — the core search-and-book flow, push notifications, and biometric-secured profile management.",
  },
  {
    id: "community-forum-platform",
    index: "11",
    title: "Multi-Tenant Community Forum",
    category: "Community Platform",
    year: "2026",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vitest"],
    description:
      "Built a full community forum module from scratch — registration, threaded replies, categories — with reCAPTCHA v3 abuse protection and test coverage.",
  },
  {
    id: "appliance-corporate-site",
    index: "12",
    title: "Home Appliance Brand Website",
    category: "Corporate Website",
    year: "2024",
    tech: ["Java", "Spring Boot", "Thymeleaf", "Google Maps API", "OAuth2"],
    description:
      "Corporate site for a home-appliance brand with an end-to-end store-locator feature — interactive map, gallery, get-directions — and social sharing.",
  },
  {
    id: "agent-mis-backoffice",
    index: "13",
    title: "Sales Agent Back-Office (MIS)",
    category: "Internal Tool",
    year: "2024–2025",
    tech: ["Angular 10", "ng-zorro-antd", "FullCalendar", "ApexCharts"],
    description:
      "Back-office system for a membership-card business — an agent-commission module with approval workflows and a holiday-management module.",
  },
  {
    id: "health-promo-site",
    index: "14",
    title: "Health Check-Up Campaign Site",
    category: "Marketing Website",
    year: "2026",
    tech: ["PHP", "LESS", "jQuery", "Docker"],
    description:
      "Marketing and booking site for a health check-up service, built around a reusable promotion-page template that cut turnaround time for new campaigns.",
  },
  {
    id: "ir-fintech-site",
    index: "15",
    title: "Financial Advisory Corporate Site",
    category: "Corporate Website",
    year: "2024",
    tech: ["WordPress", "PHP", "LESS", "jQuery"],
    description:
      "WordPress marketing site for an investor-relations/financial-advisory company — new pages built from scratch with a reusable scroll-animation system.",
  },
  {
    id: "realestate-email-system",
    index: "16",
    title: "Real Estate Email & CMS System",
    category: "CMS / Email System",
    year: "2026",
    tech: ["ASP.NET Core", "C#", "SQL"],
    description:
      "Transactional and marketing email template system for a real-estate CMS, with data-driven bilingual content.",
  },
  {
    id: "realestate-esg-site",
    index: "17",
    title: "Property Developer ESG Site",
    category: "Corporate Website",
    year: "2025–2026",
    tech: ["ASP.NET Core MVC", "EF Core", "SQL Server"],
    description:
      "Corporate-governance and ESG content sections for a property developer's site, plus an iterated reCAPTCHA v2 form-protection flow.",
  },
  {
    id: "ecommerce-consumer-brand",
    index: "18",
    title: "Consumer Brand E-Commerce Site",
    category: "E-Commerce",
    year: "2025",
    tech: ["PHP", "Guzzle", "Sentry", "PHPUnit"],
    description:
      "Shopping cart and ordering experience for a consumer product brand's online store, including a wishlist/favoriting feature.",
  },
  {
    id: "building-materials-site",
    index: "19",
    title: "Building Materials Corporate Site",
    category: "Corporate Website",
    year: "2026",
    tech: ["PHP", "JSON-LD / SEO"],
    description:
      "Multi-language marketing site for a building-materials manufacturer — an SEO structured-data rollout, an FAQ accordion, and a BIM-file download center.",
  },
  {
    id: "cultural-tourism-site",
    index: "20",
    title: "Cultural Tourism Site",
    category: "Marketing Website",
    year: "2026",
    tech: ["Next.js 16", "React 19", "TypeScript", "GSAP", "Lenis", "Radix UI"],
    description:
      "Modern-stack marketing site for a cultural tourism destination — GSAP scroll storytelling, Lenis smooth scroll, and a restructured i18n content system.",
  },
  {
    id: "lab-information-system",
    index: "21",
    title: "Laboratory Information System",
    category: "Healthcare System",
    year: "2025",
    tech: ["PHP", "LESS", "JavaScript"],
    description:
      "Foundational lab-workflow screens for a clinical laboratory system — test lists, specimen handling, and result approval.",
  },
  {
    id: "construction-reporting-tool",
    index: "22",
    title: "Construction Sales Reporting Tool",
    category: "Internal Tool",
    year: "2026",
    tech: ["PHP", "HTML5 Canvas", "Docker"],
    description:
      "Internal reporting tool for a construction company — canvas-based PDF/JPEG export of sales-status reports.",
  },
  {
    id: "gov-services-platform",
    index: "23",
    title: "Government Services Platform",
    category: "Government Platform",
    year: "2025–2026",
    tech: ["PHP", "Google Maps API"],
    description:
      "Multi-step request workflow and a QR-code payment/certificate flow for a government/business services platform.",
  },
  {
    id: "eoffice-document-system",
    index: "24",
    title: "E-Office Document System",
    category: "Internal Tool",
    year: "2025",
    tech: ["PHP", "PDF Generation"],
    description:
      "Internal document-circulation system with a site-wide maintenance-mode feature and refined PDF templates.",
  },
  {
    id: "auth-web-app",
    index: "25",
    title: "Authenticated Web Application",
    category: "Web Application",
    year: "2025",
    tech: ["ASP.NET Core", "C#"],
    description: "New login and account-verification flow for a web application.",
  },
  {
    id: "public-health-info-site",
    index: "26",
    title: "Public Health Information Site",
    category: "Public Information Site",
    year: "2026",
    tech: ["PHP"],
    description:
      "Public-facing rare-disease information site — pagination, a read-more interaction, and PDF/share UI updates.",
  },
  {
    id: "registration-landing-page",
    index: "27",
    title: "Registration Landing Page",
    category: "Landing Page",
    year: "2026",
    tech: ["PHP"],
    description: "Promotional landing page with a bilingual consent banner for a registration form.",
  },
  {
    id: "business-doc-management",
    index: "28",
    title: "Business Document Management",
    category: "Internal Tool",
    year: "2025",
    tech: ["PHP", "PDF Generation"],
    description: "Internal document-management tool — PDF styling fixes for debit-note documents.",
  },
  {
    id: "heritage-tourism-site",
    index: "29",
    title: "Heritage Tourism Site",
    category: "Tourism Website",
    year: "2024–2025",
    tech: ["PHP", "Interactive Map"],
    description:
      "Trilingual visitor-information site for a cultural heritage site, with an interactive site map.",
  },
  {
    id: "corporate-careers-site",
    index: "30",
    title: "Corporate Careers Site",
    category: "Corporate Website",
    year: "2026",
    tech: ["PHP"],
    description: "General corporate site — fixes to a careers-page parallax animation and header localization.",
  },
  {
    id: "economic-research-site",
    index: "31",
    title: "Economic Research Site",
    category: "Corporate Website",
    year: "2024",
    tech: ["PHP"],
    description:
      "Corporate research/insights site — fixed a session-fixation vulnerability found during a penetration test.",
  },
  {
    id: "webapp-nextjs-misc",
    index: "32",
    title: "Miscellaneous Web App",
    category: "Web Application",
    year: "2025",
    tech: ["Next.js", "React"],
    description: "Small Next.js web app with limited commit history available for a detailed summary.",
  },
  {
    id: "clinic-patient-portal",
    index: "33",
    title: "Clinic Patient Portal",
    category: "Healthcare Portal",
    year: "2026",
    tech: ["PHP"],
    description: "Patient and staff login portal for a clinic, with a redesigned header.",
  },
  {
    id: "foodkit-webapp",
    index: "34",
    title: "Food Kit Web App",
    category: "Web Application",
    year: "2025",
    tech: ["Angular", "TypeScript"],
    description: "Small Angular web app with limited commit history available for a detailed summary.",
  },
  {
    id: "brand-website-misc",
    index: "35",
    title: "Brand Website",
    category: "Brand Website",
    year: "2024–2025",
    tech: ["PHP"],
    description: "General brand website — upgraded to PHP 8.4 and fixed SEO meta tags.",
  },
];
