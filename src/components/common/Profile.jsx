"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label, Skeleton } from "@heroui/react";

export function Profile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/auth/login");
  };

  const handleAction = (key) => {
    if (key === "dashboard") router.push("/dashboard");
    else if (key === "profile") router.push("/dashboard/profile");
    else if (key === "logout") handleLogout();
  };

  // While session is loading
  if (isPending) {
    return <Skeleton className="size-10 rounded-full" />;
  }

  // Not logged in - Profile menu shouldn't render, but guard just in case
  if (!user) {
    return null;
  }

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <Avatar>
          <Avatar.Image alt={user.name} src={user.image} />
          <Avatar.Fallback delayMs={600}>{initials}</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image alt={user.name} src={user.image} />
              <Avatar.Fallback delayMs={600}>{initials}</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">{user.name}</p>
              <p className="text-xs leading-none text-muted">{user.email}</p>
            </div>
          </div>
          {user.role && (
            <p className="mt-2 flex items-center gap-1 text-xs capitalize text-muted">
              <Persons className="size-3.5" />
              {user.role}
            </p>
          )}
        </div>
        <Dropdown.Menu onAction={handleAction}>
          <Dropdown.Item id="dashboard" textValue="Dashboard">
            <Label>Dashboard</Label>
          </Dropdown.Item>
          <Dropdown.Item id="profile" textValue="Profile">
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Profile</Label>
              <Gear className="size-3.5 text-muted" />
            </div>
          </Dropdown.Item>
          <Dropdown.Item id="logout" textValue="Logout" variant="danger">
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Log Out</Label>
              <ArrowRightFromSquare className="size-3.5 text-danger" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}