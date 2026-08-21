"use server";

import { getTokenServer } from "@/lib/getTokenServer";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function recordView(buyerId, product) {
  if (!buyerId) return;

  try {
    const token = await getTokenServer();
    await fetch(`${baseUrl}/api/recently-viewed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        buyerId,
        productId: product._id,
        title: product.title,
        image: product.images?.[0],
        price: product.price,
        category: product.category,
      }),
    });
  } catch (err) {
    console.error("Failed to record view:", err);
  }
}