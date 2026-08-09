import { getProductById } from "@/lib/api/product";
import ProductDetails from "@/components/products/ProductDetails";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  return {
    title: product ? `${product.title} | ReSell Hub` : "Product Not Found",
    description: product?.description,
  };
}

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;