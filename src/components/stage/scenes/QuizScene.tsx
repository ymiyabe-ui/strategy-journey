"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { QuizScene } from "@/data/types";
import { Button } from "@/components/common/Button";
import { useProgress } from "@/lib/progress";
import { Rich, stripMarkup } from "@/lib/text";
import { ActionBar } from "../ActionBar";
import { Reaction } from "../ChoiceParts";
import { QuizOption, QuizResult, type OptionState } from "../QuizParts";

const LETTERS = ["A", "B", "C", "D"];

/** 確認クイズ。1問ずつ答え、選んだ選択肢ごとのフィードバックと解説を見せる */
export function QuizSceneView({
  scene,
  stageId,
  onNext,
}: {
  scene: QuizScene;
  stageId: number;
  onNext: () => void;
}) {
  const { recordQuiz } = useProgress();
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const q = scene.questions[qIdx];
  const total = scene.questions.length;
  const isLast = qIdx === total - 1;
  const answered = selected !== null;
  const isCorrect = answered && selected === q.answer;

  useEffect(() => {
    if (answered) feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [answered]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [qIdx, done]);

  const pick = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswers((a) => [...a.slice(0, qIdx), i]);
  };

  const next = () => {
    if (isLast) {
      setDone(true);
      return;
    }
    setQIdx((n) => n + 1);
    setSelected(null);
  };

  const retry = () => {
    setQIdx(0);
    setSelected(null);
    setAnswers([]);
    setDone(false);
  };

  const finish = () => {
    const correct = answers.filter((a, i) => a === scene.questions[i].answer).length;
    recordQuiz(stageId, { answers, correct, total });
    onNext();
  };

  const stateOf = (i: number): OptionState => {
    if (!answered) return "idle";
    if (i === q.answer) return "correct";
    if (i === selected) return "wrong";
    return "dim";
  };

  return (
    <div ref={topRef} className="mx-auto max-w-2xl scroll-mt-24 px-3 pb-44 pt-5 sm:px-4">
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.article
            key={q.id}
            className="paper px-4 pb-8 pt-7 sm:px-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11.5px] font-bold tracking-[0.18em] text-coral-600">{scene.title}</p>
              <div className="flex gap-1.5" aria-label={`第${qIdx + 1}問 / 全${total}問`}>
                {scene.questions.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-6 rounded-full ${i < qIdx ? "bg-sea-500" : i === qIdx ? "bg-lantern-500" : "bg-ink-900/15"}`}
                  />
                ))}
              </div>
            </div>
            {qIdx === 0 && !answered && (
              <p className="mt-3 text-[13.5px] leading-[1.85] text-ink-600">{scene.intro}</p>
            )}

            <p className="font-display mt-5 text-[13px] font-extrabold text-lantern-600">Q{qIdx + 1}</p>
            {q.scenario && (
              <p className="mt-1 rounded-xl border border-sky-500/30 bg-sky-400/[0.1] px-3.5 py-2.5 text-[13.5px] leading-[1.8] text-ink-700">
                {q.scenario}
              </p>
            )}
            <h2 className="mt-2 text-[17px] font-bold leading-[1.75] text-ink-900">
              <Rich text={q.question} />
            </h2>

            <div className="mt-4 space-y-2.5">
              {q.options.map((o, i) => (
                <QuizOption
                  key={i}
                  letter={LETTERS[i]}
                  text={stripMarkup(o.text)}
                  state={stateOf(i)}
                  disabled={answered}
                  onPick={() => pick(i)}
                />
              ))}
            </div>

            <div ref={feedbackRef}>
              {selected !== null && (
                <>
                  <Reaction
                    badge={isCorrect ? { text: "⭕ 正解！", tone: "good" } : { text: "✕ おしい！", tone: "bad" }}
                    text={q.options[selected].feedback}
                  />
                  <motion.div
                    className="mt-4 rounded-2xl border border-sea-500/40 bg-sea-400/[0.12] p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <p className="text-[12px] font-extrabold tracking-wide text-sea-600">📘 解説</p>
                    <p className="mt-1.5 text-[14.5px] leading-[1.9] text-ink-800">
                      <Rich text={q.explanation} />
                    </p>
                  </motion.div>
                </>
              )}
            </div>
          </motion.article>
        ) : (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <QuizResult questions={scene.questions} answers={answers} />
          </motion.div>
        )}
      </AnimatePresence>

      <ActionBar hint={!done && !answered ? "答えをタップして選ぼう" : undefined}>
        {!done && (
          <Button size="lg" className="w-full max-w-sm" disabled={!answered} onClick={next}>
            {isLast ? "結果を見る ›" : "つぎの問題へ ›"}
          </Button>
        )}
        {done && (
          <>
            <Button variant="secondary" onClick={retry}>
              もう一度
            </Button>
            <Button size="lg" className="flex-1 sm:max-w-[16rem]" onClick={finish}>
              つぎへ ›
            </Button>
          </>
        )}
      </ActionBar>
    </div>
  );
}
