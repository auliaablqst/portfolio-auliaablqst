"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  href,
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2";

  const variants = {
    primary: "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary: "bg-white/20 backdrop-blur-xl border border-white/30 text-gray-700 hover:bg-white/30",
    outline: "border-2 border-purple-300 text-purple-600 hover:bg-purple-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}