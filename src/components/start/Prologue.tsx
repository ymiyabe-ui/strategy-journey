"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { Rich } from "@/lib/text";

const NARRATION = [
  "ここは、ビジネスの航海者たちが集う港町〈ノースハーバー〉。",
  "高台の白い建物には、迷える経営者たちの行き先を照らす場所がある。『ノースライト戦略研究所』。人々はそこを、親しみを込めて「灯台」と呼んでいた。",
  "戦略とは、むずかしい計画のことではない。暗い海で、自分の船がどこへ向かうのかを決める、**たったひとつの灯り**のことだ。",
  "そして今日は、あなたの入社初日。新米コンサルタントとしての旅が、いま始まる。",
];

/** 旅のはじまり。ナレーションを4枚めくって、名前を決める */
export function Prologue({ initialName, onDone }: { initialName: string; onDone: (name: string) => void }) {
  const [idx, setIdx] = useState(0);
  const [name, setName] = useState(initialName);
  const naming = idx >= NARRATION.length;

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-6 py-10 text-center">
      <p className="text-[11.5px] font-bold tracking-[0.4em] text-lantern-300">PROLOGUE</p>

      <div className="mt-6 flex min-h-[15rem] w-full items-center justify-center">
        <AnimatePresence mode="wait">
          {!naming ? (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="font-display text-[19px] font-bold leading-[2.2] text-paper-50 sm:text-[22px]"
            >
              <Rich text={NARRATION[idx]} />
            </motion.p>
          ) : (
            <motion.div
              key="name"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <h2 className="font-display text-[22px] font-extrabold text-paper-50">あなたの名前を教えてください</h2>
              <p className="mt-2 text-[13px] leading-[1.9] text-paper-300/80">
                ナナ先生が、その名前で呼んでくれます。
                <br />
                空欄のままでも始められます。
              </p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={12}
                placeholder="例：ミライ"
                aria-label="あなたの名前"
                autoComplete="off"
                className="mt-5 h-14 w-full rounded-2xl border-2 border-lantern-400/40 bg-night-800/80 px-5 text-center text-lg font-bold text-paper-50 placeholder:text-paper-300/40 focus:border-lantern-400 focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && onDone(name.trim())}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center gap-2" aria-hidden>
        {[...NARRATION, "name"].map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-lantern-400" : "w-1.5 bg-white/25"}`} />
        ))}
      </div>

      <div className="mt-8 w-full max-w-xs">
        {!naming ? (
          <Button size="lg" className="w-full" onClick={() => setIdx((n) => n + 1)}>
            つづく ›
          </Button>
        ) : (
          <Button size="lg" className="w-full" onClick={() => onDone(name.trim())}>
            旅に出る ⛵
          </Button>
        )}
        {!naming && (
          <button
            type="button"
            onClick={() => setIdx(NARRATION.length)}
            className="mt-3 text-[12.5px] font-bold text-paper-300/70 underline-offset-4 hover:underline"
          >
            スキップ
          </button>
        )}
      </div>
    </div>
  );
}
