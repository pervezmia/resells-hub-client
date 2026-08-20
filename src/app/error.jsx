'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // প্রয়োজন হলে এরর লগার (যেমন Sentry) এ সেন্ড করতে পারো
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center sm:max-w-lg lg:max-w-xl">
        <ErrorIllustration className="h-40 w-40 sm:h-52 sm:w-52 lg:h-64 lg:w-64" />

        <p className="mt-6 text-sm font-semibold tracking-wide text-danger sm:text-base">
          SOMETHING WENT WRONG
        </p>

        <h1 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
          An unexpected error occurred
        </h1>

        <p className="mt-3 text-sm text-foreground/60 sm:text-base">
          {error?.message || "We ran into an issue while loading this page. Don't worry, you can try again or head back to safety."}
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button 
            onClick={() => reset()} 
            color="primary" 
            className="w-full sm:w-auto"
          >
            Try Again
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button variant="flat" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorIllustration({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="120" cy="120" r="110" className="fill-danger/10" />

      {/* Main Card Element */}
      <rect
        x="55"
        y="80"
        width="130"
        height="95"
        rx="10"
        className="fill-surface stroke-separator"
        strokeWidth="2"
      />
      {/* Card Header Bar */}
      <rect
        x="55"
        y="80"
        width="130"
        height="26"
        rx="10"
        className="fill-danger/20"
      />
      {/* Window Controls */}
      <circle cx="68" cy="93" r="3" className="fill-danger" />
      <circle cx="80" cy="93" r="3" className="fill-warning/80" />
      <circle cx="92" cy="93" r="3" className="fill-success/80" />

      {/* Warning/Error Icon Symbol */}
      <path
        d="M120 115 V138 M120 148 V150"
        className="stroke-danger"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Bottom Wave / Shadow Line */}
      <path
        d="M60 190 Q120 175 180 190"
        className="stroke-separator"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Decorative Cross Elements */}
      <g className="stroke-danger" strokeWidth="3" strokeLinecap="round">
        <path d="M40 60 L48 68" />
        <path d="M48 60 L40 68" />
      </g>
      <g className="stroke-danger" strokeWidth="3" strokeLinecap="round">
        <path d="M196 55 L204 63" />
        <path d="M204 55 L196 63" />
      </g>

      <circle cx="205" cy="120" r="4" className="fill-danger/50" />
      <circle cx="30" cy="130" r="4" className="fill-danger/50" />
    </svg>
  );
}