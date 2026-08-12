import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { convertToUSD } from "@/lib/constants";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const { items, delivery, buyerId, buyerName, buyerEmail } = await request.json();

    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // ধাপ ১ — cart + delivery info MongoDB-তে অস্থায়ীভাবে সেভ করা
    const prepareRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/checkout/prepare`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerId,
          buyerName: delivery.name,
          buyerEmail,
          delivery,
          cartItems: items.map((i) => ({
            productId: i.productId,
            title: i.title,
            price: i.price,
            quantity: i.quantity,
            sellerId: i.sellerInfo?.userId,
            sellerName: i.sellerInfo?.name,
            sellerEmail: i.sellerInfo?.email,
          })),
          amount: totalAmount,
        }),
      }
    );
    const { checkoutId } = await prepareRes.json();

    // ধাপ ২ — Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(convertToUSD(item.price) * 100),
      },
      quantity: item.quantity,
    }));

    // ধাপ ৩ — Stripe session, metadata-তে শুধু ছোট্ট checkoutId
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&checkout_id=${checkoutId}`,
      cancel_url: `${origin}/dashboard/buyer/cart`,
      metadata: {
        checkoutId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}