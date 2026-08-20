import { getAllUsers } from "@/lib/api/user";
import UsersTable from "@/components/dashboard/admin/UsersTable";

export const metadata = {
  title: "Manage Users | ReSell Hub Admin Dashboard",
  description: "View, search, and manage all users on ReSell Hub.",
};

const ManageUsers = async ({ searchParams }) => {
  const params = await searchParams;
  const users = await getAllUsers(params?.search , params?.role);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground">Manage Users</h1>
      <p className="mt-1 text-sm text-muted">
        {users?.length || 0} user{users?.length === 1 ? "" : "s"} registered.
      </p>

      <div className="mt-6">
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default ManageUsers;