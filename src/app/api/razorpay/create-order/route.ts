import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "@/lib/constants";

// Validate that Razorpay credentials are configured before creating the instance
if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.error(
    "Missing Razorpay credentials – check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET env vars",
  );
}

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

export async function POST(request: Request) {
  try {
    const { amount, currency } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      console.error(
        "Razorpay credentials are missing – check environment variables",
      );
      return NextResponse.json(
        { error: "Payment service is not configured" },
        { status: 500 },
      );
    }

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: unknown) {
    // Log the full error details for server-side debugging
    console.error("=== Razorpay create-order error ===");
    console.error("Error type:", typeof error);
    console.error(
      "Full error:",
      JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
    );
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // Extract the most descriptive error message available
    let errorMessage = "Failed to create order";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "object" && error !== null) {
      const errObj = error as Record<string, unknown>;
      if (typeof errObj.message === "string") errorMessage = errObj.message;
      else if (typeof errObj.error === "string") errorMessage = errObj.error;
      else if (typeof errObj.description === "string")
        errorMessage = errObj.description;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
