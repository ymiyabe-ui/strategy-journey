"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/common/Button";
import { ProgressBar } from "@/components/common/ProgressBar";
import { getStage } from "@/data/stages";
import { useProgress } from "@/lib/progress";

/** マップ上部の進捗カード。進捗率・星・次に進む章を見せる */
export function ProgressCard() {
  const { ready, state, overallPercent, clearedCount, allCleared, nextStageId } = useProgress();
  const next = nextStageId ? getStage(nextStageId) : undefined;
  const stars = Object.values(state.stages).reduce((n, s) => n + (s?.stars ?? 0), 0);
  const who = state.playerName.trim() || "あなた";

  return (
    <motion.section
      className="glass rounded-3xl p-5"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: ready ? 1 : 0.4, y: 0 }}
      aria-label="旅の進み具合"
    >
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] text-lantern-300">{who}の旅</p>
          <p className="font-display mt-0.5 text-[15px] font-bold text-paper-100">
            {allCleared ? "すべての章を踏破！" : next ? `次は 第${next.id}章「${next.title}」` : "旅の途中"}
          </p>
        </div>
        <p className="font-display text-[44px] font-extrabold leading-none text-lantern-300">
          {overallPercent}
          <span className="text-[18px]">%</span>
        </p>
      </div>

      <ProgressBar className="mt-3" height={10} value={overallPercent / 100} label="旅全体の進捗率" />

      <div className="mt-3 flex items-center justify-between text-[12.5px] font-bold text-paper-300/90">
        <span>クリア {clearedCount} / 6 章</span>
        <span>
          ⭐ {stars} / 18
        </span>
      </div>

      {next && next.status === "ready" && (
        <ButtonLink href={`/stage/${next.id}`} className="mt-4 w-full">
          {state.stages[next.id]?.sceneIndex ? "つづきから ›" : "この章へ進む ›"}
        </ButtonLink>
      )}
    </motion.section>
  );
}
