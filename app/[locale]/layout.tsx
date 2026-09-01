import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Space_Grotesk, Inter, JetBrains_Mono, Noto_Sans_Thai } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { ThemeProvider, themeInitScript } from "@/components/theme/ThemeProvider";
import { site, siteUrl } from "@/data/site";
import { pick } from "@/lib/localized";
import { routing, type Locale } from "@/i18n/routing";

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

// Latin fonts above have no Thai glyphs - this fills in for `:lang(th)`
// content (see the override in globals.css) without touching the
// English typography at all.
const thai = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fullName = `${site.firstName.charAt(0)}${site.firstName
  .slice(1)
  .toLowerCase()} ${site.lastName.charAt(0)}${site.lastName.slice(1).toLowerCase()}`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;

  const title = `${fullName} — ${pick(site.role, l)}`;
  const description = pick(site.tagline, l);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    authors: [{ name: fullName }],
    keywords: [
      "Front-End Developer",
      "Creative Developer",
      "Next.js",
      "TypeScript",
      "GSAP",
      "Interactive Web",
      fullName,
      site.nameTh,
    ],
    alternates: {
      canonical: `/${l}`,
      languages: {
        en: "/en",
        th: "/th",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: l === "th" ? "th_TH" : "en_US",
      url: `/${l}`,
      siteName: fullName,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    verification: {
      google: "WCCPx1ZiCH-Q8RvjL_bss4nSPYA6TFFGugXw-yUjcmU",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
    { media: "(prefers-color-scheme: light)", color: "#F5F5F3" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale as Locale);

  const messages = await getMessages();

  // Person schema so Google's knowledge graph can associate this site
  // with both the English and Thai spellings of the name (search intent
  // this is meant to satisfy: "Kanthorn Wongsoma" / "กันต์ธร วงษ์โสมะ").
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: fullName,
    alternateName: site.nameTh,
    jobTitle: pick(site.role, locale as Locale),
    description: pick(site.identity, locale as Locale),
    url: siteUrl,
    email: `mailto:${site.email}`,
    sameAs: [site.github, site.linkedin].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nakhon Ratchasima",
      addressCountry: "TH",
    },
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} ${thai.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Applies the stored theme before first paint. Without this a
            stored light preference flashes dark on every load.
            next/script's beforeInteractive strategy (not a raw <script>
            tag) so the theme-init logic itself never re-executes on a
            repeat render. Because this layout owns <html lang>, it is
            necessarily the outermost layout AND parameterised by
            `[locale]` - switching locale re-renders it on the client,
            and React logs a benign dev-only "script tag encountered
            while rendering" warning for that re-render (harmless: the
            attribute it sets is already correct and persists across
            the soft navigation, and the warning does not appear for
            real visitors without React DevTools installed). */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
