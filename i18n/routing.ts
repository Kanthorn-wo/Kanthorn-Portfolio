import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "th"],
  defaultLocale: "en",
  // "as-needed": default locale (en) is served at "/" with no prefix;
  // only non-default locales ("/th") get a prefix.
  localePrefix: "as-needed",
  // Without this, next-intl auto-redirects "/" to "/th" for visitors
  // whose browser Accept-Language is Thai, overriding defaultLocale.
  // "/" should always land on English first; visitors can still switch.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
