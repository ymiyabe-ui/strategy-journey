"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/common/TopBar";
import { glossaryList } from "@/data/glossary";
import { STAGES } from "@/data/stages";
import { useProgress } from "@/lib/progress";

type Tab = "perspectives" | "terms";

/** 冒険のノート。獲得した視点と、出会った用語を振り返る */
export function NotebookScreen() {
  const { state, isCleared } = useProgress();
  const [tab, setTab] = useState<Tab>("perspectives");
  const found = glossaryList.filter((g) => state.terms.includes(g.key));
  const gained = STAGES.filter((s) => isCleared(s.id)).length;

  return (
    <div className="min-h-dvh pb-16">
      <TopBar title="冒険のノート" backHref="/map" backLabel="地図" />
      <main className="mx-auto max-w-2xl px-4 pt-5">
        <div role="tablist" className="glass flex rounded-full p-1">
          {(
            [
              ["perspectives", `🔭 獲得した視点 ${gained}/6`],
              ["terms", `🔖 用語ノート ${found.length}/${glossaryList.length}`],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`h-10 flex-1 rounded-full text-[13px] font-bold transition-colors ${
                tab === id ? "bg-lantern-400 text-ink-900" : "text-paper-200 hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "perspectives" ? (
          <ul className="mt-5 space-y-3 p-0">
            {STAGES.map((s, i) => {
              const ok = isCleared(s.id);
              const v = s.clear.perspective;
              return (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={ok ? "paper p-5" : "rounded-3xl border border-dashed border-white/20 bg-white/[0.03] p-5"}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-[30px] ${
                        ok ? "bg-night-800 shadow-glow-sm" : "bg-white/5 opacity-40 grayscale"
                      }`}
                      aria-hidden
                    >
                      {ok ? v.icon : "？"}
                    </span>
                    <div>
                      <p className={`text-[11px] font-extrabold tracking-[0.18em] ${ok ? "text-coral-600" : "text-paper-300/60"}`}>
                        第{s.id}章 ・ {s.title}
                      </p>
                      <p className={`font-display text-[19px] font-extrabold ${ok ? "text-ink-900" : "text-paper-300/60"}`}>
                        {ok ? v.name : "？？？"}
                      </p>
                      {ok && <p className="text-[12.5px] font-bold text-ink-600">{v.tagline}</p>}
                    </div>
                  </div>
                  {ok ? (
                    <>
                      <p className="mt-3 text-[14px] leading-[1.9] text-ink-800">{v.description}</p>
                      <ul className="mt-3 space-y-1.5 rounded-2xl bg-lantern-200/40 p-3.5">
                        {v.checks.map((c) => (
                          <li key={c} className="flex gap-2 text-[13.5px] leading-[1.75] text-ink-900">
                            <span aria-hidden className="text-lantern-600">
                              ✦
                            </span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="mt-2 text-[12.5px] text-paper-300/60">この章をクリアすると獲得できます</p>
                  )}
                </motion.li>
              );
            })}
          </ul>
        ) : (
          <ul className="mt-5 space-y-3 p-0">
            {glossaryList.map((g, i) => {
              const ok = state.terms.includes(g.key);
              return (
                <motion.li
                  key={g.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={ok ? "paper p-5" : "rounded-3xl border border-dashed border-white/20 bg-white/[0.03] p-5"}
                >
                  {ok ? (
                    <>
                      <p className="text-[11px] font-extrabold tracking-[0.18em] text-coral-600">
                        第{g.stage}章 ・ {g.reading}
                      </p>
                      <p className="font-display text-[24px] font-extrabold text-ink-900">{g.term}</p>
                      <dl className="mt-2 space-y-2.5 text-[14px] leading-[1.9] text-ink-800">
                        <div>
                          <dt className="text-[12px] font-bold text-sea-600">ひとことで</dt>
                          <dd>{g.plain}</dd>
                        </div>
                        <div>
                          <dt className="text-[12px] font-bold text-lantern-600">日常のたとえ</dt>
                          <dd>{g.everyday}</dd>
                        </div>
                        <div>
                          <dt className="text-[12px] font-bold text-coral-600">なぜ大事？</dt>
                          <dd>{g.essence}</dd>
                        </div>
                      </dl>
                    </>
                  ) : (
                    <p className="text-[13.5px] font-bold text-paper-300/60">🔖 ？？？ ─ 第{g.stage}章で出会えます</p>
                  )}
                </motion.li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
