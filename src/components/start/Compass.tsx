"use client";

import { motion } from "framer-motion";

/** タイトルの上に置く羅針盤。針が風に揺れるようにゆっくり動く */
export function Compass({ size = 132 }: { size?: number }) {
  const ticks = Array.from({ length: 36 }, (_, i) => i * 10);
  return (
    <div className="relative" style={{ width: size, height: size }} aria-hidden>
      <div className="absolute inset-[-18%] rounded-full bg-lantern-400/20 blur-2xl" />
      <svg viewBox="0 0 120 120" width={size} height={size} className="relative">
        <defs>
          <radialGradient id="cmp-face" cx="50%" cy="40%" r="65%">
            <stop offset="0" stopColor="#1f2f66" />
            <stop offset="1" stopColor="#0b1226" />
          </radialGradient>
          <linearGradient id="cmp-rim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffe8b0" />
            <stop offset="0.5" stopColor="#f5a524" />
            <stop offset="1" stopColor="#b8730a" />
          </linearGradient>
        </defs>
        <circle cx={60} cy={60} r={57} fill="url(#cmp-rim)" />
        <circle cx={60} cy={60} r={51} fill="url(#cmp-face)" />
        {ticks.map((deg) => (
          <line
            key={deg}
            x1={60}
            y1={11}
            x2={60}
            y2={deg % 90 === 0 ? 20 : deg % 30 === 0 ? 17 : 14.5}
            stroke={deg % 90 === 0 ? "#ffd67c" : "rgba(255,232,176,0.55)"}
            strokeWidth={deg % 90 === 0 ? 2 : 1}
            transform={`rotate(${deg} 60 60)`}
          />
        ))}
        {[
          ["N", 60, 31],
          ["E", 92, 64],
          ["S", 60, 97],
          ["W", 28, 64],
        ].map(([t, x, y]) => (
          <text
            key={t as string}
            x={x as number}
            y={y as number}
            textAnchor="middle"
            fontSize={11}
            fontWeight={800}
            fill={t === "N" ? "#ff8c7c" : "#ffe8b0"}
          >
            {t}
          </text>
        ))}
        <motion.g
          style={{ originX: 0.5, originY: 0.5 }}
          animate={{ rotate: [-14, 10, -6, 14, -14] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M60 22 L67 60 L60 56 L53 60 Z" fill="#ff8c7c" />
          <path d="M60 98 L67 60 L60 64 L53 60 Z" fill="#ffe8b0" />
        </motion.g>
        <circle cx={60} cy={60} r={4.5} fill="#ffc247" stroke="#0b1226" strokeWidth={1.5} />
      </svg>
    </div>
  );
}
