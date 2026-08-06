import Link from "next/link";
import { Button } from "@heroui/react";
import { Box, Persons, CircleCheck, ArrowRight } from "@gravity-ui/icons";

const stats = [
  { label: "Total Products", value: "12,400+", icon: Box },
  { label: "Total Sellers", value: "3,200+", icon: Persons },
  { label: "Total Buyers", value: "18,900+", icon: Persons },
  { label: "Completed Orders", value: "9,600+", icon: CircleCheck },
];

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <h1
          data-aos="fade-up"
          className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
        >
          Buy and Sell Pre-Owned Products,
          <span className="text-accent"> Safely and Easily</span>
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="mx-auto mt-4 max-w-2xl text-sm text-foreground/60 sm:text-base lg:text-lg"
        >
          ReSell Hub connects buyers and sellers of second-hand goods,
          reducing waste and helping you find great deals or earn from items
          you no longer need.
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href="/products" className="w-full sm:w-auto">
            <Button className="w-full gap-2 sm:w-auto">
              Start Shopping
              <ArrowRight />
            </Button>
          </Link>
          <Link href="/dashboard/add-product" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-auto">
              Sell Your Item
            </Button>
          </Link>
        </div>

        {/* Statistics */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:mt-16 lg:grid-cols-4 lg:gap-6"
        >
          {stats.map(({ label, value, icon: Icon }, i) => (
            <div
              key={label}
              data-aos="fade-up"
              data-aos-delay={350 + i * 100}
              className="flex flex-col items-center gap-2 rounded-lg border border-separator bg-surface p-4 sm:p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xl font-bold sm:text-2xl">{value}</p>
              <p className="text-xs text-foreground/60 sm:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}