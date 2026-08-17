import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AdminProfileForm from "@/components/dashboard/admin/ProfileForm";

export const metadata = {
  title: "Profile | ReSell Hub Admin Dashboard",
  description: "Manage your admin account details on ReSell Hub.",
};

const AdminProfile = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      <p className="mt-1 text-sm text-muted">
        Manage your account details as an administrator.
      </p>

      <div className="mt-6">
        <AdminProfileForm user={user} />
      </div>
    </div>
  );
};

export default AdminProfile;