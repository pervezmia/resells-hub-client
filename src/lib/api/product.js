import { getTokenServer } from "../getTokenServer";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;



//  export const getProducts = async (productId, status="available") => {
//     const res = await fetch(`${baseUrl}/api/product?productId=${productId}&status=${status}`)
//     return res.json();
//  }

//correction wiht getProduct 
export const getProducts = async (sellerId) => {
  const params = new URLSearchParams();
  if (sellerId) params.set("sellerId", sellerId);
  

  const res = await fetch(`${baseUrl}/api/product?${params.toString()}`);
  const data = await res.json();
  
  return Array.isArray(data) ? data : data?.products || [];
};
 

 // নতুন — public browsing, search, sort, pagination-এর জন্য
export async function getAllProducts(searchParams = {}) {
  const params = new URLSearchParams();

  params.set("status", "available"); // public listing-এ শুধু available product
  if (searchParams.search) params.set("search", searchParams.search);
  if (searchParams.category) params.set("category", searchParams.category);
  if (searchParams.condition) params.set("condition", searchParams.condition);
  if (searchParams.sort) params.set("sort", searchParams.sort);
  params.set("page", searchParams.page || 1);
  params.set("limit", searchParams.limit ?? 8);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return { products: [], totalCount: 0, totalPages: 1, currentPage: 1 };
  }
  return res.json();
}

// single product 
export async function getProductById(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function getCategoryCounts(categories) {
  const counts = await Promise.all(
    categories.map(async (category) => {
      const params = new URLSearchParams({
        category,
        status: "available",
        limit: "0",
      });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product?${params.toString()}`,
        { cache: "no-store" }
      );
      if (!res.ok) return { category, count: 0 };
      const data = await res.json();
      return { category, count: data.totalCount || 0 };
    })
  );
  return counts;
}

export async function getAdminProducts(approvalStatus = "",  search = "") {
  const params = new URLSearchParams();
  if (approvalStatus) params.set("approvalStatus", approvalStatus);
   if (search) params.set("search", search);

  const token = await getTokenServer();

  const res = await fetch(
    `${baseUrl}/api/admin/products?${params.toString()}`,
    { cache: "no-store",
      headers: {authorization: `Bearer ${token}`}
     },
    
  );
  if (!res.ok) return [];
  return res.json();
}