"use client";

import { motion } from "framer-motion";
import type { LadderStep } from "@/data/types";
import { Rich } from "@/lib/text";

/**
 * 「はい」なら次へ進み、「いいえ」ならそこで結論が出る、はしごの図。
 * VRIO の4つの問いのように、順番に当てはめていく判定に使う。
 */
export function LadderBlock({
  title,
  steps,
  goal,
}: {
  title?: string;
  steps: LadderStep[];
  goal: { label: string; text: string };
}) {
  return (
    <figure className="rounded-2xl border border-ink-900/10 bg-white/55 p-3.5 sm:p-5">
      {title && <figcaption className="mb-3 text-[13px] font-bold tracking-wide text-ink-700">🪜 {title}</figcaption>}
      <ol className="p-0">
        {steps.map((s, i) => (
          <motion.li
            key={s.letter}
            className="list-none"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <div className="rounded-2xl border border-ink-900/10 bg-white/85 p-3.5 sm:p-4">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-900 font-display text-[22px] font-extrabold text-lantern-300"
                >
                  {s.letter}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[16px] font-extrabold leading-snug text-ink-900">{s.name}</p>
                  <p className="mt-1 text-[14px] font-bold leading-[1.7] text-ink-800">
                    <Rich text={s.question} />
                  </p>
                </div>
              </div>
              {s.example && (
                <p className="mt-2.5 rounded-xl bg-paper-200/80 px-3 py-2 text-[12.5px] leading-[1.7] text-ink-800">
                  <span className="mr-1 font-bold text-sky-500">▶</span>
                  <Rich text={s.example} />
                </p>
              )}
              <p className="mt-2.5 flex flex-wrap items-start gap-x-2 gap-y-1 text-[12.5px] leading-[1.7]">
                <span className="rounded-full bg-coral-400/25 px-2 py-0.5 font-bold text-coral-600">いいえ →</span>
                <span className="min-w-0 flex-1 font-bold text-ink-800">
                  <Rich text={s.no} />
                </span>
              </p>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-1.5 text-[12px] font-bold text-sea-600" aria-hidden>
              <span>はい</span>
              <span>↓</span>
            </div>
          </motion.li>
        ))}
        <motion.li
          className="list-none"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -6% 0px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <div className="rounded-2xl border border-lantern-500/60 bg-lantern-200/45 p-3.5 text-center sm:p-4">
            <p className="font-display text-[17px] font-extrabold text-lantern-600">🏆 {goal.label}</p>
            <p className="mt-1 text-[13.5px] leading-[1.8] text-ink-800">
              <Rich text={goal.text} />
            </p>
          </div>
        </motion.li>
      </ol>
    </figure>
  );
}
