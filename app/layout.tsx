import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/theme/ThemeProvider";
import { site } from "@/data/site";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const fullName = `${site.firstName.charAt(0)}${site.firstName
  .slice(1)
  .toLowerCase()} ${site.lastName.charAt(0)}${site.lastName.slice(1).toLowerCase()}`;

export const metadata: Metadata = {
  title: `${fullName} — ${site.role}`,
  description: site.tagline,
  authors: [{ name: fullName }],
  keywords: [
    "Front-End Developer",
    "Creative Developer",
    "Next.js",
    "TypeScript",
    "GSAP",
    "Interactive Web",
    fullName,
  ],
  openGraph: {
    title: `${fullName} — ${site.role}`,
    description: site.tagline,
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
    { media: "(prefers-color-scheme: light)", color: "#F5F5F3" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        {/* Applies the stored theme before first paint. Without this a
            stored light preference flashes dark on every load. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
