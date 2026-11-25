"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { getStage } from "@/data/stages";
import { useProgress } from "@/lib/progress";
import { Compass } from "./Compass";
import { HarborArt } from "./HarborArt";
import { Prologue } from "./Prologue";

const FEATURES = [
  { icon: "📖", text: "物語で学ぶ" },
  { icon: "🗺️", text: "全6つの章" },
  { icon: "💾", text: "自動で保存" },
];

/** スタート画面。世界観の提示 → プロローグ → マップへ */
export function StartScreen() {
  const router = useRouter();
  const { ready, hasSave, state, overallPercent, nextStageId, setName, finishPrologue, resetAll } = useProgress();
  const [view, setView] = useState<"title" | "prologue">("title");
  const [confirmReset, setConfirmReset] = useState(false);

  const next = nextStageId ? getStage(nextStageId) : undefined;
  const who = state.playerName.trim() || "あなた";

  const begin = (name: string) => {
    setName(name);
    finishPrologue();
    router.push("/map");
  };

  if (view === "prologue") {
    return <Prologue initialName={state.playerName} onDone={begin} />;
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center overflow-hidden px-6 pb-52 pt-14 text-center sm:pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <Compass size={128} />
      </motion.div>

      <motion.p
        className="mt-7 text-[11.5px] font-bold tracking-[0.5em] text-lantern-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        STRATEGY JOURNEY
      </motion.p>

      <motion.h1
        className="font-display mt-3 bg-gradient-to-b from-lantern-200 via-lantern-300 to-lantern-500 bg-clip-text text-[64px] font-extrabold leading-none tracking-[0.12em] text-transparent drop-shadow-[0_0_24px_rgba(255,194,71,0.35)] sm:text-[84px]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.8 }}
      >
        戦略の旅
      </motion.h1>

      <motion.p
        className="font-display mt-5 max-w-md text-[16px] font-bold leading-[2] text-paper-100 sm:text-[18px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        新米コンサルタントになって、
        <br />
        物語を進めながら経営戦略を学ぶ。
      </motion.p>

      <motion.ul
        className="mt-6 flex flex-wrap justify-center gap-2 p-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        {FEATURES.map((f) => (
          <li
            key={f.text}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[12.5px] font-bold text-paper-200"
          >
            <span aria-hidden>{f.icon}</span>
            {f.text}
          </li>
        ))}
      </motion.ul>

      <motion.div
        className="relative z-10 mt-10 flex min-h-[8.5rem] w-full max-w-xs flex-col items-stretch gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: ready ? 1 : 0, y: 0 }}
        transition={{ delay: ready ? 0.1 : 0 }}
      >
        <AnimatePresence initial={false}>
          {ready && hasSave ? (
            <motion.div key="resume" className="flex flex-col gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="glass rounded-2xl px-4 py-3 text-left">
                <p className="text-[11px] font-bold tracking-wider text-lantern-300">{who}の旅</p>
                <p className="mt-0.5 text-[13.5px] font-bold text-paper-50">
                  進捗 {overallPercent}%
                  {next ? ` ・ 次は第${next.id}章「${next.title}」` : " ・ すべての章をクリア！"}
                </p>
              </div>
              <Button size="lg" onClick={() => router.push("/map")}>
                つづきから ›
              </Button>
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="text-[12.5px] font-bold text-paper-300/70 underline-offset-4 hover:underline"
              >
                はじめからやり直す
              </button>
            </motion.div>
          ) : (
            <motion.div key="new" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Button size="lg" className="w-full" onClick={() => setView("prologue")}>
                旅をはじめる ›
              </Button>
              <p className="mt-3 text-[12px] text-paper-300/70">1章あたり約25分 ・ スマホでもPCでも</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <HarborArt />

      <ConfirmDialog
        open={confirmReset}
        title="最初からやり直しますか？"
        body="これまでの進捗・選択・獲得した用語がすべて消えます。この操作は取り消せません。"
        confirmLabel="やり直す"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          resetAll();
          setConfirmReset(false);
          setView("prologue");
        }}
      />
    </main>
  );
}
