import type { Stage, StageId } from "@/data/types";
import { stage1 } from "./stage1";
import { stage2 } from "./stage2";
import { stage3 } from "./stage3";
import { stage4 } from "./stage4";
import { stage5 } from "./stage5";
import { stage6 } from "./stage6";

/** 6つのステージ（すべて本編あり）。新しい章を足すときは、ここに並べる。準備中の章は status: "coming" で紹介だけ置ける */
export const STAGES: Stage[] = [stage1, stage2, stage3, stage4, stage5, stage6];

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
