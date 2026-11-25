"use client";

import { motion } from "framer-motion";
import type { ChoiceStep } from "@/data/types";
import { isMatch } from "@/lib/choice";

interface Props {
  steps: ChoiceStep[];
  picks: string[];
  /** 結末が決まったら、右端に出す絵文字 */
  resultEmoji?: string;
  /** すべてつながったか（結末表示のときだけ使う） */
  allLinked?: boolean;
}

function Link({ state }: { state: "none" | "ok" | "ng" }) {
  const line =
    state === "ok"
      ? "border-solid border-lantern-400 shadow-[0_0_8px_rgba(255,194,71,0.8)]"
      : state === "ng"
        ? "border-dashed border-coral-400"
        : "border-dotted border-white/25";
  return (
    <div className="flex w-[22px] shrink-0 flex-col items-center justify-center gap-0.5 sm:w-8">
      <span className={`block w-full border-t-2 ${line}`} />
      <span className={`text-[10px] font-bold leading-none ${state === "ok" ? "text-lantern-300" : "text-coral-400"}`}>
        {state === "ok" ? (
          <>
            <span className="sm:hidden">✓</span>
            <span className="hidden sm:inline">だから</span>
          </>
        ) : state === "ng" ? (
          "✕"
        ) : (
          ""
        )}
      </span>
    </div>
  );
}

/** 組み立て中のストーリー（誰に → 中身 → 運び方 → 結果）。つながると矢印が光る */
export function StoryTracker({ steps, picks, resultEmoji, allLinked }: Props) {
  return (
    <div className="glass rounded-2xl p-3 sm:p-4" aria-label="組み立て中の物語">
      <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-lantern-300">組み立て中の物語</p>
      <div className="flex items-stretch">
        {steps.map((step, i) => {
          const opt = step.options.find((o) => o.id === picks[i]);
          const linkState: "none" | "ok" | "ng" =
            i === 0 || !opt ? "none" : isMatch(opt, picks.slice(0, i)) ? "ok" : "ng";
          return (
            <div key={step.id} className="flex min-w-0 flex-1 items-stretch">
              {i > 0 && <Link state={linkState} />}
              <motion.div
                layout
                className={`flex min-h-[74px] min-w-0 flex-1 flex-col items-center justify-center rounded-xl border px-1.5 py-2 text-center ${
                  opt ? "border-lantern-400/50 bg-lantern-400/10" : "border-dashed border-white/20 bg-white/[0.03]"
                }`}
              >
                <span className="text-[10px] font-bold tracking-wider text-paper-300/80">{step.nodeLabel}</span>
                <span className="mt-0.5 text-[11.5px] font-bold leading-snug text-paper-50 sm:text-[12.5px]">
                  {opt ? opt.short : "？"}
                </span>
              </motion.div>
            </div>
          );
        })}
        <Link state={resultEmoji ? (allLinked ? "ok" : "ng") : "none"} />
        <div
          className={`flex w-11 shrink-0 items-center justify-center rounded-xl border text-xl ${
            resultEmoji ? "border-lantern-400/60 bg-lantern-400/15" : "border-dashed border-white/20 bg-white/[0.03]"
          }`}
          aria-label="結果"
        >
          {resultEmoji ?? "🏁"}
        </div>
      </div>
    </div>
  );
}
