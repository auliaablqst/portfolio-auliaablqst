"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
  glass = true,
}: CardProps) {
  const baseClasses = "rounded-3xl p-6 shadow-2xl transition-all duration-300";

  const glassClasses = glass
    ? "backdrop-blur-xl bg-white/10 border border-white/20"
    : "bg-white border border-gray-200";

  const hoverClasses = hover ? "hover:shadow-3xl hover:scale-105" : "";

  const classes = `${baseClasses} ${glassClasses} ${hoverClasses} ${className}`;

  return (
    <motion.div
      className={classes}
      whileHover={hover ? { y: -10 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}