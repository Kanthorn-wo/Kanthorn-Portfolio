import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { routing } from "@/i18n/routing";

// Default locale is served unprefixed ("/"), other locales keep their
// prefix ("/th") - matches i18n/routing.ts localePrefix: "as-needed".
const localizedPath = (locale: string, route: string) =>
  locale === routing.defaultLocale ? route || "/" : `/${locale}${route}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects"];

  return routes.map((route) => ({
    url: `${siteUrl}${localizedPath(routing.defaultLocale, route)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${siteUrl}${localizedPath(locale, route)}`])
      ),
    },
  }));
}
