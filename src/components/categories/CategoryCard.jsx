import { Surface } from "@heroui/react";
import Link from "next/link";

export default function CategoryCard({ category }) {
  const { name, count, icon: Icon } = category;

  return (
    <Link href={`/products?category=${encodeURIComponent(name)}`}>
      <Surface className="group flex flex-col items-center gap-3 rounded-3xl border border-border bg-surface p-6 text-center transition-shadow hover:shadow-lg">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-transform group-hover:scale-110">
          <Icon width={28} height={28} />
        </div>
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted">
            {count} product{count === 1 ? "" : "s"}
          </p>
        </div>
      </Surface>
    </Link>
  );
}