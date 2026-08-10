import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user?.role;

  if (role === "seller") redirect("/dashboard/seller");
  if (role === "admin") redirect("/dashboard/admin");

  redirect("/dashboard/buyer"); // default fallback (buyer বা role না থাকলে)
};

export default DashboardPage;