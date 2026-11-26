"use client";

import Link from "next/link";
import { stageTag } from "@/lib/stageLabel";
import type { Stage } from "@/data/types";
import { PHASES, phaseOf, type PhaseId } from "@/lib/phases";
import { ProgressBar } from "@/components/common/ProgressBar";

interface Props {
  stage: Stage;
  index: number;
  onBack: () => void;
}

/** 進行中の上部バー。段階（導入→解説→…→まとめ）と、全体の進み具合を見せる */
export function RunnerHeader({ stage, index, onBack }: Props) {
  const total = stage.scenes.length;
  const current = phaseOf(stage.scenes[index]);
  const used: PhaseId[] = PHASES.map((p) => p.id).filter((id) => stage.scenes.some((s) => phaseOf(s) === id));
  const currentPos = used.indexOf(current);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-night-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-2xl px-4 pb-2.5 pt-2">
        <div className="flex h-9 items-center justify-between gap-2">
          <Link
            href={`/stage/${stage.id}`}
            className="-ml-2 flex h-9 items-center rounded-full px-3 text-[13px] font-bold text-paper-200 hover:bg-white/5"
          >
            ‹ 中断
          </Link>
          <p className="min-w-0 flex-1 truncate text-center text-[13px] font-bold text-paper-100">
            <span style={{ color: stage.accent }}>{stageTag(stage)}</span> {stage.title}
          </p>
          <button
            type="button"
            onClick={onBack}
            disabled={index === 0}
            className="-mr-2 flex h-9 items-center rounded-full px-3 text-[13px] font-bold text-paper-200 hover:bg-white/5 disabled:opacity-30"
          >
            前へ
          </button>
        </div>

        <ol className="mt-1 flex items-center gap-1 p-0" aria-label="学習の流れ">
          {used.map((id, i) => {
            const phase = PHASES.find((p) => p.id === id)!;
            const done = i < currentPos;
            const now = i === currentPos;
            return (
              <li
                key={id}
                className={`flex min-w-0 flex-1 items-center justify-center gap-1 rounded-full px-1 py-1 text-[10.5px] font-bold transition-colors ${
                  now
                    ? "bg-lantern-400 text-ink-900 shadow-glow-sm"
                    : done
                      ? "bg-white/10 text-lantern-300"
                      : "bg-white/[0.04] text-paper-300/60"
                }`}
              >
                <span aria-hidden className="hidden sm:inline">
                  {done ? "✓" : phase.emoji}
                </span>
                <span className="truncate">{phase.label}</span>
              </li>
            );
          })}
          <li
            aria-hidden
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-[12px] opacity-60"
          >
            🏆
          </li>
        </ol>

        <ProgressBar className="mt-2" height={4} value={(index + 1) / (total + 1)} accent={stage.accent} label="ステージの進み具合" />
      </div>
    </header>
  );
}
