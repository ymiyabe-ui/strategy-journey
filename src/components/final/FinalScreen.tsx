"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/common/Button";
import { TopBar } from "@/components/common/TopBar";
import { FINAL_STAGE, STAGES } from "@/data/stages";
import { useProgress } from "@/lib/progress";

/**
 * 最終総合ステージ。6つの章をすべてクリアすると開く。
 * いまは入口だけ。本編（ひだまり亭の簡易ケーススタディ）は次の作業で実装する。
 */
export function FinalScreen() {
  const { ready, isCleared, allCleared } = useProgress();

  return (
    <div className="min-h-dvh pb-16">
      <TopBar title="最終総合ステージ" backHref="/map" backLabel="地図" />
      <main className="mx-auto max-w-2xl space-y-5 px-4 pt-6">
        <motion.header
          className="rounded-[28px] border border-white/10 px-6 pb-8 pt-9 text-center"
          style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(255,214,124,0.28), rgba(16,26,56,0.85) 70%)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-[64px] leading-none" aria-hidden>
            {FINAL_STAGE.icon}
          </div>
          <p className="mt-3 text-[12px] font-extrabold tracking-[0.35em] text-lantern-300">FINAL STAGE</p>
          <h1 className="font-display mt-1 text-[32px] font-extrabold text-paper-50">{FINAL_STAGE.title}</h1>
          <p className="text-[14px] font-bold text-paper-200">{FINAL_STAGE.subtitle}</p>
          <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-[2] text-paper-200/90">{FINAL_STAGE.blurb}</p>
        </motion.header>

        <section className="glass rounded-3xl p-5">
          <h2 className="text-[12px] font-extrabold tracking-[0.2em] text-lantern-300">このステージのゴール</h2>
          <ul className="mt-3 space-y-2.5 p-0">
            {FINAL_STAGE.goals.map((g) => (
              <li key={g} className="flex gap-3 text-[14.5px] leading-[1.85] text-paper-100">
                <span aria-hidden className="mt-1 text-lantern-300">
                  ✦
                </span>
                {g}
              </li>
            ))}
          </ul>
        </section>

        <section className="glass rounded-3xl p-5">
          <h2 className="text-[12px] font-extrabold tracking-[0.2em] text-lantern-300">開く条件：6つの章をクリア</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 p-0">
            {STAGES.map((s) => {
              const ok = ready && isCleared(s.id);
              return (
                <li
                  key={s.id}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[13px] font-bold ${
                    ok ? "border-lantern-400/50 bg-lantern-400/10 text-lantern-300" : "border-white/10 text-paper-300/60"
                  }`}
                >
                  <span aria-hidden>{ok ? "✓" : s.icon}</span>
                  第{s.id}章 {s.title}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-[13.5px] font-bold leading-[1.9] text-paper-100">
            {allCleared
              ? "条件を満たしました。ただし、このステージの本編は準備中です。もうしばらくお待ちください。"
              : "6つの章をすべてクリアすると、このステージが開きます。"}
          </p>
        </section>

        <ButtonLink href="/map" variant="secondary" size="lg" className="w-full">
          地図にもどる
        </ButtonLink>
      </main>
    </div>
  );
}
