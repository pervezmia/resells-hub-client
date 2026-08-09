"use client";

import { Surface, Button } from "@heroui/react";
import { ArrowLeft, Heart, ShoppingCart } from "@gravity-ui/icons";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProductDetails({ product }) {
  const [activeImage, setActiveImage] = useState(0);

  const handleWishlist = () => {
    toast.success("Added to wishlist!");
    // TODO: wishlist action পরে যোগ হবে
  };

  const handleBuyNow = () => {
    toast.success("Redirecting to checkout...");
    // TODO: checkout flow পরে যোগ হবে
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link href={"/products"}  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:opacity-80 transition">
        <ArrowLeft width={18} height={18} />
        Products page
      </Link>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-background">
            <Image
              src={product.images?.[activeImage]}
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
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
            {product.condition}
          </span>

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
              className="flex-1 bg-accent text-accent-foreground"
              onPress={handleBuyNow}
            >
              <span className="flex items-center gap-1.5">
                <ShoppingCart width={16} height={16} />
                Buy Now
              </span>
            </Button>
            <Button
              variant="ghost"
              isIconOnly
              aria-label="Add to wishlist"
              onPress={handleWishlist}
            >
              <Heart width={18} height={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
