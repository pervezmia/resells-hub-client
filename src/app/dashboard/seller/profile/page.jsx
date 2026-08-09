import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfileForm from "@/components/dashboard/seller/ProfileForm";

export const metadata = {
  title: "Profile Settings | ReSell Hub Seller Dashboard",
  description: "Update your name and profile picture on ReSell Hub.",
};

const SellerProfile = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
      <p className="mt-1 text-sm text-muted">
        Update your personal information.
      </p>

      <div className="mt-6">
        <ProfileForm user={session?.user} />
      </div>
    </div>
  );
};

export default SellerProfile;