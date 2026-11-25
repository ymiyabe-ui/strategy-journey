"use client";

import { motion } from "framer-motion";
import type { ExplainScene } from "@/data/types";
import { Button } from "@/components/common/Button";
import { Rich } from "@/lib/text";
import { ActionBar } from "../ActionBar";
import { BlockRenderer } from "../blocks/BlockRenderer";

/** 核心の解説。羊皮紙の一枚ページに、部品を縦に積む */
export function ExplainSceneView({ scene, onNext }: { scene: ExplainScene; onNext: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-3 pb-44 pt-5 sm:px-4">
      <motion.article
        className="paper px-4 pb-8 pt-7 sm:px-8 sm:pt-9"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <p className="text-[11.5px] font-bold tracking-[0.18em] text-coral-600">{scene.eyebrow}</p>
        <h2 className="font-display mt-2 text-[24px] font-extrabold leading-[1.45] text-ink-900 sm:text-[28px]">
          <Rich text={scene.title} />
        </h2>
        <div className="my-5 flex items-center gap-2" aria-hidden>
          <span className="h-px flex-1 bg-gradient-to-r from-lantern-500/70 to-transparent" />
          <span className="text-lantern-500">✦</span>
        </div>
        <div className="space-y-6">
          {scene.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>
      </motion.article>

      <ActionBar>
        <Button size="lg" className="w-full max-w-sm" onClick={onNext}>
          つぎへ ›
        </Button>
      </ActionBar>
    </div>
  );
}
