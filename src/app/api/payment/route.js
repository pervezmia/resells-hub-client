import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { convertToUSD } from "@/lib/constants";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const { items, delivery, buyerId } = await request.json();

    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

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

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/buyer/cart`,
      metadata: {
        buyerId,
        deliveryName: delivery.name,
        deliveryPhone: delivery.phone,
        deliveryAddress: delivery.address,
        cartItems: JSON.stringify(
          items.map((i) => ({
            productId: i.productId,
            title: i.title,
            price: i.price,
            quantity: i.quantity,
            sellerId: i.sellerInfo?.userId,
            sellerName: i.sellerInfo?.name,
            sellerEmail: i.sellerInfo?.email,
          }))
        ),
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