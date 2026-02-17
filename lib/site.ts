export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

  if (!envUrl) return "https://prixmalin.ca";

  return envUrl.replace(/\/+$/, "");
}
