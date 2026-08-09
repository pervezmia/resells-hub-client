"use client";

import { motion } from "motion/react";

export default function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 bg-white rounded-xl shadow"
    >
      <h2 className="text-2xl font-bold">
        Hello Motion 🚀
      </h2>

      <p>
        This card is animated with Motion
      </p>
    </motion.div>
  );
}