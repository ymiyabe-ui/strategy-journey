"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, ButtonLink } from "@/components/common/Button";
import { Confetti } from "@/components/common/Confetti";
import { ProgressBar } from "@/components/common/ProgressBar";
import { Stars } from "@/components/common/Stars";
import { getTerm } from "@/data/glossary";
import { getStage } from "@/data/stages";
import { useProgress } from "@/lib/progress";
import { ActionBar } from "./ActionBar";
import { GainedTerms, PerspectiveCard } from "./ClearParts";
import { Dialogue } from "./Dialogue";

/** ステージクリア。紙吹雪・星・獲得した視点・次の章の解放を、順番に見せる */
export function StageClear({ stageId }: { stageId: number }) {
  const router = useRouter();
  const stage = getStage(stageId);
  const { ready, stageProgress, overallPercent } = useProgress();

  const p = stageProgress(stageId);
  const cleared = p.cleared;

  useEffect(() => {
    if (ready && stage && !cleared) router.replace(`/stage/${stageId}`);
  }, [ready, stage, cleared, stageId, router]);

  if (!stage || !ready || !cleared) {
    return <div className="min-h-dvh" />;
  }

  const next = getStage(stageId + 1);
  const terms = stage.termKeys.map((k) => getTerm(k)?.term).filter((t): t is string => !!t);

  return (
    <div className="min-h-dvh pb-44">
      <Confetti />
      <main className="mx-auto max-w-2xl space-y-5 px-4 pt-12 sm:pt-16">
        <header className="text-center">
          <motion.p
            className="text-[12px] font-extrabold tracking-[0.5em] text-lantern-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            CHAPTER {stage.id} COMPLETE
          </motion.p>
          <motion.h1
            className="font-display mt-3 bg-gradient-to-b from-lantern-200 via-lantern-300 to-lantern-500 bg-clip-text text-[46px] font-extrabold leading-none tracking-[0.08em] text-transparent drop-shadow-[0_0_26px_rgba(255,194,71,0.45)] sm:text-[60px]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 13, delay: 0.2 }}
          >
            STAGE CLEAR
          </motion.h1>
          <motion.p
            className="mt-3 text-[15px] font-bold text-paper-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {stage.icon} 第{stage.id}章「{stage.title}」
          </motion.p>
          <div className="mt-4 flex justify-center">
            <Stars value={p.stars} size={44} animate />
          </div>
          <motion.p
            className="mt-2 text-[12.5px] font-bold text-paper-300/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            {p.quiz ? `クイズ ${p.quiz.correct}/${p.quiz.total}` : ""}
            {p.quiz && p.choice ? " ・ " : ""}
            {p.choice ? "物語の組み立て 達成" : ""}
          </motion.p>
        </header>

        <PerspectiveCard perspective={stage.clear.perspective} accent={stage.accent} />
        <GainedTerms terms={terms} />

        <motion.section
          className="glass rounded-3xl p-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
        >
          <div className="flex items-end justify-between">
            <p className="text-[12px] font-extrabold tracking-[0.2em] text-lantern-300">旅の進み具合</p>
            <p className="font-display text-[30px] font-extrabold leading-none text-lantern-300">
              {overallPercent}
              <span className="text-[14px]">%</span>
            </p>
          </div>
          <ProgressBar className="mt-2" height={10} value={overallPercent / 100} />
          {next && (
            <p className="mt-3 flex items-center gap-2 text-[13.5px] font-bold text-paper-50">
              <span aria-hidden>🔓</span>
              第{next.id}章「{next.title}」が開きました
            </p>
          )}
          <p className="mt-1.5 text-[12.5px] leading-[1.8] text-paper-300/85">{stage.clear.teaser}</p>
        </motion.section>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.9 }}>
          <Dialogue lines={stage.clear.nana} shown={stage.clear.nana.length} />
        </motion.div>
      </main>

      <ActionBar>
        <ButtonLink href="/map" variant={next?.status === "ready" ? "secondary" : "primary"} size="lg" className="flex-1 sm:max-w-[14rem]">
          地図にもどる
        </ButtonLink>
        {next?.status === "ready" && (
          <Button size="lg" className="flex-1 sm:max-w-[16rem]" onClick={() => router.push(`/stage/${next.id}`)}>
            次の章へ ›
          </Button>
        )}
      </ActionBar>
    </div>
  );
}
