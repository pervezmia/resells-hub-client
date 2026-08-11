"use client";

import { authClient } from "@/lib/auth-client";
import { Bars, Briefcase, Bell, Xmark, ArrowLeft } from "@gravity-ui/icons";
import { Avatar, Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { sidebarLinks, bottomLinks } from "./sidebarLinks";
import { Profile } from "../common/Profile";

export default function DashboardNavbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const role = user?.role;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = sidebarLinks[role] || [];
  const bottom = bottomLinks(role);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-4">
      {/* বাম পাশে — hamburger শুধু mobile-এ */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onPress={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Bars />
        </Button>

        <Link
          href="/"
          className="hidden items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground md:flex"
        >
          <ArrowLeft width={16} height={16} />
          Back to Site
        </Link>
      </div>

      {/* ডান পাশে — icon + avatar, সবসময় visible */}
      <div className="flex items-center gap-4">
        <Briefcase className="size-5 text-foreground" />
        <Bell className="size-5 text-foreground" />
        <Profile />
      </div>

      {/* Mobile Drawer — hamburger-এ ক্লিক করলে খুলবে */}
      <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger aria-label="Close menu">
                <Xmark width={18} height={18} />
              </Drawer.CloseTrigger>
              <Drawer.Header>
                <Drawer.Heading>ReSell Hub</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                <nav className="flex flex-col gap-1">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-accent-soft"
                  >
                    <ArrowLeft className="size-5" />
                    Back to Site
                  </Link>

                  <div className="my-1 border-t border-border" />
                  {links.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground hover:bg-accent-soft"
                        }`}
                      >
                        <Icon className="size-5" />
                        {item.name}
                      </Link>
                    );
                  })}

                  <div className="my-2 border-t border-border" />

                  {bottom.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent-soft"
                      >
                        <Icon className="size-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </header>
  );
}
