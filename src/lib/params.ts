import { STAGE_IDS, getStage } from "@/data/stages";

/** URL の [id] を、存在するステージ番号に変換する（なければ null） */
export function parseStageId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && getStage(n) ? n : null;
}

export function stageParams() {
  return STAGE_IDS.map((id) => ({ id: String(id) }));
}
