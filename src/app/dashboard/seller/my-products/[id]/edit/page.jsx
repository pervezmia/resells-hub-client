import { getProductById } from "@/lib/api/product";
import EditProductForm from "@/components/dashboard/seller/EditProductForm";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Product | ReSell Hub Seller Dashboard",
  description: "Update your product listing details.",
};

const EditProductPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return <EditProductForm product={product} />;
};

export default EditProductPage;