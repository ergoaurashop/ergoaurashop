import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const topic = req.headers.get("x-shopify-topic");
    const hmac = req.headers.get("x-shopify-hmac-sha256");

    if (!topic || !hmac) {
      return NextResponse.json(
        { error: "Missing required Shopify headers" },
        { status: 400 }
      );
    }

    const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
    if (!secret) {
      console.error("Missing SHOPIFY_WEBHOOK_SECRET environment variable.");
      return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    const rawBody = await req.text();
    const hash = crypto
      .createHmac("sha256", secret)
      .update(rawBody, "utf8")
      .digest("base64");

    if (hash !== hmac) {
      console.error(
        `[${new Date().toISOString()}] Webhook signature verification failed for topic: ${topic}`
      );
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    console.log(`[${new Date().toISOString()}] Webhook received: ${topic}`);

    // Revalidation logic mapped strictly to blueprint rules
    switch (topic) {
      case "products/create":
        revalidatePath("/");
        revalidatePath("/collections", "page"); 
        break;

      case "products/update":
        if (payload.handle) {
          revalidatePath(`/products/${payload.handle}`);
        }
        revalidatePath("/");
        revalidatePath("/collections", "layout");
        break;

      case "products/delete":
        if (payload.handle) {
          revalidatePath(`/products/${payload.handle}`);
        }
        revalidatePath("/");
        revalidatePath("/collections", "layout");
        break;

      case "collections/create":
        revalidatePath("/collections");
        revalidatePath("/");
        break;

      case "collections/update":
        if (payload.handle) {
          revalidatePath(`/collections/${payload.handle}`);
        }
        revalidatePath("/");
        revalidatePath("/collections");
        break;

      case "collections/delete":
        revalidatePath("/collections");
        revalidatePath("/");
        break;

      case "inventory_levels/update":
        // For inventory hooks, typically inventory_level webhook yields item, not direct product handle.
        // We broadly clear the cache for products unless mapped properly. 
        revalidatePath("/products", "layout");
        break;

      default:
        console.log(`[${new Date().toISOString()}] Unhandled Shopify webhook topic: ${topic}`);
    }

    // Always returning 200 OK so Shopify doesn't trigger retry loops
    return NextResponse.json({ revalidated: true }, { status: 200 });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Webhook processing error:`, error);
    // Explicit 200 OK even on fails, Shopify retries on any non-200.
    return NextResponse.json({ error: "Internal processing error" }, { status: 200 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
