"use client"
import { Link } from "@heroui/react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();
  if (pathName.includes("dashboard")) {
    return null;
  }
  return (
    <footer className="w-full border-t border-separator bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Logo />
              <p className="font-bold">ReSell Hub</p>
            </div>
            <p className="mt-3 text-sm text-foreground/60">
              A trusted marketplace to buy and sell pre-owned products
              safely, reduce waste, and give unused items a second life.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-sm font-semibold">Quick Links</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-foreground/60">
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
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <p className="text-sm font-semibold">Contact</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-foreground/60">
              <li>Dhaka, Bangladesh</li>
              <li>
                <Link href="mailto:support@resellhub.com">
                  support@resellhub.com
                </Link>
              </li>
              <li>
                <Link href="tel:+8801700000000">+880 1700-000000</Link>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div>
            <p className="text-sm font-semibold">Follow Us</p>
            <div className="mt-3 flex items-center gap-3">
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-foreground/60 hover:text-accent"
              >
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-foreground/60 hover:text-accent"
              >
                <InstagramIcon className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-foreground/60 hover:text-accent"
              >
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="text-foreground/60 hover:text-accent"
              >
                <LinkedinIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-separator pt-6 text-center text-xs text-foreground/50 sm:flex-row sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} ReSell Hub. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
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

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3H22l-7.6 8.7L23 21h-6.9l-5.4-6.6L4.4 21H1.3l8.1-9.3L1 3h7l4.9 6.1L18.9 3Zm-1.2 16h1.7L7.5 5H5.7l12 14Z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.1 1.4-2.1 2.9V21h-4V9Z" />
    </svg>
  );
}