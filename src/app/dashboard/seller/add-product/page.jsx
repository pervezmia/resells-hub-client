import AddProductForm from "@/components/dashboard/seller/AddProductForm";

export const metadata = {
  title: "Add Product | ReSell Hub Seller Dashboard",
  description: "List a new pre-owned product for sale on ReSell Hub.",
  robots: { index: false, follow: false },
};

export default function AddProductPage() {
  return <AddProductForm />;
}