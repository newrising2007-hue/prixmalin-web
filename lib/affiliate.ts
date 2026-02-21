export function buildAmazonLink(url: string): string {
  const tag = process.env.NEXT_PUBLIC_AMAZON_TAG;

  if (!tag) {
    console.warn("Amazon tag missing");
    return url;
  }

  try {
    const parsed = new URL(url);

    // Supprime ancien tag si présent
    parsed.searchParams.delete("tag");

    // Ajoute le tag affilié
    parsed.searchParams.append("tag", tag);

    return parsed.toString();
  } catch (error) {
    console.error("Invalid Amazon URL:", error);
    return url;
  }
}
