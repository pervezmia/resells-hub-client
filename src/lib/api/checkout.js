const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getPendingCheckout(checkoutId) {
  const res = await fetch(`${baseUrl}/api/checkout/prepare/${checkoutId}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}