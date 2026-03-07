import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["fr", "en", "es", "ar", "zh"],
  defaultLocale: "fr",
  localePrefix: "as-needed"
});

export const config = {
};
