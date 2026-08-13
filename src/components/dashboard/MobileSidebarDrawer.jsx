"use client";

import { authClient } from "@/lib/auth-client";
import { sidebarLinks, bottomLinks } from "./sidebarLinks";
import { ArrowLeft, Bars } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileSidebarDrawer() {
  const { data: session } = authClient.useSession();
  const role = session?.user?.role;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
console.log(role);
  if (!role) return null;

  const links = sidebarLinks[role] || [];
  const bottom = bottomLinks(role);

  return (
    <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="secondary"
        onPress={() => setIsOpen(true)}
        className="md:hidden"
      >
        <Bars />
        Menu
      </Button>

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
  );
}
