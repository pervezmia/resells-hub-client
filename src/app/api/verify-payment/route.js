import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed." }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      amountTotal: session.amount_total, // সেন্টে
      currency: session.currency,
      paymentIntentId: session.payment_intent,
      metadata: session.metadata,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}