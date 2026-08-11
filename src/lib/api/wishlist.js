const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getWishlist(buyerId) {
  if (!buyerId) return [];

  const res = await fetch(`${baseUrl}/api/wishlist?buyerId=${buyerId}`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}