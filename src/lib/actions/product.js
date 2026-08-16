'use server'

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenServer } from "../getTokenServer";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const createProduct = async (newProductData) => {
  const token = await getTokenServer();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return { error: "You must be logged in to add a product." };
  }

  const payload = {
    ...newProductData,
    sellerInfo: {
      userId: session.user.id,
      name: session.user.name,
      email: session.user.email,
    },
  };


  const res = await fetch(`${baseUrl}/api/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};


export const deleteProduct = async (id) => {

  const res = await fetch(`${baseUrl}/api/product/${id}`, {
    method: "DELETE",
    
  });
  return res.json();
};


export const updateProduct = async (id, updatedData) => {

  const res = await fetch(`${baseUrl}/api/product/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

export const updateProductApproval = async (id, approvalStatus) => {

  const res = await fetch(`${baseUrl}/api/admin/products/${id}/approval`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json",
     },
    body: JSON.stringify({ approvalStatus }),
  });
  return res.json();
};