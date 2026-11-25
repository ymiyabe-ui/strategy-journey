"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ChoiceScene } from "@/data/types";
import { Button } from "@/components/common/Button";
import { countMatches, isMatch, pickEnding } from "@/lib/choice";
import { useProgress } from "@/lib/progress";
import { ActionBar } from "../ActionBar";
import { ChoiceBrief } from "../ChoiceBrief";
import { ChoiceEndingCard } from "../ChoiceEnding";
import { OptionCard, Reaction } from "../ChoiceParts";
import { StoryTracker } from "../StoryTracker";

type Phase = "brief" | "step" | "ending";
type Badge = { text: string; tone: "good" | "ok" | "bad" };
const LETTERS = ["A", "B", "C", "D"];

/** 実践：3ステップで物語を組み立てる。選んだ内容でつながりが光り、結末が分岐する */
export function ChoiceSceneView({
  scene,
  stageId,
  onNext,
}: {
  scene: ChoiceScene;
  stageId: number;
  onNext: () => void;
}) {
  const { recordChoice } = useProgress();
  const [phase, setPhase] = useState<Phase>("brief");
  const [stepIdx, setStepIdx] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);
  const reactionRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const step = scene.steps[stepIdx];
  const isLastStep = stepIdx === scene.steps.length - 1;
  const picked = answered ? step.options.find((o) => o.id === picks[stepIdx]) : undefined;
  const ending = phase === "ending" ? pickEnding(scene, picks) : undefined;

  useEffect(() => {
    if (answered) reactionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [answered]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [phase, stepIdx]);

  const choose = (id: string) => {
    if (answered) return;
    setPicks((p) => [...p.slice(0, stepIdx), id]);
    setAnswered(true);
  };

  const next = () => {
    if (isLastStep) {
      setPhase("ending");
      return;
    }
    setStepIdx((i) => i + 1);
    setAnswered(false);
  };

  const retry = () => {
    setPhase("step");
    setStepIdx(0);
    setPicks([]);
    setAnswered(false);
  };

  const finish = () => {
    if (!ending) return;
    recordChoice(stageId, { picks, quality: ending.quality, endingId: ending.id });
    onNext();
  };

  // 選んだあとの反応（見出しと文章）
  let badge: Badge | undefined;
  let reactionText = "";
  if (picked) {
    if (stepIdx === 0) {
      const s = picked.start;
      badge =
        s === "good"
          ? { text: "🌟 いい出発点", tone: "good" }
          : s === "ok"
            ? { text: "🤔 土台とずれているかも", tone: "ok" }
            : { text: "🌀 誰にも刺さらないかも", tone: "bad" };
      reactionText = picked.reaction;
    } else if (isMatch(picked, picks.slice(0, stepIdx))) {
      badge = { text: "✅ つながった！", tone: "good" };
      reactionText = picked.reaction;
    } else {
      badge = { text: "✕ つながらなかった", tone: "bad" };
      reactionText = picked.mismatchReaction ?? picked.reaction;
    }
  }

  const hint =
    phase === "step" && !answered ? "選択肢をタップして決めよう" : phase === "ending" ? "何度でも試せます" : undefined;

  return (
    <div ref={topRef} className="mx-auto max-w-2xl scroll-mt-24 px-3 pb-44 pt-5 sm:px-4">
      <AnimatePresence mode="wait">
        {phase === "brief" && (
          <motion.div key="brief" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <ChoiceBrief scene={scene} />
          </motion.div>
        )}

        {phase === "step" && (
          <motion.div key={`step-${stepIdx}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <StoryTracker steps={scene.steps} picks={picks} />
            <article className="paper mt-4 px-4 pb-8 pt-7 sm:px-8">
              <p className="text-[11.5px] font-bold tracking-[0.18em] text-coral-600">
                STEP {stepIdx + 1} / {scene.steps.length}
              </p>
              <h2 className="font-display mt-1.5 text-[21px] font-extrabold leading-[1.5] text-ink-900">
                {step.title.replace(/^ステップ\d ── /, "")}
              </h2>
              <p className="mt-2 text-[14.5px] leading-[1.9] text-ink-700">{step.question}</p>
              <div className="mt-4 space-y-2.5">
                {step.options.map((o, i) => (
                  <OptionCard
                    key={o.id}
                    option={o}
                    letter={LETTERS[i]}
                    selected={answered && picks[stepIdx] === o.id}
                    dimmed={answered && picks[stepIdx] !== o.id}
                    disabled={answered}
                    onPick={() => choose(o.id)}
                  />
                ))}
              </div>
              <div ref={reactionRef}>{badge && <Reaction badge={badge} text={reactionText} />}</div>
            </article>
          </motion.div>
        )}

        {phase === "ending" && ending && (
          <motion.div key="ending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StoryTracker
              steps={scene.steps}
              picks={picks}
              resultEmoji={ending.emoji}
              allLinked={countMatches(scene, picks) === scene.steps.length - 1}
            />
            <div className="mt-4">
              <ChoiceEndingCard ending={ending} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ActionBar hint={hint}>
        {phase === "brief" && (
          <Button size="lg" className="w-full max-w-sm" onClick={() => setPhase("step")}>
            物語を組み立てる ›
          </Button>
        )}
        {phase === "step" && (
          <Button size="lg" className="w-full max-w-sm" disabled={!answered} onClick={next}>
            {isLastStep ? "結末を見る ›" : "つぎのステップへ ›"}
          </Button>
        )}
        {phase === "ending" && (
          <>
            <Button variant="secondary" onClick={retry}>
              ちがう道を試す
            </Button>
            <Button size="lg" className="flex-1 sm:max-w-[16rem]" onClick={finish}>
              この物語で進む ›
            </Button>
          </>
        )}
      </ActionBar>
    </div>
  );
}
