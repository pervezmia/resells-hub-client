const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getAllUsers(search = "") {
  const params = new URLSearchParams();
  if (search) params.set("search", search);

  const res = await fetch(`${baseUrl}/api/users?${params.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}