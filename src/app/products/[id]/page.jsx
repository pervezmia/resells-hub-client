import { getProductById } from "@/lib/api/product";
import { getWishlist } from "@/lib/api/wishlist";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProductDetails from "@/components/products/ProductDetails";
import { notFound } from "next/navigation";
import { getRecentlyViewed } from "@/lib/api/recentlyViewed";
import { recordView } from "@/lib/actions/recentlyViewed";

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
  let recentlyViewed = [];

  if (buyerId) {
    const wishlist = await getWishlist(buyerId);
    isWishlisted = wishlist.some((item) => item.productId === id);
  }

  if(buyerId) {
    const [recent] = await Promise.all([
      getRecentlyViewed(buyerId, id),
    ]);
    recentlyViewed = recent;
    // এই ভিজিট রেকর্ড করা (fire-and-forget, render ব্লক করবে না দরকার হলে await বাদ দেওয়া যায়, কিন্তু নিশ্চিত হতে await রাখছি)
    await recordView(buyerId, product);
  }

  return (
    <ProductDetails product={product} buyerId={buyerId} initialWishlisted={isWishlisted} recentlyViewed={recentlyViewed}/>
  );
};

export default ProductDetailsPage;