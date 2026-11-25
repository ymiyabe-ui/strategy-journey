"use client";

import { motion } from "framer-motion";
import type { Perspective } from "@/data/types";

/** 獲得した視点のカード。裏返るように現れる */
export function PerspectiveCard({ perspective, accent }: { perspective: Perspective; accent: string }) {
  return (
    <motion.section
      className="paper overflow-hidden"
      initial={{ opacity: 0, rotateX: -70, y: 30 }}
      animate={{ opacity: 1, rotateX: 0, y: 0 }}
      transition={{ delay: 1.7, type: "spring", stiffness: 140, damping: 18 }}
      style={{ transformPerspective: 900 }}
    >
      <div
        className="flex items-center gap-4 px-5 py-5 sm:px-7"
        style={{ background: `linear-gradient(135deg, ${accent}55, rgba(255,251,241,0))` }}
      >
        <motion.span
          className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl bg-night-800 text-[38px] shadow-glow"
          animate={{ rotate: [0, -6, 6, 0] }}
          transition={{ delay: 2.4, duration: 0.8 }}
          aria-hidden
        >
          {perspective.icon}
        </motion.span>
        <div>
          <p className="text-[11px] font-extrabold tracking-[0.22em] text-coral-600">獲得した視点</p>
          <h3 className="font-display text-[24px] font-extrabold leading-tight text-ink-900">{perspective.name}</h3>
          <p className="text-[13px] font-bold text-ink-600">{perspective.tagline}</p>
        </div>
      </div>
      <div className="px-5 pb-6 pt-1 sm:px-7">
        <p className="text-[14.5px] leading-[1.95] text-ink-800">{perspective.description}</p>
        <div className="mt-4 rounded-2xl border border-lantern-500/50 bg-lantern-200/40 p-4">
          <p className="text-[12px] font-extrabold tracking-wide text-lantern-600">🔭 日常で使う3つの問い</p>
          <ol className="mt-2 space-y-2 p-0">
            {perspective.checks.map((c, i) => (
              <li key={c} className="flex gap-2.5 text-[14px] leading-[1.8] text-ink-900">
                <span
                  aria-hidden
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lantern-500 text-[12px] font-extrabold text-ink-900"
                >
                  {i + 1}
                </span>
                {c}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </motion.section>
  );
}

/** 今回の章で、ノートに加わった用語 */
export function GainedTerms({ terms }: { terms: string[] }) {
  if (terms.length === 0) return null;
  return (
    <motion.section
      className="glass rounded-3xl p-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.1 }}
    >
      <p className="text-[12px] font-extrabold tracking-[0.2em] text-lantern-300">ノートに加わった用語</p>
      <ul className="mt-3 flex flex-wrap gap-2 p-0">
        {terms.map((t, i) => (
          <motion.li
            key={t}
            className="rounded-full border border-coral-400/50 bg-coral-400/10 px-3.5 py-1.5 text-[13.5px] font-bold text-coral-300"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.3 + i * 0.15, type: "spring", stiffness: 300, damping: 16 }}
          >
            🔖 {t}
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
