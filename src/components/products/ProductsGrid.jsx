import ProductCard from "./ProductCard";

export default function ProductsGrid({ products = [] }) {
  if (!products.length) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-10 text-center">
        <p className="text-sm text-muted">
          No products found. Try a different search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}