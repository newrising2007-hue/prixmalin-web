// app/api/bonus-codes/route.ts
import { NextResponse } from "next/server";
import { getActiveBonusCodes } from "@/src/lib/bonus-codes";

export const runtime = "nodejs";

export function GET(req: Request) {
  const url = new URL(req.url);

  const platform = url.searchParams.get("platform") ?? "pc";
  const gameSlug = url.searchParams.get("gameSlug") ?? undefined;

  if (
    platform !== "pc" &&
    platform !== "playstation" &&
    platform !== "xbox" &&
    platform !== "nintendo" &&
    platform !== "mobile"
  ) {
    return NextResponse.json(
      { error: "Invalid platform" },
      { status: 400 }
    );
  }

  const codes = getActiveBonusCodes({
    platform,
    gameSlug,
  });

  // Cache soft (utile sur Vercel)
  return NextResponse.json(
    { platform, gameSlug: gameSlug ?? null, count: codes.length, codes },
    {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300",
      },
    }
  );
}
