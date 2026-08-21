const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getRecentlyViewed(buyerId, excludeProductId) {
  if (!buyerId) return [];

  const params = new URLSearchParams({ buyerId, limit: "8" });
  if (excludeProductId) params.set("exclude", excludeProductId);

  const res = await fetch(
    `${baseUrl}/api/recently-viewed?${params.toString()}`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}