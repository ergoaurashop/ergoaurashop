import { NextRequest, NextResponse } from "next/server";
import { getCollectionPage } from "@/lib/shopify/collections";

/**
 * GET /api/collections?handle=deals&cursor=xxx
 *
 * Server-side proxy so client components can paginate collections
 * without exposing Shopify credentials to the browser.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");
  const cursor = searchParams.get("cursor") || undefined;
  const sortKey = searchParams.get("sortKey") || "COLLECTION_DEFAULT";
  const reverse = searchParams.get("reverse") === "true";

  if (!handle) {
    return NextResponse.json({ error: "Missing handle param" }, { status: 400 });
  }

  try {
    const collection = await getCollectionPage(handle, cursor, sortKey, reverse);
    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }
    return NextResponse.json({ collection });
  } catch (err) {
    console.error("[api/collections] error:", err);
    return NextResponse.json({ error: "Failed to fetch collection" }, { status: 500 });
  }
}
