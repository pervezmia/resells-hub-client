 'use server'
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
 export const createProduct = async (newProductData) => {
    const res = await fetch(`${baseUrl}/api/product`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(newProductData)
    })
    return res.json();
 }