import { getTokenServer } from "../getTokenServer";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getBuyerPayments(buyerId) {
  if (!buyerId) return [];

  const token = await getTokenServer();

  const res = await fetch(`${baseUrl}/api/payments?buyerId=${buyerId}`, {
    cache: "no-store",
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function getAllPayments(status = "", search = "") {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (search) params.set("search", search);

  const token = await getTokenServer();

  const res = await fetch(`${baseUrl}/api/payments?${params.toString()}`, {
    cache: "no-store",
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) return [];
  return res.json();
}