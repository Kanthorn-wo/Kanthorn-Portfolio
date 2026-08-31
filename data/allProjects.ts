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
    title: {
      en: "Property Developer Corporate Site",
      th: "เว็บไซต์คอร์ปอเรทผู้พัฒนาอสังหาริมทรัพย์",
    },
    category: { en: "Corporate Website", th: "เว็บไซต์คอร์ปอเรท" },
    year: "2025–2026",
    tech: ["PHP", "LESS", "jQuery", "Payment Gateway API", "i18n", "GitLab CI", "SonarQube"],
    description: {
      en: "Long-running corporate site for a property developer. Built and maintained an online booking/reservation flow with payment and OTP verification, led a site-wide SEO overhaul, and provided sustained production support.",
      th: "เว็บไซต์คอร์ปอเรทของผู้พัฒนาอสังหาริมทรัพย์ที่ดูแลต่อเนื่องมายาวนาน พัฒนาและดูแลระบบจอง/สำรองพร้อมการชำระเงินและยืนยัน OTP นำทีมทำ SEO overhaul ทั้งเว็บไซต์ และดูแล production อย่างต่อเนื่อง",
    },
  },
  {
    id: "corporate-realestate-b",
    index: "02",
    title: { en: "Real Estate Group Website", th: "เว็บไซต์กลุ่มบริษัทอสังหาริมทรัพย์" },
    category: { en: "Corporate Website", th: "เว็บไซต์คอร์ปอเรท" },
    year: "2024–2026",
    tech: ["PHP", "LESS", "jQuery", "MySQL", "Facebook/Google API", "Sentry"],
    description: {
      en: "Large-scale property developer website maintained for over two years — project detail pages, marketing microsites shipped on a monthly campaign cadence, and backend/SEO improvements.",
      th: "เว็บไซต์ของผู้พัฒนาอสังหาริมทรัพย์ขนาดใหญ่ที่ดูแลมากว่าสองปี — หน้ารายละเอียดโครงการ, microsite การตลาดที่ส่งมอบตามรอบแคมเปญรายเดือน และการปรับปรุง backend/SEO",
    },
  },
  {
    id: "medical-case-platform",
    index: "03",
    title: {
      en: "Medical Case Management Platform",
      th: "แพลตฟอร์มบริหารจัดการเคสทางการแพทย์",
    },
    category: { en: "Healthcare Platform", th: "แพลตฟอร์มด้านสุขภาพ" },
    year: "2025–2026",
    tech: ["PHP", "LESS", "jQuery", "Composer", "Sentry"],
    description: {
      en: "Case management and teleconsultation platform for a specialist medical network — case workflows, role-based notifications, and a SonarQube-driven code quality pass.",
      th: "แพลตฟอร์มบริหารจัดการเคสและปรึกษาทางไกลสำหรับเครือข่ายแพทย์เฉพาะทาง — workflow จัดการเคส, ระบบแจ้งเตือนตาม role และการปรับปรุงคุณภาพโค้ดตามผลตรวจจาก SonarQube",
    },
  },
  {
    id: "membership-sso-platform",
    index: "04",
    title: {
      en: "Government-Linked Membership Platform",
      th: "แพลตฟอร์มสมาชิกเชื่อมโยงหน่วยงานรัฐ",
    },
    category: { en: "Membership Platform", th: "แพลตฟอร์มสมาชิก" },
    year: "2025–2026",
    tech: ["PHP", "LESS", "jQuery", "Docker", "SSO / Token Auth"],
    description: {
      en: "Bilingual membership platform integrated with a national digital-ID SSO. Hardened the login flow by moving sensitive tokens server-side and resolved live production login failures.",
      th: "แพลตฟอร์มสมาชิกสองภาษาที่เชื่อมต่อกับระบบ digital ID ของภาครัฐ ปรับปรุงความปลอดภัยของ login flow โดยย้าย token ที่อ่อนไหวไปไว้ฝั่งเซิร์ฟเวอร์ และแก้ปัญหา login ล้มเหลวจริงบน production",
    },
  },
  {
    id: "telemedicine-portal",
    index: "05",
    title: { en: "Telemedicine Patient Portal", th: "พอร์ทัลผู้ป่วยเทเลเมดิซีน" },
    category: { en: "Telemedicine Platform", th: "แพลตฟอร์มเทเลเมดิซีน" },
    year: "2024–2025",
    tech: ["Angular 18", "TypeScript", "RxJS", "Socket.IO", "SCSS"],
    description: {
      en: "Multi-role telemedicine web app for patients, doctors, nurses and pharmacists — real-time chat/video consultations, a tele-pharmacy queue, and a hardened OTP authentication flow.",
      th: "เว็บแอปเทเลเมดิซีนสำหรับผู้ป่วย แพทย์ พยาบาล และเภสัชกร — ระบบแชท/วิดีโอคอลแบบเรียลไทม์, คิว tele-pharmacy และระบบยืนยันตัวตนด้วย OTP ที่ปลอดภัยยิ่งขึ้น",
    },
  },
  {
    id: "grant-analytics-dashboard",
    index: "06",
    title: {
      en: "Grant & Fund Analytics Dashboard",
      th: "Dashboard วิเคราะห์ข้อมูลทุนและกองทุน",
    },
    category: { en: "Data Visualization", th: "การแสดงผลข้อมูล" },
    year: "2024–2026",
    tech: ["PHP", "Chart.js", "D3.js", "Flatpickr", "Composer"],
    description: {
      en: "Analytics dashboard suite for a grant-tracking system, built with Chart.js and D3.js — sunburst/tree-map views, image export, and complex filterable data tables.",
      th: "ชุด dashboard วิเคราะห์ข้อมูลสำหรับระบบติดตามทุน พัฒนาด้วย Chart.js และ D3.js — มุมมองแบบ sunburst/tree-map, การ export เป็นภาพ และตารางข้อมูลที่กรองได้ซับซ้อน",
    },
  },
  {
    id: "membership-loyalty-platform",
    index: "07",
    title: { en: "Membership & Privileges Platform", th: "แพลตฟอร์มสมาชิกและสิทธิพิเศษ" },
    category: { en: "Membership Platform", th: "แพลตฟอร์มสมาชิก" },
    year: "2024–2025",
    tech: ["Next.js", "React", "TypeScript", "JWT / NextAuth"],
    description: {
      en: "Multi-step registration and profile platform for a privilege-card membership program, with country-aware validation, WebP performance work, and multi-language support.",
      th: "แพลตฟอร์มลงทะเบียนและจัดการโปรไฟล์หลายขั้นตอนสำหรับโปรแกรมสมาชิกบัตรสิทธิพิเศษ พร้อมการตรวจสอบข้อมูลตามประเทศ, ปรับปรุงประสิทธิภาพด้วย WebP และรองรับหลายภาษา",
    },
  },
  {
    id: "investor-booking-site",
    index: "08",
    title: {
      en: "Property Investor & Booking Site",
      th: "เว็บไซต์นักลงทุนอสังหาริมทรัพย์และระบบจอง",
    },
    category: { en: "Corporate Website", th: "เว็บไซต์คอร์ปอเรท" },
    year: "2025–2026",
    tech: ["Next.js", "React", "Redux", "i18next", "Chart.js"],
    description: {
      en: "Combined investor-relations and online property booking site — reservation flow with OTP and e-signature, plus a trilingual investor-relations section.",
      th: "เว็บไซต์ที่รวมทั้งข้อมูลนักลงทุนสัมพันธ์และระบบจองอสังหาริมทรัพย์ออนไลน์ — ระบบจองพร้อม OTP และลายเซ็นอิเล็กทรอนิกส์ รวมถึงส่วนนักลงทุนสัมพันธ์แบบสามภาษา",
    },
  },
  {
    id: "vc-corporate-site",
    index: "09",
    title: { en: "Venture Capital Firm Website", th: "เว็บไซต์บริษัทร่วมทุน" },
    category: { en: "Corporate Website", th: "เว็บไซต์คอร์ปอเรท" },
    year: "2026",
    tech: ["PHP (MVC)", "LESS", "jQuery", "Swiper.js"],
    description: {
      en: "Marketing site for a corporate venture-capital firm — new page sections for a full design refresh, a cookie-consent system, and interaction polish.",
      th: "เว็บไซต์การตลาดของบริษัทร่วมทุนในเครือองค์กร — พัฒนาหน้าใหม่หลายส่วนตาม design refresh ทั้งเว็บ, ระบบ cookie-consent และปรับปรุง interaction ให้ลื่นไหลขึ้น",
    },
  },
  {
    id: "ticket-booking-app",
    index: "10",
    title: { en: "Transport Ticket Booking App", th: "แอปจองตั๋วเดินทาง" },
    category: { en: "Mobile App", th: "แอปมือถือ" },
    year: "2025–2026",
    tech: ["Flutter", "Dart", "Firebase", "JWT"],
    description: {
      en: "Cross-platform Flutter app for bus-ticket booking — the core search-and-book flow, push notifications, and biometric-secured profile management.",
      th: "แอป Flutter ข้ามแพลตฟอร์มสำหรับจองตั๋วรถโดยสาร — flow ค้นหาและจองตั๋วหลัก, push notification และการจัดการโปรไฟล์ที่ป้องกันด้วย biometric",
    },
  },
  {
    id: "community-forum-platform",
    index: "11",
    title: { en: "Multi-Tenant Community Forum", th: "เว็บบอร์ดชุมชนแบบ Multi-Tenant" },
    category: { en: "Community Platform", th: "แพลตฟอร์มชุมชน" },
    year: "2026",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vitest"],
    description: {
      en: "Built a full community forum module from scratch — registration, threaded replies, categories — with reCAPTCHA v3 abuse protection and test coverage.",
      th: "พัฒนาโมดูลเว็บบอร์ดชุมชนแบบครบวงจรตั้งแต่ศูนย์ — ระบบสมัครสมาชิก, การตอบกลับแบบ threaded, หมวดหมู่ — พร้อมป้องกันการโจมตีด้วย reCAPTCHA v3 และมี test coverage",
    },
  },
  {
    id: "appliance-corporate-site",
    index: "12",
    title: { en: "Home Appliance Brand Website", th: "เว็บไซต์แบรนด์เครื่องใช้ไฟฟ้า" },
    category: { en: "Corporate Website", th: "เว็บไซต์คอร์ปอเรท" },
    year: "2024",
    tech: ["Java", "Spring Boot", "Thymeleaf", "Google Maps API", "OAuth2"],
    description: {
      en: "Corporate site for a home-appliance brand with an end-to-end store-locator feature — interactive map, gallery, get-directions — and social sharing.",
      th: "เว็บไซต์คอร์ปอเรทของแบรนด์เครื่องใช้ไฟฟ้าในบ้าน พร้อมฟีเจอร์ค้นหาสาขาแบบครบวงจร — แผนที่แบบ interactive, แกลเลอรี, นำทางไปยังสาขา — และระบบแชร์โซเชียล",
    },
  },
  {
    id: "agent-mis-backoffice",
    index: "13",
    title: { en: "Sales Agent Back-Office (MIS)", th: "ระบบหลังบ้านบริหารตัวแทนขาย (MIS)" },
    category: { en: "Internal Tool", th: "เครื่องมือภายในองค์กร" },
    year: "2024–2025",
    tech: ["Angular 10", "ng-zorro-antd", "FullCalendar", "ApexCharts"],
    description: {
      en: "Back-office system for a membership-card business — an agent-commission module with approval workflows and a holiday-management module.",
      th: "ระบบหลังบ้านสำหรับธุรกิจบัตรสมาชิก — โมดูลค่าคอมมิชชั่นตัวแทนพร้อม workflow อนุมัติ และโมดูลจัดการวันหยุด",
    },
  },
  {
    id: "health-promo-site",
    index: "14",
    title: { en: "Health Check-Up Campaign Site", th: "เว็บไซต์แคมเปญตรวจสุขภาพ" },
    category: { en: "Marketing Website", th: "เว็บไซต์การตลาด" },
    year: "2026",
    tech: ["PHP", "LESS", "jQuery", "Docker"],
    description: {
      en: "Marketing and booking site for a health check-up service, built around a reusable promotion-page template that cut turnaround time for new campaigns.",
      th: "เว็บไซต์การตลาดและจองสำหรับบริการตรวจสุขภาพ พัฒนาบน template หน้าโปรโมชั่นแบบใช้ซ้ำได้ ช่วยลดเวลาทำงานสำหรับแคมเปญใหม่แต่ละครั้ง",
    },
  },
  {
    id: "ir-fintech-site",
    index: "15",
    title: { en: "Financial Advisory Corporate Site", th: "เว็บไซต์คอร์ปอเรทที่ปรึกษาทางการเงิน" },
    category: { en: "Corporate Website", th: "เว็บไซต์คอร์ปอเรท" },
    year: "2024",
    tech: ["WordPress", "PHP", "LESS", "jQuery"],
    description: {
      en: "WordPress marketing site for an investor-relations/financial-advisory company — new pages built from scratch with a reusable scroll-animation system.",
      th: "เว็บไซต์การตลาดบน WordPress ของบริษัทที่ปรึกษาด้านนักลงทุนสัมพันธ์/การเงิน — สร้างหน้าใหม่ตั้งแต่ศูนย์พร้อมระบบ scroll-animation ที่ใช้ซ้ำได้",
    },
  },
  {
    id: "realestate-email-system",
    index: "16",
    title: { en: "Real Estate Email & CMS System", th: "ระบบอีเมลและ CMS อสังหาริมทรัพย์" },
    category: { en: "CMS / Email System", th: "ระบบ CMS / อีเมล" },
    year: "2026",
    tech: ["ASP.NET Core", "C#", "SQL"],
    description: {
      en: "Transactional and marketing email template system for a real-estate CMS, with data-driven bilingual content.",
      th: "ระบบ template อีเมลธุรกรรมและการตลาดสำหรับ CMS ด้านอสังหาริมทรัพย์ พร้อมเนื้อหาสองภาษาที่ขับเคลื่อนด้วยข้อมูล",
    },
  },
  {
    id: "realestate-esg-site",
    index: "17",
    title: { en: "Property Developer ESG Site", th: "เว็บไซต์ ESG ผู้พัฒนาอสังหาริมทรัพย์" },
    category: { en: "Corporate Website", th: "เว็บไซต์คอร์ปอเรท" },
    year: "2025–2026",
    tech: ["ASP.NET Core MVC", "EF Core", "SQL Server"],
    description: {
      en: "Corporate-governance and ESG content sections for a property developer's site, plus an iterated reCAPTCHA v2 form-protection flow.",
      th: "ส่วนเนื้อหาบรรษัทภิบาลและ ESG สำหรับเว็บไซต์ผู้พัฒนาอสังหาริมทรัพย์ พร้อมระบบป้องกันฟอร์มด้วย reCAPTCHA v2 ที่พัฒนาต่อเนื่อง",
    },
  },
  {
    id: "ecommerce-consumer-brand",
    index: "18",
    title: { en: "Consumer Brand E-Commerce Site", th: "เว็บไซต์อีคอมเมิร์ซแบรนด์สินค้าอุปโภคบริโภค" },
    category: { en: "E-Commerce", th: "อีคอมเมิร์ซ" },
    year: "2025",
    tech: ["PHP", "Guzzle", "Sentry", "PHPUnit"],
    description: {
      en: "Shopping cart and ordering experience for a consumer product brand's online store, including a wishlist/favoriting feature.",
      th: "ประสบการณ์ตะกร้าสินค้าและการสั่งซื้อสำหรับร้านค้าออนไลน์ของแบรนด์สินค้าอุปโภคบริโภค รวมถึงฟีเจอร์ wishlist/รายการโปรด",
    },
  },
  {
    id: "building-materials-site",
    index: "19",
    title: { en: "Building Materials Corporate Site", th: "เว็บไซต์คอร์ปอเรทวัสดุก่อสร้าง" },
    category: { en: "Corporate Website", th: "เว็บไซต์คอร์ปอเรท" },
    year: "2026",
    tech: ["PHP", "JSON-LD / SEO"],
    description: {
      en: "Multi-language marketing site for a building-materials manufacturer — an SEO structured-data rollout, an FAQ accordion, and a BIM-file download center.",
      th: "เว็บไซต์การตลาดหลายภาษาของผู้ผลิตวัสดุก่อสร้าง — เพิ่ม structured data สำหรับ SEO, FAQ แบบ accordion และศูนย์ดาวน์โหลดไฟล์ BIM",
    },
  },
  {
    id: "cultural-tourism-site",
    index: "20",
    title: { en: "Cultural Tourism Site", th: "เว็บไซต์ท่องเที่ยวเชิงวัฒนธรรม" },
    category: { en: "Marketing Website", th: "เว็บไซต์การตลาด" },
    year: "2026",
    tech: ["Next.js 16", "React 19", "TypeScript", "GSAP", "Lenis", "Radix UI"],
    description: {
      en: "Modern-stack marketing site for a cultural tourism destination — GSAP scroll storytelling, Lenis smooth scroll, and a restructured i18n content system.",
      th: "เว็บไซต์การตลาดสแต็คทันสมัยสำหรับแหล่งท่องเที่ยวเชิงวัฒนธรรม — เล่าเรื่องด้วย scroll animation ผ่าน GSAP, smooth scroll ด้วย Lenis และปรับโครงสร้างระบบ i18n ใหม่",
    },
  },
  {
    id: "lab-information-system",
    index: "21",
    title: { en: "Laboratory Information System", th: "ระบบข้อมูลห้องปฏิบัติการ" },
    category: { en: "Healthcare System", th: "ระบบด้านสุขภาพ" },
    year: "2025",
    tech: ["PHP", "LESS", "JavaScript"],
    description: {
      en: "Foundational lab-workflow screens for a clinical laboratory system — test lists, specimen handling, and result approval.",
      th: "หน้าจอพื้นฐานสำหรับ workflow ห้องปฏิบัติการของระบบแล็บทางคลินิก — รายการตรวจ, การจัดการตัวอย่าง และการอนุมัติผล",
    },
  },
  {
    id: "construction-reporting-tool",
    index: "22",
    title: { en: "Construction Sales Reporting Tool", th: "เครื่องมือรายงานยอดขายงานก่อสร้าง" },
    category: { en: "Internal Tool", th: "เครื่องมือภายในองค์กร" },
    year: "2026",
    tech: ["PHP", "HTML5 Canvas", "Docker"],
    description: {
      en: "Internal reporting tool for a construction company — canvas-based PDF/JPEG export of sales-status reports.",
      th: "เครื่องมือรายงานภายในสำหรับบริษัทก่อสร้าง — export รายงานสถานะการขายเป็น PDF/JPEG ด้วย canvas",
    },
  },
  {
    id: "gov-services-platform",
    index: "23",
    title: { en: "Government Services Platform", th: "แพลตฟอร์มบริการภาครัฐ" },
    category: { en: "Government Platform", th: "แพลตฟอร์มภาครัฐ" },
    year: "2025–2026",
    tech: ["PHP", "Google Maps API"],
    description: {
      en: "Multi-step request workflow and a QR-code payment/certificate flow for a government/business services platform.",
      th: "workflow คำขอหลายขั้นตอนและระบบชำระเงิน/ออกใบรับรองด้วย QR code สำหรับแพลตฟอร์มบริการภาครัฐ/ธุรกิจ",
    },
  },
  {
    id: "eoffice-document-system",
    index: "24",
    title: { en: "E-Office Document System", th: "ระบบเอกสารสารบรรณอิเล็กทรอนิกส์" },
    category: { en: "Internal Tool", th: "เครื่องมือภายในองค์กร" },
    year: "2025",
    tech: ["PHP", "PDF Generation"],
    description: {
      en: "Internal document-circulation system with a site-wide maintenance-mode feature and refined PDF templates.",
      th: "ระบบเวียนเอกสารภายในองค์กร พร้อมฟีเจอร์ maintenance-mode ทั้งเว็บและ PDF template ที่ปรับปรุงให้ดีขึ้น",
    },
  },
  {
    id: "auth-web-app",
    index: "25",
    title: { en: "Authenticated Web Application", th: "เว็บแอปพลิเคชันที่มีระบบยืนยันตัวตน" },
    category: { en: "Web Application", th: "เว็บแอปพลิเคชัน" },
    year: "2025",
    tech: ["ASP.NET Core", "C#"],
    description: {
      en: "New login and account-verification flow for a web application.",
      th: "flow การเข้าสู่ระบบและยืนยันบัญชีใหม่สำหรับเว็บแอปพลิเคชัน",
    },
  },
  {
    id: "public-health-info-site",
    index: "26",
    title: { en: "Public Health Information Site", th: "เว็บไซต์ข้อมูลสุขภาพสาธารณะ" },
    category: { en: "Public Information Site", th: "เว็บไซต์ข้อมูลสาธารณะ" },
    year: "2026",
    tech: ["PHP"],
    description: {
      en: "Public-facing rare-disease information site — pagination, a read-more interaction, and PDF/share UI updates.",
      th: "เว็บไซต์ข้อมูลโรคหายากสำหรับสาธารณะ — เพิ่ม pagination, การโต้ตอบแบบ read-more และปรับปรุง UI ของ PDF/การแชร์",
    },
  },
  {
    id: "registration-landing-page",
    index: "27",
    title: { en: "Registration Landing Page", th: "หน้า Landing Page ลงทะเบียน" },
    category: { en: "Landing Page", th: "หน้า Landing Page" },
    year: "2026",
    tech: ["PHP"],
    description: {
      en: "Promotional landing page with a bilingual consent banner for a registration form.",
      th: "หน้า landing page โปรโมชั่นพร้อม banner ขอความยินยอมสองภาษาสำหรับฟอร์มลงทะเบียน",
    },
  },
  {
    id: "business-doc-management",
    index: "28",
    title: { en: "Business Document Management", th: "ระบบจัดการเอกสารธุรกิจ" },
    category: { en: "Internal Tool", th: "เครื่องมือภายในองค์กร" },
    year: "2025",
    tech: ["PHP", "PDF Generation"],
    description: {
      en: "Internal document-management tool — PDF styling fixes for debit-note documents.",
      th: "เครื่องมือจัดการเอกสารภายในองค์กร — แก้ไขการจัดรูปแบบ PDF สำหรับเอกสารใบลดหนี้",
    },
  },
  {
    id: "heritage-tourism-site",
    index: "29",
    title: { en: "Heritage Tourism Site", th: "เว็บไซต์ท่องเที่ยวเชิงมรดกวัฒนธรรม" },
    category: { en: "Tourism Website", th: "เว็บไซต์ท่องเที่ยว" },
    year: "2024–2025",
    tech: ["PHP", "Interactive Map"],
    description: {
      en: "Trilingual visitor-information site for a cultural heritage site, with an interactive site map.",
      th: "เว็บไซต์ข้อมูลนักท่องเที่ยวสามภาษาสำหรับแหล่งมรดกวัฒนธรรม พร้อมแผนที่แบบ interactive",
    },
  },
  {
    id: "corporate-careers-site",
    index: "30",
    title: { en: "Corporate Careers Site", th: "เว็บไซต์คอร์ปอเรท (สมัครงาน)" },
    category: { en: "Corporate Website", th: "เว็บไซต์คอร์ปอเรท" },
    year: "2026",
    tech: ["PHP"],
    description: {
      en: "General corporate site — fixes to a careers-page parallax animation and header localization.",
      th: "เว็บไซต์คอร์ปอเรททั่วไป — แก้ไข parallax animation ในหน้าสมัครงานและปรับ header ให้รองรับหลายภาษา",
    },
  },
  {
    id: "economic-research-site",
    index: "31",
    title: { en: "Economic Research Site", th: "เว็บไซต์วิจัยเศรษฐกิจ" },
    category: { en: "Corporate Website", th: "เว็บไซต์คอร์ปอเรท" },
    year: "2024",
    tech: ["PHP"],
    description: {
      en: "Corporate research/insights site — fixed a session-fixation vulnerability found during a penetration test.",
      th: "เว็บไซต์เผยแพร่งานวิจัย/บทวิเคราะห์ขององค์กร — แก้ไขช่องโหว่ session fixation ที่พบจากการทำ penetration test",
    },
  },
  {
    id: "webapp-nextjs-misc",
    index: "32",
    title: { en: "Miscellaneous Web App", th: "เว็บแอปพลิเคชันเบ็ดเตล็ด" },
    category: { en: "Web Application", th: "เว็บแอปพลิเคชัน" },
    year: "2025",
    tech: ["Next.js", "React"],
    description: {
      en: "Small Next.js web app with limited commit history available for a detailed summary.",
      th: "เว็บแอปขนาดเล็กด้วย Next.js มีประวัติ commit จำกัดจึงสรุปรายละเอียดเพิ่มเติมไม่ได้",
    },
  },
  {
    id: "clinic-patient-portal",
    index: "33",
    title: { en: "Clinic Patient Portal", th: "พอร์ทัลผู้ป่วยคลินิก" },
    category: { en: "Healthcare Portal", th: "พอร์ทัลด้านสุขภาพ" },
    year: "2026",
    tech: ["PHP"],
    description: {
      en: "Patient and staff login portal for a clinic, with a redesigned header.",
      th: "พอร์ทัลเข้าสู่ระบบสำหรับผู้ป่วยและเจ้าหน้าที่ของคลินิก พร้อมออกแบบ header ใหม่",
    },
  },
  {
    id: "foodkit-webapp",
    index: "34",
    title: { en: "Food Kit Web App", th: "เว็บแอปชุดอาหาร" },
    category: { en: "Web Application", th: "เว็บแอปพลิเคชัน" },
    year: "2025",
    tech: ["Angular", "TypeScript"],
    description: {
      en: "Small Angular web app with limited commit history available for a detailed summary.",
      th: "เว็บแอปขนาดเล็กด้วย Angular มีประวัติ commit จำกัดจึงสรุปรายละเอียดเพิ่มเติมไม่ได้",
    },
  },
  {
    id: "brand-website-misc",
    index: "35",
    title: { en: "Brand Website", th: "เว็บไซต์แบรนด์" },
    category: { en: "Brand Website", th: "เว็บไซต์แบรนด์" },
    year: "2024–2025",
    tech: ["PHP"],
    description: {
      en: "General brand website — upgraded to PHP 8.4 and fixed SEO meta tags.",
      th: "เว็บไซต์แบรนด์ทั่วไป — อัปเกรดเป็น PHP 8.4 และแก้ไข meta tag สำหรับ SEO",
    },
  },
];
