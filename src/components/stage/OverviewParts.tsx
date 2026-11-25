"use client";

import { motion } from "framer-motion";
import type { Stage } from "@/data/types";
import { PHASES, phaseOf, type PhaseId } from "@/lib/phases";

/** 「旅の流れ」：導入→解説→用語→実践→確認→まとめ→クリア。いまどこかも分かる */
export function Timeline({ stage, sceneIndex, cleared }: { stage: Stage; sceneIndex: number; cleared: boolean }) {
  const ready = stage.scenes.length > 0;
  const used: PhaseId[] = ready
    ? PHASES.map((p) => p.id).filter((id) => stage.scenes.some((s) => phaseOf(s) === id))
    : PHASES.map((p) => p.id);
  const current = ready && !cleared && sceneIndex > 0 ? phaseOf(stage.scenes[Math.min(sceneIndex, stage.scenes.length - 1)]) : null;
  const currentPos = current ? used.indexOf(current) : -1;

  const rows = [
    ...used.map((id) => PHASES.find((p) => p.id === id)!),
    { id: "clear" as const, label: "クリア", emoji: "🏆", desc: "獲得した視点と星の発表" },
  ];

  return (
    <ol className="relative m-0 space-y-0 p-0">
      {rows.map((row, i) => {
        const done = cleared || (currentPos >= 0 && i < currentPos);
        const now = !cleared && currentPos === i;
        return (
          <motion.li
            key={row.id}
            className="relative flex gap-3.5 pb-5 last:pb-0"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.07 }}
          >
            {i < rows.length - 1 && (
              <span
                aria-hidden
                className={`absolute left-[17px] top-9 h-[calc(100%-1.5rem)] w-0.5 ${done ? "bg-lantern-400" : "bg-white/15"}`}
              />
            )}
            <span
              className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-[16px] ${
                done
                  ? "border-lantern-400 bg-lantern-400 text-ink-900"
                  : now
                    ? "border-lantern-300 bg-night-700 shadow-glow-sm"
                    : "border-white/20 bg-night-800"
              }`}
              aria-hidden
            >
              {done ? "✓" : row.emoji}
            </span>
            <div className="pt-0.5">
              <p className={`text-[14.5px] font-bold ${now ? "text-lantern-300" : "text-paper-50"}`}>
                {row.label}
                {now && <span className="ml-2 rounded-full bg-lantern-400 px-2 py-0.5 text-[10.5px] text-ink-900">いまここ</span>}
              </p>
              <p className="text-[12.5px] leading-snug text-paper-300/80">{row.desc}</p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

/** 出会う用語。公開済みの章は、出会うまで「？？？」で隠す（ゲームらしさ） */
export function TermPreview({
  stage,
  unlocked,
  glossaryName,
}: {
  stage: Stage;
  unlocked: string[];
  glossaryName: (key: string) => string | undefined;
}) {
  const ready = stage.status === "ready";
  const items = ready
    ? stage.termKeys.map((k) => ({ key: k, label: unlocked.includes(k) ? (glossaryName(k) ?? k) : null }))
    : stage.termPreview.map((t) => ({ key: t, label: t as string | null }));

  return (
    <div>
      <ul className="flex flex-wrap gap-2 p-0">
        {items.map((it) => (
          <li
            key={it.key}
            className={`rounded-full border px-3.5 py-1.5 text-[13px] font-bold ${
              it.label ? "border-coral-400/50 bg-coral-400/10 text-coral-300" : "border-dashed border-white/25 text-paper-300/60"
            }`}
          >
            {it.label ?? "？？？"}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[12px] text-paper-300/70">
        {ready ? "物語を進めると出会えます。出会った用語はノートに記録されます。" : "この章で出会う予定の用語です。"}
      </p>
    </div>
  );
}
