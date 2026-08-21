"use client";

import { Surface, Button } from "@heroui/react";
import {
  Heart,
  HeartFill,
  ShoppingBasket,
  ShoppingCart,
  ArrowLeft,
} from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addToWishlist, removeFromWishlist } from "@/lib/actions/wishlist";
import { useCart } from "@/context/CartContext";
import { getSafeImage } from "@/lib/utils";
import RecentlyViewedProducts from "./RecentlyViewedProducts";

export default function ProductDetails({
  product,
  buyerId,
  initialWishlisted = false,
   recentlyViewed = [] 
}) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const { addToCart } = useCart();

  const inStock = (product.stock ?? 1) > 0;

  const handleWishlist = async () => {
    if (!buyerId) {
      toast.error("Please log in to save products to your wishlist.");
      router.push("/auth/login");
      return;
    }

    setWishlistLoading(true);
    try {
      if (wishlisted) {
        const result = await removeFromWishlist(buyerId, product._id);
        if (result?.error) {
          toast.error(result.error);
        } else {
          setWishlisted(false);
          toast.success("Removed from wishlist.");
        }
      } else {
        const result = await addToWishlist({
          buyerId,
          productId: product._id,
          title: product.title,
          image: getSafeImage(product.images?.[0]),
          price: product.price,
          category: product.category,
        });
        if (result?.error) {
          toast.error(result.error);
        } else {
          setWishlisted(true);
          toast.success("Added to wishlist!");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    router.push("/dashboard/buyer/cart");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft width={16} height={16} />
        Back
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-background">
            <Image
              src={getSafeImage(product.images?.[activeImage])}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {product.images?.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 ${
                    i === activeImage ? "border-accent" : "border-border"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
              {product.condition}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                inStock
                  ? "bg-success-soft text-success"
                  : "bg-danger-soft text-danger"
              }`}
            >
              {inStock ? `${product.stock ?? 1} in stock` : "Out of stock"}
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-bold text-foreground">
            {product.title}
          </h1>
          <p className="text-sm text-muted">{product.category}</p>

          <p className="mt-4 text-3xl font-bold text-foreground">
            ৳{product.price?.toLocaleString()}
          </p>

          <Surface className="mt-6 rounded-2xl border border-border bg-surface p-4">
            <h2 className="text-sm font-semibold text-foreground">
              Description
            </h2>
            <p className="mt-1 text-sm text-muted">{product.description}</p>
          </Surface>

          {product.sellerInfo && (
            <Surface className="mt-4 rounded-2xl border border-border bg-surface p-4">
              <h2 className="text-sm font-semibold text-foreground">
                Seller Information
              </h2>
              <p className="mt-1 text-sm text-foreground">
                {product.sellerInfo.name}
              </p>
              <p className="text-xs text-muted">{product.sellerInfo.email}</p>
              {product.sellerInfo.phone && (
                <p className="text-xs text-muted">{product.sellerInfo.phone}</p>
              )}
            </Surface>
          )}

          <div className="mt-6 flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onPress={handleAddToCart}
              isDisabled={!inStock}
            >
              <span className="flex items-center gap-1.5">
                <ShoppingBasket width={16} height={16} />
                Add to Cart
              </span>
            </Button>
            <Button
              className="flex-1 bg-accent text-accent-foreground"
              onPress={handleBuyNow}
              isDisabled={!inStock}
            >
              <span className="flex items-center gap-1.5">
                <ShoppingCart width={16} height={16} />
                Buy Now
              </span>
            </Button>
            <Button
              variant="ghost"
              isIconOnly
              aria-label={
                wishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              isDisabled={wishlistLoading}
              onPress={handleWishlist}
            >
              {wishlisted ? (
                <HeartFill width={18} height={18} className="text-danger" />
              ) : (
                <Heart width={18} height={18} />
              )}
            </Button>
          </div>
        </div>
      </div>
       <RecentlyViewedProducts items={recentlyViewed} />
    </div>
  );
}