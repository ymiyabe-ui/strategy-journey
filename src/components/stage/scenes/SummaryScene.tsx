"use client";

import { motion } from "framer-motion";
import type { SummaryScene } from "@/data/types";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { Rich } from "@/lib/text";
import { ActionBar } from "../ActionBar";
import { Dialogue } from "../Dialogue";

/** 学びのまとめ。重要ポイントを一枚に再提示し、「なぜ大事か」で締める */
export function SummarySceneView({ scene, onNext }: { scene: SummaryScene; onNext: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-3 pb-44 pt-5 sm:px-4">
      <motion.article
        className="paper px-4 pb-8 pt-8 sm:px-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-[11.5px] font-bold tracking-[0.2em] text-coral-600">学びのまとめ</p>
        <h2 className="font-display mt-2 text-[26px] font-extrabold text-ink-900">{scene.title}</h2>

        <ol className="mt-6 space-y-3.5 p-0">
          {scene.points.map((p, i) => (
            <motion.li
              key={p.title}
              className="flex gap-3.5 rounded-2xl border border-ink-900/10 bg-white/70 p-4"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.14, duration: 0.4 }}
            >
              <span
                aria-hidden
                className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-lantern-300 to-lantern-500 text-[17px] font-extrabold text-ink-900 shadow-glow-sm"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-[15.5px] font-bold leading-[1.6] text-ink-900">{p.title}</h3>
                <p className="mt-1 text-[14px] leading-[1.9] text-ink-700">
                  <Rich text={p.text} />
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <Reveal className="mt-6">
          <div className="rounded-2xl border border-sea-500/50 bg-gradient-to-br from-sea-400/[0.16] to-paper-100 p-5">
            <p className="text-[12px] font-extrabold tracking-wide text-sea-600">🔍 {scene.why.title}</p>
            <p className="mt-2 text-[14.5px] leading-[1.95] text-ink-800">
              <Rich text={scene.why.text} />
            </p>
          </div>
        </Reveal>
      </motion.article>

      <div className="mt-6">
        <Dialogue lines={scene.nana} shown={scene.nana.length} />
      </div>

      <ActionBar hint="次は、クリアの結果発表です">
        <Button size="lg" className="w-full max-w-sm" onClick={onNext}>
          ステージクリア！ ✨
        </Button>
      </ActionBar>
    </div>
  );
}
