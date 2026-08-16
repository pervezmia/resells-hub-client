"use server";


const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function completeCheckout(payload) {

  try {
    const res = await fetch(`${baseUrl}/api/checkout/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { error: "Failed to complete checkout." };
    return res.json();
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong." };
  }
}