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
    const {
      amount,
      currency,
      // Optional customer+order data stored in Razorpay notes as webhook fallback
      customer_name,
      customer_email,
      customer_phone,
      address,
      products,
      subtotal,
      discount,
      shipping,
      total,
      // Meta CAPI fields — stored in notes for webhook fallback
      capi_event_id,
      fbp,
      fbc,
    } = await request.json();

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

    // Store customer+order data in Razorpay notes so the webhook can
    // auto-create the order if the browser fails to redirect after payment.
    const notes: Record<string, string> = {};
    if (customer_name) notes.customer_name = customer_name;
    if (customer_email) notes.customer_email = customer_email;
    if (customer_phone) notes.customer_phone = customer_phone;
    if (address) notes.address = JSON.stringify(address);
    if (products) notes.products = JSON.stringify(products);
    if (subtotal != null) notes.subtotal = String(subtotal);
    if (discount != null) notes.discount = String(discount);
    if (shipping != null) notes.shipping = String(shipping);
    if (total != null) notes.total = String(total);
    if (capi_event_id) notes.capi_event_id = capi_event_id;
    if (fbp) notes.fbp = fbp;
    if (fbc) notes.fbc = fbc;

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
      ...(Object.keys(notes).length > 0 && { notes }),
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: unknown) {
    // Log the full error details for server-side debugging (Vercel logs)
    console.error("=== Razorpay create-order error ===");
    console.error("Error type:", typeof error);
    console.error("Is Error instance:", error instanceof Error);

    // Capture every possible error representation
    const errorDetails: Record<string, unknown> = {
      type: typeof error,
      isError: error instanceof Error,
    };

    if (error instanceof Error) {
      errorDetails.message = error.message;
      errorDetails.name = error.name;
      errorDetails.stack = error.stack;
      // Capture any custom properties on the error
      try {
        const proto = Object.getOwnPropertyNames(error);
        errorDetails.ownProps = proto;
        for (const key of proto) {
          errorDetails[key] = (error as unknown as Record<string, unknown>)[
            key
          ];
        }
      } catch {
        // ignore serialization errors
      }
    } else if (typeof error === "object" && error !== null) {
      try {
        const flat = JSON.parse(JSON.stringify(error));
        errorDetails.raw = flat;
      } catch {
        errorDetails.raw = String(error);
      }
    } else {
      errorDetails.raw = String(error);
    }

    console.error("Captured details:", JSON.stringify(errorDetails, null, 2));

    // Return everything so the client-side can also see the real error
    return NextResponse.json(
      {
        error: "Failed to create order",
        details: errorDetails,
      },
      { status: 500 },
    );
  }
}
