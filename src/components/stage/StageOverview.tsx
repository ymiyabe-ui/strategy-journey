"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, ButtonLink } from "@/components/common/Button";
import { Stars } from "@/components/common/Stars";
import { TopBar } from "@/components/common/TopBar";
import { getTerm } from "@/data/glossary";
import { getStage } from "@/data/stages";
import { useProgress } from "@/lib/progress";
import { Timeline, TermPreview } from "./OverviewParts";

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      className="glass rounded-3xl p-5 sm:p-6"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="mb-3 text-[12px] font-extrabold tracking-[0.2em] text-lantern-300">{title}</h2>
      {children}
    </motion.section>
  );
}

/** ステージ詳細。ゴール・旅の流れ・出会う用語・獲得できる視点を見せてから始める */
export function StageOverview({ stageId }: { stageId: number }) {
  const router = useRouter();
  const stage = getStage(stageId);
  const { ready, state, isUnlocked, stageProgress, setScene } = useProgress();

  if (!stage) return null;

  const p = stageProgress(stageId);
  const unlocked = isUnlocked(stageId);
  const playable = stage.status === "ready";
  const inProgress = !p.cleared && p.sceneIndex > 0;
  const perspective = stage.clear.perspective;

  const start = (fromTop: boolean) => {
    if (fromTop) setScene(stageId, 0);
    router.push(`/stage/${stageId}/play`);
  };

  return (
    <div className="min-h-dvh pb-40">
      <TopBar title={`第${stage.id}章`} backHref="/map" backLabel="地図" />

      <main className="mx-auto max-w-2xl space-y-5 px-4 pt-6">
        <motion.header
          className="relative overflow-hidden rounded-[28px] border border-white/10 px-6 pb-7 pt-8 text-center"
          style={{ background: `radial-gradient(120% 90% at 50% 0%, ${stage.accent}33, rgba(16,26,56,0.85) 70%)` }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full text-[50px]"
            style={{
              background: `radial-gradient(circle at 35% 30%, ${stage.accent}, #17224d 78%)`,
              boxShadow: `0 0 36px ${stage.accent}88`,
              border: `3px solid ${stage.accent}`,
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {stage.icon}
          </motion.div>
          <p className="mt-4 text-[12px] font-extrabold tracking-[0.3em]" style={{ color: stage.accent }}>
            CHAPTER {stage.id}
          </p>
          <h1 className="font-display mt-1 text-[34px] font-extrabold leading-tight text-paper-50">{stage.title}</h1>
          <p className="mt-1 text-[14px] font-bold text-paper-200">{stage.subtitle}</p>
          <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-[2] text-paper-200/90">{stage.blurb}</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[12px] font-bold text-paper-200">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">⏱ 約{stage.minutes}分</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">📚 {stage.theme}</span>
          </div>
          {p.cleared && (
            <div className="mt-4 flex justify-center">
              <Stars value={p.stars} size={26} />
            </div>
          )}
        </motion.header>

        <Panel title="このステージのゴール">
          <ul className="space-y-2.5 p-0">
            {stage.goals.map((g) => (
              <li key={g} className="flex gap-3 text-[14.5px] leading-[1.85] text-paper-100">
                <span aria-hidden className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lantern-400 text-[11px] font-extrabold text-ink-900">
                  ✓
                </span>
                {g}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="旅の流れ">
          <Timeline stage={stage} sceneIndex={p.sceneIndex} cleared={p.cleared} />
        </Panel>

        <Panel title="出会う用語">
          <TermPreview stage={stage} unlocked={state.terms} glossaryName={(k) => getTerm(k)?.term} />
        </Panel>

        <Panel title="獲得できる視点">
          <div className="flex items-center gap-4">
            <span
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-lantern-400/40 bg-lantern-400/10 text-[34px] ${p.cleared ? "" : "opacity-50 grayscale"}`}
              aria-hidden
            >
              {perspective.icon}
            </span>
            <div>
              <p className="font-display text-[19px] font-extrabold text-paper-50">{perspective.name}</p>
              <p className="text-[13px] text-paper-300/85">{perspective.tagline}</p>
              <p className="mt-1 text-[11.5px] font-bold text-lantern-300">{p.cleared ? "獲得済み ✓" : "クリアで獲得"}</p>
            </div>
          </div>
        </Panel>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-night-950 via-night-950/92 to-transparent pb-[calc(1rem+var(--safe-bottom))] pt-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 px-4">
          {!ready ? null : !unlocked ? (
            <>
              <p className="text-[12.5px] font-bold text-paper-200">🔒 第{stage.id - 1}章をクリアすると開きます</p>
              <ButtonLink href="/map" variant="secondary" size="lg" className="w-full max-w-sm">
                地図にもどる
              </ButtonLink>
            </>
          ) : !playable ? (
            <>
              <p className="text-[12.5px] font-bold text-paper-200">この章の本編は、準備中です。もうしばらくお待ちください。</p>
              <ButtonLink href="/map" variant="secondary" size="lg" className="w-full max-w-sm">
                地図にもどる
              </ButtonLink>
            </>
          ) : (
            <div className="flex w-full max-w-sm flex-col gap-2">
              <Button size="lg" onClick={() => start(!inProgress)}>
                {p.cleared ? "もう一度読む ›" : inProgress ? "つづきから ›" : "この章をはじめる ›"}
              </Button>
              {inProgress && (
                <button type="button" onClick={() => start(true)} className="text-[12.5px] font-bold text-paper-300/70 underline-offset-4 hover:underline">
                  最初から読み直す
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
