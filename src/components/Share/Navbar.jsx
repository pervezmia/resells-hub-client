"use client"
import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { ThemeSwitcher } from "../ThemeSwitcher";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
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
          <div className="flex items-center gap-3">
            <Logo />
            <p className="font-bold">ReSell Hub</p>
          </div>
        </div>

        <ul className="hidden items-center gap-4 md:flex">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/categories">Categories</Link>
          </li>
          <li>
            <Link href="/dashboard" className="font-medium text-accent" aria-current="page">
              Dashboard
            </Link>
          </li>
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <div className="hidden lg:block">
            <ThemeSwitcher />
          </div>
          <Link href="/login">Login</Link>
          <Link href="/register">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>

      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link href="/" className="block py-2">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="block py-2">
                Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="block py-2">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="block py-2 font-medium text-accent">
                Dashboard
              </Link>
            </li>
            <li className="mt-4 flex flex-col gap-3 border-t border-separator pt-4">
              <ThemeSwitcher />
              <Link href="/login" className="block py-2">
                Login
              </Link>
              <Link href="/register">
                <Button className="w-full">Sign Up</Button>
              </Link>
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
      className="h-7 w-7 text-accent"
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