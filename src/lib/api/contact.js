import { getTokenServer } from "@/lib/getTokenServer";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getAllMessages() {
  const token = await getTokenServer();

  const res = await fetch(`${baseUrl}/api/contact`, {
    cache: "no-store",
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) return [];
  return res.json();
}