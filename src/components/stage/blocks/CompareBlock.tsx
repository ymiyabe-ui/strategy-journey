"use client";

import { motion } from "framer-motion";
import type { CompareSide } from "@/data/types";
import { Rich } from "@/lib/text";

function Side({ side, highlight }: { side: CompareSide; highlight?: boolean }) {
  return (
    <div
      className={`h-full rounded-2xl border p-4 ${
        highlight ? "border-lantern-500/70 bg-lantern-200/45 shadow-glow-sm" : "border-ink-900/10 bg-ink-900/[0.04]"
      }`}
    >
      <div className="flex items-center gap-2">
        <span aria-hidden className="text-2xl">
          {side.emoji}
        </span>
        <h4 className="text-[15px] font-bold text-ink-900">{side.label}</h4>
      </div>
      <ul className="mt-3 space-y-2 p-0">
        {side.items.map((item, i) => (
          <li key={i} className="flex gap-2 text-[14px] leading-[1.75] text-ink-800">
            <span aria-hidden className={`mt-[3px] text-xs ${highlight ? "text-lantern-600" : "text-ink-500"}`}>
              {highlight ? "●" : "○"}
            </span>
            <span>
              <Rich text={item} />
            </span>
          </li>
        ))}
      </ul>
      {side.note && (
        <p
          className={`mt-3 inline-block rounded-full px-3 py-1 text-[11.5px] font-bold ${
            highlight ? "bg-lantern-500 text-ink-900" : "bg-ink-700/80 text-paper-100"
          }`}
        >
          {side.note}
        </p>
      )}
    </div>
  );
}

/** 左右の比較カード。右（こちらが主役）を強調する */
export function CompareBlock({ left, right, caption }: { left: CompareSide; right: CompareSide; caption?: string }) {
  const appear = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -6% 0px" },
  } as const;
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-2">
        <motion.div {...appear} transition={{ duration: 0.4 }}>
          <Side side={left} />
        </motion.div>
        <motion.div {...appear} transition={{ duration: 0.4, delay: 0.12 }}>
          <Side side={right} highlight />
        </motion.div>
      </div>
      {caption && <p className="mt-2 text-center text-[12.5px] font-bold text-ink-600">{caption}</p>}
    </div>
  );
}
