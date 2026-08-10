import { getCategoryCounts } from "@/lib/api/product";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import CategoryCard from "@/components/categories/CategoryCard";
import { Display, House, Car, TShirt, Smartphone } from "@gravity-ui/icons";

export const metadata = {
  title: "Categories | ReSell Hub",
  description: "Browse pre-owned products by category on ReSell Hub.",
};

const categoryIcons = {
  Electronics: Display,
  Furniture: House,
  Vehicles: Car,
  Fashion: TShirt,
  "Mobile Phones": Smartphone,
};

const CategoriesPage = async () => {
  const counts = await getCategoryCounts(PRODUCT_CATEGORIES);

  const categories = PRODUCT_CATEGORIES.map((name) => ({
    name,
    icon: categoryIcons[name],
    count: counts.find((c) => c.category === name)?.count || 0,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Categories</h1>
      <p className="mt-1 text-sm text-muted">
        Browse products by category to find exactly what you&apos;re looking for.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;