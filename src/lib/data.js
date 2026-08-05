export const getProducts = async () => {
    const res = await fetch (`http://localhost:9000/products`);
    const data = res.json();
    return data;
}