import { getTokenServer } from "../getTokenServer";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getAllUsers(search = "", role = "") {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (role) params.set("role", role);

  const token = await getTokenServer();

  const res = await fetch(`${baseUrl}/api/users?${params.toString()}`, {
    cache: "no-store",
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) return [];
  return res.json();
}

// ✅ Public Stats-এর জন্য (Logout থাকলেও কাজ করবে)
export async function getUserCountByRole(role = "") {
  try {
    const url = role 
      ? `${baseUrl}/api/users/count?role=${role}` 
      : `${baseUrl}/api/users/count`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return 0;
    
    const data = await res.json();
    return data.count || 0;
  } catch (error) {
    return 0;
  }
}

export async function getPublicUsers(role = "") {
  const params = new URLSearchParams();
  if (role) params.set("role", role);

  const res = await fetch(`${baseUrl}/api/users/public?${params.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}
