import type { Stage, StageId } from "@/data/types";
import { stage1 } from "./stage1";
import { stage2 } from "./stage2";
import { stage3 } from "./stage3";
import { stage4 } from "./stage4";
import { stage5 } from "./stage5";
import { stage6 } from "./stage6";
import { stageFinal } from "./final";

/** 6つの章（すべて本編あり）。進捗率・ロックの判定は、この6章が基準 */
export const STAGES: Stage[] = [stage1, stage2, stage3, stage4, stage5, stage6];

export const STAGE_IDS: StageId[] = STAGES.map((s) => s.id);

/** 最終総合ステージ（6章をすべてクリアすると開く）。再生・クリアの画面は章と同じものを使う */
export const FINAL_STAGE: Stage = stageFinal;

/** 6つの章と最終ステージ。URL の [id] の解決や、獲得した視点の一覧に使う */
export const ALL_STAGES: Stage[] = [...STAGES, FINAL_STAGE];

export function getStage(id: number): Stage | undefined {
  return ALL_STAGES.find((s) => s.id === id);
}
