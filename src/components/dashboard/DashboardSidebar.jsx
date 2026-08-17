"use client";

import { authClient } from "@/lib/auth-client";
import { sidebarLinks, bottomLinks } from "./sidebarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const { data: session } = authClient.useSession();
  const role = session?.user?.role;
  const pathname = usePathname();

  console.log(role);
  
  if (!role) return null;

  const links = sidebarLinks[role] || [];
  const bottom = bottomLinks(role);

  return (
    <aside
      className="sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border bg-surface
                 md:flex md:w-[72px] lg:w-64"
    >
      <div className="flex h-16 items-center justify-center border-b border-border px-4 lg:justify-start">
        <span className="hidden text-lg font-bold text-foreground lg:block">
          ReSell Hub
        </span>
        <span className="text-lg font-bold text-accent lg:hidden">RH</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.name}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors
                lg:justify-start justify-center
                ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted hover:bg-accent-soft hover:text-foreground"
                }`}
            >
              <Icon className="size-5 shrink-0" />
              <span className="hidden lg:inline">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        {bottom.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.name}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors
                lg:justify-start justify-center
                ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted hover:bg-accent-soft hover:text-foreground"
                }`}
            >
              <Icon className="size-5 shrink-0" />
              <span className="hidden lg:inline">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}