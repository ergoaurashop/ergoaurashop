import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/send";
import { welcomeEmail } from "@/lib/email/templates/welcome";

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: "email and name are required" },
        { status: 400 },
      );
    }

    const html = welcomeEmail({ customerName: name });

    const result = await sendEmail({
      to: email,
      subject: "Welcome to ErgoAura! 🎉",
      html,
    });

    if (result.success) {
      console.log(
        `[Welcome] ✅ Welcome email sent to ${email} (id: ${result.id})`,
      );
      return NextResponse.json({ success: true, id: result.id });
    }

    console.error(`[Welcome] ❌ Failed to send welcome email: ${result.error}`);
    return NextResponse.json(
      { error: result.error || "Failed to send email" },
      { status: 500 },
    );
  } catch (err) {
    console.error("[Welcome] Error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
