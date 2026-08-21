"use server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function sendContactMessage(payload) {
  try {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { error: "Failed to send message." };
    return res.json();
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong." };
  }
}

import { getTokenServer } from "@/lib/getTokenServer";

export async function markMessageRead(id) {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseUrl}/api/contact/${id}/read`, {
      method: "PATCH",
      headers: { authorization: `Bearer ${token}` },
    });
    if (!res.ok) return { error: "Failed to update message." };
    return res.json();
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong." };
  }
}

export async function deleteMessage(id) {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseUrl}/api/contact/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    if (!res.ok) return { error: "Failed to delete message." };
    return res.json();
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong." };
  }
}