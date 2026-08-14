import { Display, House, Car, TShirt, Smartphone } from "@gravity-ui/icons";
import CategoryCard from "@/components/categories/CategoryCard";

const categoryIcons = {
  Electronics: Display,
  Furniture: House,
  Vehicles: Car,
  Fashion: TShirt,
  "Mobile Phones": Smartphone,
};

export default function PopularCategories({ categories = [] }) {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground">Popular Categories</h2>
        <p className="mt-1 text-sm text-muted">Browse products by what you need</p>

        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((name) => (
            <CategoryCard
              key={name}
              category={{ name, icon: categoryIcons[name] }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}