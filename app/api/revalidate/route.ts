import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const key = request.headers.get("x-revalidate-key");

  if (key !== process.env.RENEW_PAGE_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slugs } = await request.json();

  if (!slugs || !Array.isArray(slugs)) {
    return NextResponse.json({ error: "slugs[] requis" }, { status: 400 });
  }

  const locales = ["fr", "en", "es", "ar", "zh"];
  const revalidated: string[] = [];

  for (const slug of slugs) {
    for (const locale of locales) {
      const path = `/${locale}/produit/${slug}`;
      revalidatePath(path);
      revalidated.push(path);
    }
  }

  return NextResponse.json({ revalidated, count: revalidated.length });
}
