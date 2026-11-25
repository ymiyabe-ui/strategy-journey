"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { getStage } from "@/data/stages";
import { useProgress } from "@/lib/progress";
import { RunnerHeader } from "./RunnerHeader";
import { SceneView } from "./SceneView";

/**
 * ステージの進行役。場面を順番に出し、進むたびに保存する（再開できる）。
 * 最後の場面を終えたら、星を判定してクリア画面へ。
 */
export function StageRunner({ stageId }: { stageId: number }) {
  const router = useRouter();
  const stage = getStage(stageId);
  const { ready, isUnlocked, stageProgress, setScene, completeStage } = useProgress();
  const [index, setIndex] = useState<number | null>(null);

  const playable = !!stage && stage.status === "ready" && stage.scenes.length > 0;
  const unlocked = isUnlocked(stageId);

  // 保存された場面から再開する
  useEffect(() => {
    if (!ready || !stage || index !== null) return;
    if (!playable || !unlocked) {
      router.replace(`/stage/${stageId}`);
      return;
    }
    const saved = stageProgress(stageId).sceneIndex;
    setIndex(Math.max(0, Math.min(saved, stage.scenes.length - 1)));
  }, [ready, stage, index, playable, unlocked, stageId, stageProgress, router]);

  if (!stage || index === null) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-sm font-bold text-paper-300/70">
        <span className="animate-pulse">ページをめくっています…</span>
      </div>
    );
  }

  const total = stage.scenes.length;
  const scene = stage.scenes[index];

  const go = (i: number) => {
    setIndex(i);
    setScene(stageId, i);
    window.scrollTo({ top: 0 });
  };

  const finish = () => {
    const p = stageProgress(stageId);
    const quizOk = p.quiz ? p.quiz.correct / p.quiz.total >= 2 / 3 : false;
    const choiceOk = p.choice ? p.choice.quality >= 0.66 : false;
    completeStage(stageId, 1 + (quizOk ? 1 : 0) + (choiceOk ? 1 : 0));
    router.push(`/stage/${stageId}/clear`);
  };

  const next = () => (index < total - 1 ? go(index + 1) : finish());

  return (
    <div className="min-h-dvh">
      <RunnerHeader stage={stage} index={index} onBack={() => index > 0 && go(index - 1)} />
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <SceneView scene={scene} stageId={stageId} onNext={next} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
