"use client";

import { motion } from "framer-motion";
import type { MapRegion } from "@/data/types";

const TONE: Record<MapRegion["tone"], { box: string; head: string; chip: string }> = {
  sea: { box: "border-sea-500/50 bg-sea-400/[0.1]", head: "text-sea-600", chip: "bg-sea-400/20" },
  lantern: { box: "border-lantern-500/60 bg-lantern-200/35", head: "text-lantern-600", chip: "bg-lantern-300/40" },
  sky: { box: "border-sky-500/50 bg-sky-400/[0.1]", head: "text-sky-500", chip: "bg-sky-400/20" },
};

/** 戦略サファリの地図。地方ごとに、流派を「ひとこと」で並べる */
export function SchoolMapBlock({ title, regions }: { title?: string; regions: MapRegion[] }) {
  return (
    <figure className="rounded-2xl border border-ink-900/10 bg-white/55 p-3.5 sm:p-5">
      {title && <figcaption className="mb-3 text-[13px] font-bold tracking-wide text-ink-700">🗺️ {title}</figcaption>}
      <div className="space-y-3">
        {regions.map((r, i) => {
          const t = TONE[r.tone];
          return (
            <motion.section
              key={r.name}
              className={`rounded-2xl border p-3.5 sm:p-4 ${t.box}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -6% 0px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="flex items-center gap-2.5">
                <span aria-hidden className="text-[26px]">
                  {r.emoji}
                </span>
                <div>
                  <h4 className={`font-display text-[17px] font-extrabold ${t.head}`}>{r.name}</h4>
                  <p className="text-[12.5px] font-bold leading-snug text-ink-700">{r.tagline}</p>
                </div>
              </div>
              <ul className="mt-3 grid gap-2 p-0 sm:grid-cols-2">
                {r.schools.map((s) => (
                  <li key={s.name} className={`rounded-xl px-3 py-2.5 ${t.chip}`}>
                    <p className="flex flex-wrap items-center gap-1.5 text-[14px] font-extrabold text-ink-900">
                      {s.name}
                      {s.tag && (
                        <span className="rounded-full bg-ink-900 px-2 py-0.5 text-[10px] font-bold text-lantern-300">
                          {s.tag}
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-[12.5px] leading-[1.7] text-ink-700">{s.gist}</p>
                  </li>
                ))}
              </ul>
            </motion.section>
          );
        })}
      </div>
    </figure>
  );
}
