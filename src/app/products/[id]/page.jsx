import { getProductById } from "@/lib/api/product";
import { getWishlist } from "@/lib/api/wishlist";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
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

  const session = await auth.api.getSession({ headers: await headers() });
  const buyerId = session?.user?.id;

  let isWishlisted = false;
  if (buyerId) {
    const wishlist = await getWishlist(buyerId);
    isWishlisted = wishlist.some((item) => item.productId === id);
  }

  return (
    <ProductDetails product={product} buyerId={buyerId} initialWishlisted={isWishlisted} />
  );
};

export default ProductDetailsPage;