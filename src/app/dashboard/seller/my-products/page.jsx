import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getProducts } from "@/lib/api/product";
import ProductsTable from "@/components/dashboard/seller/ProductsTable";

export const metadata = {
  title: "My Products | ReSell Hub",
  description:
    "Manage all the products you have listed for sale on ReSell Hub — edit, update stock, or remove listings.",
};

const SellerProducts = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const products = await getProducts(session?.user?.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">My Products</h1>
      <p className="mt-1 text-sm text-muted">
        You have {products?.length || 0} product{products?.length === 1 ? "" : "s"} listed.
      </p>

      <div className="mt-6">
        <ProductsTable products={products} />
      </div>
    </div>
  );
};

export default SellerProducts;