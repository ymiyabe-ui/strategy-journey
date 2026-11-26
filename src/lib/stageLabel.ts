import type { Stage } from "@/data/types";

type Labeled = Pick<Stage, "id" | "final">;

/** 「第3章」「最終ステージ」のような、ステージの呼び名 */
export function stageTag(s: Labeled): string {
  return s.final ? "最終ステージ" : `第${s.id}章`;
}

/** 見出しの上に小さく出す英字（CHAPTER 3 / FINAL STAGE） */
export function stageEyebrow(s: Labeled): string {
  return s.final ? "FINAL STAGE" : `CHAPTER ${s.id}`;
}
