"use client";

import { authClient } from "@/lib/auth-client";
import { Bars, Briefcase, Bell } from "@gravity-ui/icons";
import { Avatar, Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { sidebarLinks, bottomLinks } from "./sidebarLinks";

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
      </div>

      {/* ডান পাশে — icon + avatar, সবসময় visible */}
      <div className="flex items-center gap-4">
        <Briefcase className="size-5 text-foreground" />
        <Bell className="size-5 text-foreground" />
        <Avatar size="sm">
          <Avatar.Image alt={user?.name} src={user?.image} />
          <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
        </Avatar>
      </div>

      {/* Mobile Drawer — hamburger-এ ক্লিক করলে খুলবে */}
      <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>ReSell Hub</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                <nav className="flex flex-col gap-1">
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