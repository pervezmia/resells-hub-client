
export async function getSellerOrders(sellerId) {
  if (!sellerId) return [];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders?sellerId=${sellerId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return res.json();
}


//order

export async function getBuyerOrders(buyerId) {
  if (!buyerId) return [];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders?buyerId=${buyerId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return res.json();
}

//get all orders
export async function getAllOrders() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}