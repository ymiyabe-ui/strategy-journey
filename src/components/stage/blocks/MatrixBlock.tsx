"use client";

import { motion } from "framer-motion";
import type { MatrixRow } from "@/data/types";
import { Rich } from "@/lib/text";

const MARK: Record<MatrixRow["marks"][number], { sym: string; cls: string; sr: string }> = {
  yes: { sym: "○", cls: "bg-sea-400/25 text-sea-600", sr: "あてはまる" },
  maybe: { sym: "△", cls: "bg-lantern-300/50 text-lantern-600", sr: "条件つき" },
  no: { sym: "×", cls: "bg-coral-400/25 text-coral-600", sr: "あてはまらない" },
};

const TONE: Record<MatrixRow["tone"], string> = {
  good: "bg-lantern-300/55 text-lantern-600",
  mid: "bg-sky-400/20 text-sky-500",
  bad: "bg-coral-400/25 text-coral-600",
};

/** 資源（行）× 問い（列）の判定表。スマホでも読めるよう、行ごとのカードで見せる */
export function MatrixBlock({ title, columns, rows }: { title?: string; columns: string[]; rows: MatrixRow[] }) {
  return (
    <figure className="rounded-2xl border border-ink-900/10 bg-white/55 p-3.5 sm:p-5">
      {title && <figcaption className="mb-3 text-[13px] font-bold tracking-wide text-ink-700">📋 {title}</figcaption>}
      <ul className="space-y-3 p-0">
        {rows.map((r, i) => (
          <motion.li
            key={r.name}
            className="list-none rounded-2xl border border-ink-900/10 bg-white/85 p-3.5 sm:p-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <div className="flex items-start gap-2.5">
              <span aria-hidden className="text-[24px] leading-none">
                {r.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="font-display text-[15.5px] font-extrabold leading-snug text-ink-900">{r.name}</h4>
                <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[12px] font-bold ${TONE[r.tone]}`}>
                  {r.verdict}
                </span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-1.5">
              {columns.map((c, k) => {
                const m = MARK[r.marks[k] ?? "no"];
                return (
                  <div key={c} className={`rounded-xl px-1 py-1.5 text-center ${m.cls}`}>
                    <p className="text-[18px] font-extrabold leading-none" aria-label={m.sr}>
                      {m.sym}
                    </p>
                    <p className="mt-1 text-[11px] font-bold leading-tight text-ink-700">{c}</p>
                  </div>
                );
              })}
            </div>
            {r.note && (
              <p className="mt-2.5 text-[12.5px] leading-[1.75] text-ink-700">
                <Rich text={r.note} />
              </p>
            )}
          </motion.li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[12px] font-bold text-ink-600">○ あてはまる　△ 条件つき　× あてはまらない</p>
    </figure>
  );
}
