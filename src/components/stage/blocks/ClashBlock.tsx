"use client";

import { motion } from "framer-motion";
import { Rich } from "@/lib/text";

/** 「A × B」がぶつかる様子を見せるカード */
export function ClashBlock({
  title,
  items,
}: {
  title?: string;
  items: { a: string; b: string; result: string }[];
}) {
  return (
    <div className="rounded-2xl border border-coral-500/30 bg-coral-400/[0.08] p-4 sm:p-5">
      {title && <p className="mb-3 text-[13px] font-bold tracking-wide text-coral-600">{title}</p>}
      <ul className="space-y-3 p-0">
        {items.map((it, i) => (
          <motion.li
            key={i}
            className="rounded-xl bg-white/75 p-3.5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <div className="flex flex-wrap items-center gap-2 text-[13.5px] font-bold text-ink-900">
              <span className="rounded-lg bg-paper-200 px-2.5 py-1">{it.a}</span>
              <span aria-label="と" className="text-coral-600">
                ⚡
              </span>
              <span className="rounded-lg bg-paper-200 px-2.5 py-1">{it.b}</span>
            </div>
            <p className="mt-2 text-[14px] leading-[1.8] text-ink-800">
              <span className="mr-1 font-bold text-coral-600">→</span>
              <Rich text={it.result} />
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
