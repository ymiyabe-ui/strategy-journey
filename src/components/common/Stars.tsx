"use client";

import { motion } from "framer-motion";

interface Props {
  value: number;
  max?: number;
  size?: number;
  animate?: boolean;
}

/** 星の評価。animate のときは順番にぽんと点灯する */
export function Stars({ value, max = 3, size = 28, animate = false }: Props) {
  return (
    <div className="flex items-center gap-1" aria-label={`星 ${value} / ${max}`} role="img">
      {Array.from({ length: max }, (_, i) => {
        const on = i < value;
        return (
          <motion.svg
            key={i}
            viewBox="0 0 24 24"
            width={size}
            height={size}
            initial={animate ? { scale: 0, rotate: -40, opacity: 0 } : false}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={animate ? { delay: 0.5 + i * 0.35, type: "spring", stiffness: 300, damping: 14 } : undefined}
          >
            <path
              d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"
              fill={on ? "#ffc247" : "rgba(255,255,255,0.08)"}
              stroke={on ? "#ffe8b0" : "rgba(255,255,255,0.25)"}
              strokeWidth={1.2}
              strokeLinejoin="round"
              style={on ? { filter: "drop-shadow(0 0 6px rgba(255,194,71,0.7))" } : undefined}
            />
          </motion.svg>
        );
      })}
    </div>
  );
}
