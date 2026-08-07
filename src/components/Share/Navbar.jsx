"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { Profile } from "../common/Profile";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "Dashboard", href: "/dashboard", isAccent: true },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const pathName = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  if(pathName.includes("dashboard")){
    return null;
  }

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  if (isPending) {
    return null;
  }

 

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Mobile menu */}
          <button
            className="p-1 text-foreground transition-colors hover:text-accent md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3"
            onClick={closeMenu}
          >
            <Logo />
            <p className="text-lg font-bold tracking-tight">ReSell Hub</p>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  link.isAccent
                    ? "text-accent font-semibold"
                    : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeSwitcher />

          {user ? (
            <>
            <Profile></Profile>
              {/* <Link
                href="/profile"
                className="text-sm font-medium hover:text-accent"
              >
                Profile
              </Link>

              <Button color="danger" size="sm" onPress={handleSignOut}>
                Sign Out
              </Button> */}
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium hover:text-accent"
              >
                Login
              </Link>

              <Link href="/auth/register">
                <Button color="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Theme */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-separator bg-background px-4 py-6 md:hidden">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={`block py-2 text-base font-medium ${
                    link.isAccent ? "text-accent" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <li className="mt-2 flex flex-col gap-3 border-t border-separator pt-4">
              {user ? (
                <>
                  <Dropdown>
                    <Dropdown.Trigger className="rounded-full">
                      <Avatar>
                        <Avatar.Image
                          alt="Junior Garcia"
                          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                        />
                        <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                      </Avatar>
                    </Dropdown.Trigger>
                    <Dropdown.Popover>
                      <div className="px-3 pt-3 pb-1">
                        <div className="flex items-center gap-2">
                          <Avatar size="sm">
                            <Avatar.Image
                              alt="Jane"
                              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                            />
                            <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                          </Avatar>
                          <div className="flex flex-col gap-0">
                            <p className="text-sm leading-5 font-medium">
                              Jane Doe
                            </p>
                            <p className="text-xs leading-none text-muted">
                              jane@example.com
                            </p>
                          </div>
                        </div>
                      </div>
                      <Dropdown.Menu>
                        <Dropdown.Item id="dashboard" textValue="Dashboard">
                          <Label>Dashboard</Label>
                        </Dropdown.Item>
                        <Dropdown.Item id="profile" textValue="Profile">
                          <Label>Profile</Label>
                        </Dropdown.Item>
                        <Dropdown.Item id="settings" textValue="Settings">
                          <div className="flex w-full items-center justify-between gap-2">
                            <Label>Settings</Label>
                            <Gear className="size-3.5 text-muted" />
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item id="new-project" textValue="New project">
                          <div className="flex w-full items-center justify-between gap-2">
                            <Label>Create Team</Label>
                            <Persons className="size-3.5 text-muted" />
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          id="logout"
                          textValue="Logout"
                          variant="danger"
                        >
                          <div className="flex w-full items-center justify-between gap-2">
                            <Label>Log Out</Label>
                            <ArrowRightFromSquare className="size-3.5 text-danger" />
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Popover>
                  </Dropdown>

                  {/* <Link
                    href="/profile"
                    onClick={closeMenu}
                    className="text-center py-2 font-medium"
                  >
                    Profile
                  </Link>


                  <Button
                    color="danger"
                    className="w-full"
                    onPress={handleSignOut}
                  >
                    Sign Out
                  </Button> */}
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={closeMenu}
                    className="text-center py-2 font-medium"
                  >
                    Login
                  </Link>

                  <Link href="/auth/register">
                    <Button color="primary" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

function Logo() {
  return (
    <svg
      className="h-7 w-7 text-accent shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
