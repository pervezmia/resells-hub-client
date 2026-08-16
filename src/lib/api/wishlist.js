import { authHeader } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getWishlist(buyerId) {
  if (!buyerId) return [];

  const res = await fetch(`${baseUrl}/api/wishlist?buyerId=${buyerId}`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}


// User Delete API Call
export async function deleteUserApi(userId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
    method: "DELETE",
  });
  return res.json();
}

// User Role/Status Update API Call
export async function updateUserRoleStatusApi(userId, data) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      headers: await authHeader()
    },
    body: JSON.stringify(data),
  });
  return res.json();
}