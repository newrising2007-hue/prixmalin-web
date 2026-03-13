import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en", "es", "ar", "zh"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  localeDetection: false,
});
