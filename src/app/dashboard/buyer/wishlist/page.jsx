import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getWishlist } from "@/lib/api/wishlist";
import WishlistGrid from "@/components/dashboard/buyer/WishlistGrid";

export const metadata = {
  title: "Wishlist | ReSell Hub",
  description: "Products you've saved for later on ReSell Hub.",
};

const WishlistPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const wishlist = await getWishlist(session?.user?.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Wishlist</h1>
      <p className="mt-1 text-sm text-muted">
        {wishlist?.length || 0} product{wishlist?.length === 1 ? "" : "s"} saved.
      </p>

      <div className="mt-6">
        <WishlistGrid items={wishlist} buyerId={session?.user?.id} />
      </div>
    </div>
  );
};

export default WishlistPage;