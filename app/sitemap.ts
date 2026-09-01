import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects"];

  return routes.map((route) => ({
    url: `${siteUrl}/${routing.defaultLocale}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${siteUrl}/${locale}${route}`])
      ),
    },
  }));
}
