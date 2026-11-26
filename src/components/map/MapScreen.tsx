"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { TopBar } from "@/components/common/TopBar";
import { FINAL_STAGE, STAGES } from "@/data/stages";
import { useProgress } from "@/lib/progress";
import { MAP_H } from "./geometry";
import { MapRoute } from "./MapRoute";
import { ProgressCard } from "./ProgressCard";
import { StageNode, type NodeState } from "./StageNode";

/** メインマップ。6つの島と最終ステージを、曲がる航路でつなぐ */
export function MapScreen() {
  const router = useRouter();
  const { ready, isCleared, isUnlocked, stageProgress, allCleared, resetAll } = useProgress();
  const [toast, setToast] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const stateOf = (id: number, status: "ready" | "coming"): NodeState => {
    if (isCleared(id)) return "cleared";
    if (!isUnlocked(id)) return "locked";
    return status === "ready" ? "current" : "soon";
  };

  const lit = [...STAGES.map((s) => isCleared(s.id))].slice(0, 6);
  const finalState = stateOf(FINAL_STAGE.id, FINAL_STAGE.status);

  return (
    <div className="min-h-dvh pb-24">
      <TopBar
        title="旅の地図"
        backHref="/"
        backLabel="タイトル"
        right={
          <Link
            href="/notebook"
            className="flex h-9 items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 text-[12.5px] font-bold text-paper-100 hover:bg-white/10"
          >
            🔖 ノート
          </Link>
        }
      />

      <main className="mx-auto max-w-xl px-4 pt-5">
        <ProgressCard />

        <div className="mt-8 px-1">
          <p className="text-center text-[12px] font-bold tracking-[0.3em] text-paper-300/70">― ROUTE ―</p>
          <div className="relative mt-2" style={{ height: MAP_H + 24 }}>
            <MapRoute lit={lit} />
            {STAGES.map((s, i) => (
              <StageNode
                key={s.id}
                index={i}
                chapter={`第${s.id}章`}
                title={s.title}
                subtitle={s.subtitle}
                icon={s.icon}
                accent={s.accent}
                state={stateOf(s.id, s.status)}
                stars={stageProgress(s.id).stars}
                href={`/stage/${s.id}`}
                onLockedTap={() => setToast(`第${s.id - 1}章をクリアすると、この章が開きます`)}
              />
            ))}
            <StageNode
              index={6}
              chapter="最終"
              title={FINAL_STAGE.title}
              subtitle={FINAL_STAGE.subtitle}
              icon={FINAL_STAGE.icon}
              accent={FINAL_STAGE.accent}
              state={finalState}
              stars={stageProgress(FINAL_STAGE.id).stars}
              href={`/stage/${FINAL_STAGE.id}`}
              onLockedTap={() => setToast("6つの章をすべてクリアすると、最終ステージが開きます")}
            />
          </div>
        </div>

        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            disabled={!ready}
            className="text-[12.5px] font-bold text-paper-300/60 underline-offset-4 hover:underline"
          >
            はじめからやり直す
          </button>
        </div>
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="fixed inset-x-4 bottom-6 z-50 mx-auto max-w-sm rounded-2xl border border-lantern-400/40 bg-night-800/95 px-4 py-3 text-center text-[13.5px] font-bold text-paper-50 shadow-card backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            🔒 {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={confirmReset}
        title="最初からやり直しますか？"
        body="これまでの進捗・選択・獲得した用語がすべて消えます。この操作は取り消せません。"
        confirmLabel="やり直す"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          resetAll();
          setConfirmReset(false);
          router.push("/");
        }}
      />
    </div>
  );
}
