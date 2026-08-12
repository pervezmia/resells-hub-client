import ManageUsersClient from "@/components/dashboard/admin/ManageUsersClient";

// SEO Metadata
export const metadata = {
  title: 'Manage Users | Admin Dashboard',
  description: 'Admin user management portal to view, edit, and control user accounts.',
  robots: {
    index: false, // Admin pages should not be indexed by search engines
    follow: false,
  },
};

export default function ManageUsersPage() {
  return <ManageUsersClient />;
}