"use client";

import { motion } from "framer-motion";
import type { ForceItem } from "@/data/types";
import { Rich } from "@/lib/text";

const LEVEL: Record<NonNullable<ForceItem["level"]>, { label: string; cls: string }> = {
  high: { label: "力：強い", cls: "bg-coral-400/25 text-coral-600" },
  mid: { label: "力：ふつう", cls: "bg-lantern-300/45 text-lantern-600" },
  low: { label: "力：弱い", cls: "bg-sea-400/25 text-sea-600" },
};

function Card({ item, index, center }: { item: ForceItem; index: number; center?: boolean }) {
  const lv = item.level ? LEVEL[item.level] : null;
  return (
    <motion.li
      className={`flex flex-col rounded-2xl border p-3.5 sm:p-4 ${
        center ? "border-sky-500/60 bg-sky-400/[0.14]" : "border-ink-900/10 bg-white/80"
      }`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <div className="flex items-start gap-2.5">
        <span aria-hidden className="text-[24px] leading-none">
          {item.emoji}
        </span>
        <div className="min-w-0">
          <h4 className="font-display text-[15.5px] font-extrabold leading-snug text-ink-900">{item.name}</h4>
          {lv && (
            <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold ${lv.cls}`}>{lv.label}</span>
          )}
        </div>
      </div>
      <p className="mt-2 text-[13px] leading-[1.75] text-ink-700">
        <Rich text={item.gist} />
      </p>
      {item.note && (
        <p className="mt-2 rounded-xl bg-paper-200/80 px-3 py-2 text-[12.5px] leading-[1.7] text-ink-800">
          <span className="mr-1 font-bold text-sky-500">▶</span>
          <Rich text={item.note} />
        </p>
      )}
    </motion.li>
  );
}

/**
 * 5つの力の図。中央に「業界内の競争」、まわりに4つの力。
 * スマホでは縦に並べ（中央が先頭）、広い画面では十字に置く。
 */
export function ForcesBlock({
  title,
  center,
  forces,
}: {
  title?: string;
  center: ForceItem;
  /** 順番は 新規参入・売り手・買い手・代替品 */
  forces: [ForceItem, ForceItem, ForceItem, ForceItem];
}) {
  const [entrants, suppliers, buyers, substitutes] = forces;
  return (
    <figure className="rounded-2xl border border-ink-900/10 bg-white/55 p-3.5 sm:p-5">
      {title && <figcaption className="mb-3 text-[13px] font-bold tracking-wide text-ink-700">🔭 {title}</figcaption>}
      <ul className="grid gap-3 p-0 md:grid-cols-3 md:grid-rows-3">
        <div className="md:col-start-2 md:row-start-2">
          <Card item={center} index={0} center />
        </div>
        <div className="md:col-start-2 md:row-start-1">
          <Card item={entrants} index={1} />
        </div>
        <div className="md:col-start-1 md:row-start-2">
          <Card item={suppliers} index={2} />
        </div>
        <div className="md:col-start-3 md:row-start-2">
          <Card item={buyers} index={3} />
        </div>
        <div className="md:col-start-2 md:row-start-3">
          <Card item={substitutes} index={4} />
        </div>
      </ul>
      <p className="mt-3 text-center text-[12px] font-bold text-ink-600">
        まわりの4つの力が、真ん中の「業界の利益」を、それぞれの方向から引っ張ります。
      </p>
    </figure>
  );
}
