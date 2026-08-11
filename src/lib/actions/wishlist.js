"use server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function addToWishlist(payload) {
  try {
    const res = await fetch(`${baseUrl}/api/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { error: "Failed to add to wishlist." };
    return res.json();
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong." };
  }
}

export async function removeFromWishlist(buyerId, productId) {
  try {
    const res = await fetch(
      `${baseUrl}/api/wishlist?buyerId=${buyerId}&productId=${productId}`,
      { method: "DELETE" }
    );
    if (!res.ok) return { error: "Failed to remove from wishlist." };
    return res.json();
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong." };
  }
}