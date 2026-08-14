import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({ children }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardNavbar />
        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}