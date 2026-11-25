"use client";

import { motion } from "framer-motion";
import type { QuizQuestion } from "@/data/types";
import { Stars } from "@/components/common/Stars";
import { stripMarkup } from "@/lib/text";

export type OptionState = "idle" | "correct" | "wrong" | "dim";

const STYLE: Record<OptionState, string> = {
  idle: "border-ink-900/10 bg-white/70 hover:border-lantern-500/60 hover:bg-white",
  correct: "border-sea-500 bg-sea-400/20",
  wrong: "border-coral-500 bg-coral-400/20",
  dim: "border-ink-900/10 bg-white/40 opacity-55",
};

/** クイズの選択肢。回答後は正解を緑、選んだ誤答を赤で示す */
export function QuizOption({
  letter,
  text,
  state,
  disabled,
  onPick,
}: {
  letter: string;
  text: string;
  state: OptionState;
  disabled: boolean;
  onPick: () => void;
}) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onPick}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      animate={state === "wrong" ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.35 }}
      className={`flex w-full items-start gap-3 rounded-2xl border-2 p-3.5 text-left transition-colors ${STYLE[state]}`}
    >
      <span
        aria-hidden
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold ${
          state === "correct"
            ? "bg-sea-500 text-white"
            : state === "wrong"
              ? "bg-coral-500 text-white"
              : "bg-paper-200 text-ink-700"
        }`}
      >
        {state === "correct" ? "○" : state === "wrong" ? "✕" : letter}
      </span>
      <span className="pt-0.5 text-[14.5px] font-medium leading-[1.8] text-ink-900">{text}</span>
    </motion.button>
  );
}

function verdict(correct: number, total: number) {
  if (correct === total) return { stars: 3, title: "全問正解！", text: "完璧な理解よ。核心をしっかり掴めているわ。" };
  if (correct >= Math.ceil((total * 2) / 3))
    return { stars: 2, title: "よくできました", text: "もう一歩で完璧。まちがえた問題の解説を、もう一度確認してみて。" };
  return { stars: 1, title: "ここが伸びしろ", text: "大丈夫。解説を読み返して、もう一度挑戦してみましょう。" };
}

/** クイズの結果。点数・講評・問題ごとの振り返り */
export function QuizResult({
  questions,
  answers,
}: {
  questions: QuizQuestion[];
  answers: number[];
}) {
  const correct = answers.filter((a, i) => a === questions[i].answer).length;
  const v = verdict(correct, questions.length);
  return (
    <motion.div
      className="paper px-4 pb-8 pt-8 text-center sm:px-8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-[11.5px] font-bold tracking-[0.2em] text-coral-600">確認クイズ ／ 結果</p>
      <p className="font-display mt-3 text-[56px] font-extrabold leading-none text-ink-900">
        {correct}
        <span className="text-[26px] text-ink-500"> / {questions.length}</span>
      </p>
      <div className="mt-3 flex justify-center">
        <Stars value={v.stars} size={30} animate />
      </div>
      <h3 className="font-display mt-3 text-[22px] font-extrabold text-ink-900">{v.title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-[14.5px] leading-[1.9] text-ink-700">{v.text}</p>

      <ul className="mt-6 space-y-2 p-0 text-left">
        {questions.map((q, i) => {
          const ok = answers[i] === q.answer;
          return (
            <li key={q.id} className="flex gap-3 rounded-xl bg-white/70 p-3">
              <span
                aria-hidden
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white ${
                  ok ? "bg-sea-500" : "bg-coral-500"
                }`}
              >
                {ok ? "○" : "✕"}
              </span>
              <span className="text-[13.5px] leading-[1.75] text-ink-800">
                <span className="font-bold">Q{i + 1}.</span> {stripMarkup(q.question)}
                {!ok && (
                  <span className="mt-1 block text-[12.5px] font-bold text-sea-600">
                    正解：{stripMarkup(q.options[q.answer].text)}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
