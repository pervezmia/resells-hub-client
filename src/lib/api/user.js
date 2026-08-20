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

// export async function getAllUsers(search = "") {
//   const params = new URLSearchParams();
//   if (search) params.set("search", search);

//   const res = await fetch(`${baseUrl}/api/users?${params.toString()}`, {
//     cache: "no-store",
//   });
//   if (!res.ok) return [];
//   return res.json();
// }


// // // Get all users
// // export async function getAllUsers(searchParams = {}) {
// //   const query = new URLSearchParams(searchParams).toString();
// //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?${query}`, {
// //     cache: "no-store",
// //   });
// //   if (!res.ok) return [];
// //   return res.json();
// // }

// // // Delete user
// // export async function deleteUserApi(id) {
// //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
// //     method: "DELETE",
// //   });
// //   return res.json();
// // }

// // // Update Role or Status
// // export async function updateUserApi(id, updatedData) {
// //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
// //     method: "PATCH",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify(updatedData),
// //   });
// //   return res.json();
// // }


// // alada 

// const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// // Get all users (search/params সাপোর্ট সহ)
// export async function getAllUsers(searchParams = {}) {
//   // যদি শুধুমাত্র string সার্চ পাঠাও (যেমন: "rakib"), সেটাকে অবজেক্টে নিয়ে নেবে
//   const queryObj = typeof searchParams === "string" ? { search: searchParams } : searchParams;
//   const query = new URLSearchParams(queryObj).toString();

//   const res = await fetch(`${baseUrl}/api/users?${query}`, {
//     cache: "no-store",
//   });
//   if (!res.ok) return [];
//   return res.json();
// }

// // Delete user
// export async function deleteUserApi(id) {
//   const res = await fetch(`${baseUrl}/api/users/${id}`, {
//     method: "DELETE",
//   });
//   return res.json();
// }

// // Update Role or Status
// // export async function updateUserApi(id, updatedData) {
// //   const res = await fetch(`${baseUrl}/api/users/${id}`, {
// //     method: "PATCH",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify(updatedData),
// //   });
// //   return res.json();
// // }

// // Get single user by ID
// // export async function getUserById(id) {
// //   try {
// //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
// //       cache: "no-store",
// //     });
// //     if (!res.ok) return null;
// //     return res.json();
// //   } catch (error) {
// //     console.error("Failed to fetch user by ID:", error);
// //     return null;
// //   }
// // }