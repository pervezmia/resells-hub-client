
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
 export const getProducts = async (productId, status="available") => {
    const res = await fetch(`${baseUrl}/api/product?productId=${productId}&status=${status}`)
    return res.json();
 }
 