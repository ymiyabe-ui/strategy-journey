import type { Stage, StageId } from "@/data/types";
import { stage1 } from "./stage1";
import { stage2 } from "./stage2";
import { stage3 } from "./stage3";
import { stagesComing } from "./meta";

/** 6つのステージ。公開済み（status: ready）は scenes を持ち、準備中は紹介だけ */
export const STAGES: Stage[] = [stage1, stage2, stage3, ...stagesComing];

export const STAGE_IDS: StageId[] = STAGES.map((s) => s.id);

export function getStage(id: number): Stage | undefined {
  return STAGES.find((s) => s.id === id);
}

/** 最終総合ステージ（6ステージをすべてクリアすると開く） */
export const FINAL_STAGE = {
  title: "最終総合ステージ",
  subtitle: "灯台の町の最終試験",
  icon: "🌅",
  accent: "#ffd67c",
  blurb:
    "ここまでに手に入れた6つの視点を、ひとつのケースにすべて使います。第1章で出会った「ひだまり亭」に、もう一度。物語・地図・ポジション・戦場・武器を束ねて、最後の戦略ストーリーを描きます。",
  goals: [
    "6つの視点を、一つのケースで順番に使い分ける",
    "分析の結果を、「だから」でつながる一本の物語にまとめる",
    "自分の言葉で、戦略ストーリーを3分で説明する",
  ],
};
