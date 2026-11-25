"use client";

import { motion } from "framer-motion";

interface Props {
  /** 0〜1 */
  value: number;
  accent?: string;
  height?: number;
  className?: string;
  label?: string;
}

export function ProgressBar({ value, accent = "#ffc247", height = 8, className = "", label }: Props) {
  const v = Math.max(0, Math.min(1, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v * 100)}
      className={`w-full overflow-hidden rounded-full bg-white/10 ${className}`}
      style={{ height }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${accent}, #ffe8b0)`, boxShadow: `0 0 12px ${accent}88` }}
        initial={false}
        animate={{ width: `${v * 100}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 22 }}
      />
    </div>
  );
}
