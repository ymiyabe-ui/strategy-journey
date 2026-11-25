"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { StoryScene } from "@/data/types";
import { Button } from "@/components/common/Button";
import { Rich } from "@/lib/text";
import { ActionBar } from "../ActionBar";
import { Dialogue } from "../Dialogue";

/** 物語の場面。タップ（または Space/Enter）で一行ずつ進む */
export function StorySceneView({ scene, onNext }: { scene: StoryScene; onNext: () => void }) {
  const [shown, setShown] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const done = shown >= scene.lines.length;

  const advance = useCallback(() => {
    if (done) onNext();
    else setShown((n) => n + 1);
  }, [done, onNext]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [shown]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") {
        const t = e.target as HTMLElement | null;
        if (t && (t.tagName === "BUTTON" || t.tagName === "A" || t.tagName === "INPUT")) return;
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  return (
    <div
      className="mx-auto min-h-[70dvh] max-w-2xl px-4 pb-44 pt-5"
      onClick={(e) => {
        // 用語チップや戻るボタンのタップでは進めない
        if ((e.target as HTMLElement).closest("button, a")) return;
        advance();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 rounded-2xl border border-lantern-400/25 bg-gradient-to-br from-night-700/70 to-night-800/70 px-4 py-3"
      >
        <p className="flex items-center gap-2 text-[13px] font-bold text-lantern-300">
          <span aria-hidden>📍</span>
          <Rich text={scene.place} />
        </p>
        {scene.time && <p className="mt-0.5 pl-6 text-[12px] text-paper-300/80">{scene.time}</p>}
      </motion.div>

      <Dialogue lines={scene.lines} shown={shown} />
      <div ref={bottomRef} className="scroll-mb-44" />

      <ActionBar hint={`${shown} / ${scene.lines.length}`}>
        <Button size="lg" className="w-full max-w-sm" onClick={advance}>
          {done ? "つぎへ ›" : "つづき ▼"}
        </Button>
      </ActionBar>
    </div>
  );
}
