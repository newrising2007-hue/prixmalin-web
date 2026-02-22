export type AppRelease = "soon" | "apk" | "play";

export function getAppRelease(): AppRelease {
  const v = (process.env.NEXT_PUBLIC_APP_RELEASE || "soon").toLowerCase();
  if (v === "apk" || v === "play" || v === "soon") return v;
  return "soon";
}

export const PRIXMALIN = {
  apkUrl: process.env.NEXT_PUBLIC_PRIXMALIN_APK_URL || "",
  playUrl: process.env.NEXT_PUBLIC_PRIXMALIN_PLAY_URL || "",
  dealsUrl: process.env.NEXT_PUBLIC_DEALS_URL || "/",
  sizeMb: 25,
  languages: ["fr", "en", "es", "zh", "ar"] as const,
} as const;

export function getPrimaryDownloadUrl(): string | null {
  const release = getAppRelease();
  if (release === "play" && PRIXMALIN.playUrl) return PRIXMALIN.playUrl;
  if (release === "apk" && PRIXMALIN.apkUrl) return PRIXMALIN.apkUrl;
  return null;
}
