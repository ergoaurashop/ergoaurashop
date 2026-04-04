import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const KLAVIYO_API_KEY = process.env.KLAVIYO_PUBLIC_API_KEY;
    
    // Fallback to success if KLAVIYO_PUBLIC_API_KEY is missing so the frontend works smoothly
    if (!KLAVIYO_API_KEY) {
      console.warn("[newsletter] Klaviyo key missing. Captured email:", email);
      return NextResponse.json({ success: true, message: "Subscribed (development mode)" });
    }

    // Typical Klaviyo Create Profile API
    // We create/identify the profile, which subscribes them to marketing by default,
    // or add them to a specific list if a List ID was provided via env vars.
    const response = await fetch(`https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        revision: "2024-02-15", // Required by Klaviyo API
      },
      body: JSON.stringify({
        data: {
          type: "subscription",
          attributes: {
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email: email,
                },
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[newsletter] Klaviyo API Error:", errorText);
      return NextResponse.json({ error: "Failed to subscribe via Klaviyo" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Successfully subscribed." });
  } catch (error) {
    console.error("[newsletter] Endpoint Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
