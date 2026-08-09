import { Surface } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const conditionStyles = {
  New: "bg-success-soft text-success",
  "Like New": "bg-primary-soft text-primary",
  "Very Good": "bg-primary-soft text-primary",
  Good: "bg-accent-soft text-accent",
  Refurbished: "bg-warning-soft text-warning",
};

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product._id}`}>
      <Surface className="group overflow-hidden rounded-3xl border border-border bg-surface transition-shadow hover:shadow-lg">
        <div className="relative aspect-square w-full overflow-hidden bg-background">
         <Image
            src={product.images?.[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
              conditionStyles[product.condition] || "bg-surface text-muted"
            }`}
          >
            {product.condition}
          </span>

          <h3 className="mt-2 line-clamp-1 font-semibold text-foreground">
            {product.title}
          </h3>
          <p className="text-xs text-muted">{product.category}</p>

          <p className="mt-2 text-lg font-bold text-foreground">
            ৳{product.price?.toLocaleString()}
          </p>
        </div>
      </Surface>
    </Link>
  );
}