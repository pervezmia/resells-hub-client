"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@heroui/react";
import ProductCard from "@/components/products/ProductCard";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function FeaturedProducts({ products = [] }) {
  if (!products.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
          <p className="mt-1 text-sm text-muted">Freshly listed items you might like</p>
        </div>
        <Link href="/products">
          <Button variant="ghost">View All</Button>
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product) => (
          <motion.div key={product._id} variants={item}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}