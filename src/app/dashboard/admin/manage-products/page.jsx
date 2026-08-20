import { getAdminProducts } from "@/lib/api/product";
import AdminProductsTable from "@/components/dashboard/admin/ProductsTable";

export const metadata = {
  title: "Manage Products | ReSell Hub Admin Dashboard",
  description: "Review, approve, and moderate all product listings on ReSell Hub.",
};

const ManageProducts = async ({ searchParams }) => {
  const params = await searchParams;
  const products = await getAdminProducts(params?.approvalStatus, params?.search);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Manage Products</h1>
      <p className="mt-1 text-sm text-muted">
        {products?.length || 0} product{products?.length === 1 ? "" : "s"} total.
      </p>

      <div className="mt-6">
        <AdminProductsTable products={products} />
      </div>
    </div>
  );
};

export default ManageProducts;