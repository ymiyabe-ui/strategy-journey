"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = ""): string {
  const base =
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold tracking-wide transition-[filter,background,opacity] disabled:cursor-not-allowed disabled:opacity-45";
  const variants: Record<Variant, string> = {
    primary:
      "bg-gradient-to-b from-lantern-300 to-lantern-500 text-ink-900 shadow-glow-sm hover:brightness-105",
    secondary: "border border-white/20 bg-white/5 text-paper-100 hover:bg-white/10",
    ghost: "text-paper-200 hover:bg-white/5",
  };
  const sizes: Record<Size, string> = {
    sm: "h-9 px-4 text-[13px]",
    md: "h-12 px-6 text-[15px]",
    lg: "h-14 px-8 text-base",
  };
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({ variant = "primary", size = "md", className = "", children, ...rest }: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={buttonClasses(variant, size, className)}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ href, variant = "primary", size = "md", className = "", children }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)}>
      {children}
    </Link>
  );
}
