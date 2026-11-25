"use client";

import { useEffect, useRef, useState } from "react";
import type { TermsScene } from "@/data/types";
import { getTerm } from "@/data/glossary";
import { Button } from "@/components/common/Button";
import { useProgress } from "@/lib/progress";
import { ActionBar } from "../ActionBar";
import { Dialogue } from "../Dialogue";
import { TermCard } from "../TermCard";

/** 用語の場面。まずナナ先生の前置き、そのあと用語カードを1枚ずつ */
export function TermsSceneView({ scene, onNext }: { scene: TermsScene; onNext: () => void }) {
  const { unlockTerms } = useProgress();
  const introCount = scene.intro.length;
  const [idx, setIdx] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);

  const inIntro = idx < introCount;
  const cardIndex = idx - introCount;
  const entries = scene.terms.map(getTerm).filter((e) => e !== undefined);
  const entry = inIntro ? undefined : entries[cardIndex];
  const lastCard = !inIntro && cardIndex >= entries.length - 1;

  // カードが出た時点で、用語ノートに記録する
  useEffect(() => {
    if (entry) unlockTerms([entry.key]);
  }, [entry, unlockTerms]);

  useEffect(() => {
    if (!inIntro) topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [inIntro, cardIndex]);

  const advance = () => {
    if (lastCard) onNext();
    else setIdx((n) => n + 1);
  };

  return (
    <div ref={topRef} className="mx-auto max-w-2xl scroll-mt-24 px-4 pb-44 pt-5">
      <h2 className="font-display mb-5 text-center text-[22px] font-extrabold text-lantern-300">{scene.title}</h2>

      {inIntro ? (
        <Dialogue lines={scene.intro} shown={idx + 1} />
      ) : (
        entry && <TermCard key={entry.key} entry={entry} index={cardIndex} total={entries.length} />
      )}

      <ActionBar
        hint={
          inIntro
            ? `${idx + 1} / ${introCount}`
            : entries.map((_, i) => (i === cardIndex ? "●" : "○")).join(" ")
        }
      >
        <Button size="lg" className="w-full max-w-sm" onClick={advance}>
          {inIntro ? (idx + 1 < introCount ? "つづき ▼" : "用語カードを見る ›") : lastCard ? "つぎへ ›" : "つぎの用語 ›"}
        </Button>
      </ActionBar>
    </div>
  );
}
