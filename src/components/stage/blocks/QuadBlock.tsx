"use client";

import { motion } from "framer-motion";
import type { QuadCell } from "@/data/types";
import { Rich } from "@/lib/text";

const TONE: Record<QuadCell["tone"], { box: string; tag: string; pill: string }> = {
  sea: { box: "border-sea-500/45 bg-sea-400/[0.12]", tag: "bg-sea-500 text-white", pill: "bg-sea-400/25 text-sea-600" },
  coral: { box: "border-coral-500/45 bg-coral-400/[0.12]", tag: "bg-coral-500 text-white", pill: "bg-coral-400/25 text-coral-600" },
  lantern: { box: "border-lantern-500/50 bg-lantern-300/[0.22]", tag: "bg-lantern-500 text-white", pill: "bg-lantern-300/55 text-lantern-600" },
  sky: { box: "border-sky-500/45 bg-sky-400/[0.14]", tag: "bg-sky-500 text-white", pill: "bg-sky-400/25 text-sky-500" },
};

function Cell({ cell, colLabel, index }: { cell: QuadCell; colLabel: string; index: number }) {
  const t = TONE[cell.tone];
  return (
    <motion.li
      className={`list-none rounded-2xl border p-3.5 sm:p-4 ${t.box}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className={`inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full px-2 font-display text-[15px] font-extrabold leading-none ${t.tag}`}
        >
          {cell.tag}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h4 className="font-display text-[15.5px] font-extrabold leading-snug text-ink-900">{cell.name}</h4>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${t.pill}`}>{colLabel}</span>
          </div>
          {cell.from && <p className="mt-0.5 text-[11.5px] font-bold leading-snug text-ink-600">{cell.from}</p>}
        </div>
      </div>
      <ul className="mt-2.5 space-y-1.5 p-0">
        {cell.items.map((it) => (
          <li key={it} className="flex list-none gap-1.5 text-[13px] leading-[1.7] text-ink-800">
            <span aria-hidden className="mt-[0.1em] text-ink-500">
              ・
            </span>
            <span>
              <Rich text={it} />
            </span>
          </li>
        ))}
      </ul>
    </motion.li>
  );
}

/**
 * 2×2の図（SWOT・掛け合わせなど）。
 * 行ごとに見出しの帯をつけ、その下に左右2枚のカードを置く（スマホでは縦に積む）。
 */
export function QuadBlock({
  title,
  rows,
  cols,
  cells,
  caption,
}: {
  title?: string;
  rows: [string, string];
  cols: [string, string];
  cells: [QuadCell, QuadCell, QuadCell, QuadCell];
  caption?: string;
}) {
  return (
    <figure className="rounded-2xl border border-ink-900/10 bg-white/55 p-3.5 sm:p-5">
      {title && <figcaption className="mb-3 text-[13px] font-bold tracking-wide text-ink-700">🧭 {title}</figcaption>}
      <div className="space-y-4">
        {[0, 1].map((r) => (
          <section key={r}>
            <p className="mb-2 rounded-lg bg-paper-200/80 px-3 py-1.5 text-[12.5px] font-extrabold tracking-wide text-ink-800">
              {rows[r]}
            </p>
            <ul className="grid gap-3 p-0 md:grid-cols-2">
              <Cell cell={cells[r * 2]} colLabel={cols[0]} index={r * 2} />
              <Cell cell={cells[r * 2 + 1]} colLabel={cols[1]} index={r * 2 + 1} />
            </ul>
          </section>
        ))}
      </div>
      {caption && <p className="mt-3 text-center text-[12px] font-bold leading-[1.7] text-ink-600"><Rich text={caption} /></p>}
    </figure>
  );
}
