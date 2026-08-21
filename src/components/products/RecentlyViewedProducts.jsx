import { Surface } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { getSafeImage } from "@/lib/utils";

export default function RecentlyViewedProducts({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="mx-auto mt-12 max-w-6xl px-4">
      <h2 className="text-lg font-semibold text-foreground">Recently Viewed</h2>

      <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <Link
            key={item.productId}
            href={`/products/${item.productId}`}
            className="w-40 shrink-0"
          >
            <Surface className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="relative aspect-square w-full bg-background">
                <Image
                  src={getSafeImage(item.image)}
                  alt={item.title}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="line-clamp-1 text-sm font-medium text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-sm font-bold text-foreground">
                  ৳{item.price?.toLocaleString()}
                </p>
              </div>
            </Surface>
          </Link>
        ))}
      </div>
    </section>
  );
}