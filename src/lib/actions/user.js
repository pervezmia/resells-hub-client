"use server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function updateUserStatus(id, status) {
  try {
    const res = await fetch(`${baseUrl}/api/users/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) return { error: "Failed to update user status." };
    return res.json();
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong." };
  }
}

export async function deleteUser(id) {
  try {
    const res = await fetch(`${baseUrl}/api/users/${id}`, { method: "DELETE" });
    if (!res.ok) return { error: "Failed to delete user." };
    return res.json();
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong." };
  }
}