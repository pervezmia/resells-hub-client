import { getAllProducts } from "@/lib/api/product";
import ProductsGrid from "@/components/products/ProductsGrid";
import ProductFilters from "@/components/products/ProductFilters";
import Pagination from "@/components/products/Pagination";

export const metadata = {
  title: "All Products | ReSell Hub",
  description: "Browse pre-owned products available on ReSell Hub — search, filter, and sort to find what you need.",
};

const AllProductsPage = async ({ searchParams }) => {
  const params = await searchParams;

  const { products, totalCount, totalPages, currentPage } = await getAllProducts({
    search: params?.search,
    sort: params?.sort,
    page: params?.page,
    limit: 8,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">All Products</h1>
      <p className="mt-1 text-sm text-muted">
        {totalCount} product{totalCount === 1 ? "" : "s"} available.
      </p>

      <div className="mt-6">
        <ProductFilters />
      </div>

      <div className="mt-6">
        <ProductsGrid products={products} />
      </div>

      <div className="mt-8">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default AllProductsPage;