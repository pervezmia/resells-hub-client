// 'use server'

// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import { getTokenServer } from "../getTokenServer";

// const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// export const createProduct = async (newProductData) => {
//   const token = await getTokenServer();
//   const session = await auth.api.getSession({ headers: await headers() });

//   if (!session?.user) {
//     return { error: "You must be logged in to add a product." };
//   }

//   const payload = {
//     ...newProductData,
//     sellerInfo: {
//       userId: session.user.id,
//       name: session.user.name,
//       email: session.user.email,
//     },
//   };


//   const res = await fetch(`${baseUrl}/api/product`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify(payload),
//   });

//   return res.json();
// };


// export const deleteProduct = async (id) => {

//   const res = await fetch(`${baseUrl}/api/product/${id}`, {
//     method: "DELETE",
    
//   });
//   return res.json();
// };


// export const updateProduct = async (id, updatedData) => {

//   const res = await fetch(`${baseUrl}/api/product/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedData),
//   });
//   return res.json();
// };

// export const updateProductApproval = async (id, approvalStatus) => {

//   const res = await fetch(`${baseUrl}/api/admin/products/${id}/approval`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json",
//      },
//     body: JSON.stringify({ approvalStatus }),
//   });
//   return res.json();
// };


//fixed code 

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
  const token = await getTokenServer();

  const res = await fetch(`${baseUrl}/api/product/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

export const updateProduct = async (id, updatedData) => {
  try {
    const token = await getTokenServer();

    const res = await fetch(`${baseUrl}/api/product/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}` // Token যুক্ত করা হয়েছে
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();

    // API response যদি HTTP status ok না দেয়
    if (!res.ok) {
      return { success: false, error: data.message || "Failed to update" };
    }

    // Response Normalized Form-এ ফেরত দেওয়া
    return {
      success: true,
      ...data
    };
  } catch (err) {
    console.error("Error in updateProduct action:", err);
    return { success: false, error: err.message };
  }
};

export const updateProductApproval = async (id, approvalStatus) => {
  const token = await getTokenServer();

  const res = await fetch(`${baseUrl}/api/admin/products/${id}/approval`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ approvalStatus }),
  });
  return res.json();
};