"use client";

import { motion } from "framer-motion";
import type { GlossaryEntry } from "@/data/types";

const SECTIONS: { key: "plain" | "everyday" | "essence" | "inStory"; label: string; icon: string; tone: string }[] = [
  { key: "plain", label: "ひとことで言うと", icon: "💬", tone: "text-sea-600" },
  { key: "everyday", label: "日常のたとえ", icon: "🍵", tone: "text-lantern-600" },
  { key: "essence", label: "なぜ大事？ ─ 本質", icon: "🔍", tone: "text-coral-600" },
  { key: "inStory", label: "この旅では…", icon: "📖", tone: "text-sky-500" },
];

/** 用語カード。かみ砕いた説明・たとえ・本質を、順番に開いて見せる */
export function TermCard({ entry, index, total }: { entry: GlossaryEntry; index: number; total: number }) {
  return (
    <motion.div
      className="paper overflow-hidden"
      initial={{ opacity: 0, y: 24, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
    >
      <div className="relative bg-gradient-to-br from-night-700 to-night-800 px-5 pb-5 pt-6 text-paper-50 sm:px-8">
        <span className="absolute right-4 top-4 rounded-full bg-lantern-400 px-2.5 py-0.5 text-[10.5px] font-extrabold tracking-wider text-ink-900">
          NEW TERM {index + 1}/{total}
        </span>
        <p className="text-[11.5px] font-bold tracking-[0.2em] text-lantern-300">{entry.reading}</p>
        <h3 className="font-display mt-1 text-[32px] font-extrabold leading-tight">{entry.term}</h3>
        {entry.english && <p className="mt-0.5 text-[12.5px] text-paper-300/80">{entry.english}</p>}
      </div>

      <div className="space-y-3 px-4 pb-6 pt-4 sm:px-7">
        {SECTIONS.map((s, i) => (
          <motion.div
            key={s.key}
            className="rounded-2xl bg-white/70 p-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.22, duration: 0.4 }}
          >
            <p className={`flex items-center gap-1.5 text-[12px] font-bold tracking-wide ${s.tone}`}>
              <span aria-hidden>{s.icon}</span>
              {s.label}
            </p>
            <p className="mt-1.5 text-[14.5px] leading-[1.9] text-ink-800">{entry[s.key]}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
