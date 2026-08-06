import { Link, Button } from "@heroui/react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center sm:max-w-lg lg:max-w-xl">
        <NotFoundIllustration className="h-40 w-40 sm:h-52 sm:w-52 lg:h-64 lg:w-64" />

        <p className="mt-6 text-sm font-semibold tracking-wide text-accent sm:text-base">
          404 ERROR
        </p>

        <h1 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
          Page not found
        </h1>

        <p className="mt-3 text-sm text-foreground/60 sm:text-base">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to browsing pre-owned products.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">Back to Home</Button>
          </Link>
          <Link href="/products" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-auto">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function NotFoundIllustration({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="120" cy="120" r="110" className="fill-accent/10" />

      <rect
        x="55"
        y="80"
        width="130"
        height="95"
        rx="10"
        className="fill-surface stroke-separator"
        strokeWidth="2"
      />
      <rect
        x="55"
        y="80"
        width="130"
        height="26"
        rx="10"
        className="fill-accent/20"
      />
      <circle cx="68" cy="93" r="3" className="fill-accent/60" />
      <circle cx="80" cy="93" r="3" className="fill-accent/60" />
      <circle cx="92" cy="93" r="3" className="fill-accent/60" />

      <text
        x="120"
        y="150"
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontSize: "34px", fontWeight: 700 }}
      >
        404
      </text>

      <path
        d="M60 190 Q120 175 180 190"
        className="stroke-separator"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      <g className="stroke-accent" strokeWidth="3" strokeLinecap="round">
        <path d="M40 60 L48 68" />
        <path d="M48 60 L40 68" />
      </g>
      <g className="stroke-accent" strokeWidth="3" strokeLinecap="round">
        <path d="M196 55 L204 63" />
        <path d="M204 55 L196 63" />
      </g>
      <circle cx="205" cy="120" r="4" className="fill-accent/50" />
      <circle cx="30" cy="130" r="4" className="fill-accent/50" />
    </svg>
  );
}