import { auth } from "@/lib/auth";
import { getUserSession, getUserToken } from "@/lib/core/session";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  // const session = await auth.api.getSession({ headers: await headers() });
  // const role = session?.user?.role;
  // console.log(session?.user);
  const user = await getUserSession();
  console.log(user);
  const role = user.role;
  const token = await getUserToken();
  console.log(token);

  if (role === "seller") redirect("/dashboard/seller");
  if (role === "admin") redirect("/dashboard/admin");

  redirect("/dashboard/buyer"); // default fallback (buyer বা role না থাকলে)
};

export default DashboardPage;