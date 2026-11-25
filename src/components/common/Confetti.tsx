"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = ["#ffc247", "#ffe8b0", "#3cc9b6", "#ff8c7c", "#74b3ff", "#fbf4e2"];

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/** クリア演出の紙吹雪。1回だけ噴き上がって落ちる（動きを減らす設定の人には出さない） */
export function Confetti({ count = 46 }: { count?: number }) {
  const pieces = useMemo(() => {
    const rnd = seeded(7919);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (rnd() - 0.5) * 760,
      up: 140 + rnd() * 260,
      fall: 420 + rnd() * 260,
      rot: (rnd() - 0.5) * 900,
      w: 6 + rnd() * 6,
      h: 9 + rnd() * 8,
      delay: rnd() * 0.25,
      dur: 2.2 + rnd() * 1.4,
      color: COLORS[i % COLORS.length],
      round: rnd() > 0.7,
    }));
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-[34%] z-50 flex justify-center motion-reduce:hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute block"
          style={{
            width: p.w,
            height: p.h,
            background: p.color,
            borderRadius: p.round ? 999 : 2,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
          animate={{
            x: p.x,
            y: [0, -p.up, p.fall],
            rotate: p.rot,
            opacity: [1, 1, 0],
            scale: 1,
          }}
          transition={{ duration: p.dur, delay: p.delay, ease: "easeOut", times: [0, 0.35, 1] }}
        />
      ))}
    </div>
  );
}
