import type { Stage } from "@/data/types";
import { storyObservatory, storyPressure } from "./story";
import { explainIndustry, explainForces } from "./explain-a";
import { explainApply, explainRespond } from "./explain-b";
import { explainGeneric, explainStuck } from "./explain-c";
import { termsScene } from "./terms";
import { choiceScene } from "./practice";
import { quizScene } from "./quiz";
import { summaryScene, clearInfo } from "./finish";

/**
 * 第4章「戦場を読む」── ファイブフォースと3つの基本戦略
 * 第3章の「立ち位置」が立つ戦場そのものを読む。夏祭りのかき氷屋のたとえから入り、
 * ひだまり亭に当てはめ、第3章の用語（トレードオフ・活動システム）を再利用する。
 */
export const stage4: Stage = {
  id: 4,
  title: "戦場を読む",
  subtitle: "5フォースと基本戦略",
  theme: "ファイブフォース分析と3つの基本戦略",
  icon: "🔭",
  accent: "#74b3ff",
  blurb:
    "同じ努力でも、儲かりやすい業界と、儲かりにくい業界があります。その差を生む「5つの力」で戦場を読み、コスト・差別化・集中という3つの基本戦略から、進む道を選びます。",
  goals: [
    "業界の儲けやすさを決める5つの力を説明できる",
    "自分のお店・会社がどの力に弱いかを見立てられる",
    "3つの基本戦略（コスト・差別化・集中）を使い分けられる",
  ],
  minutes: 30,
  termKeys: ["industry-profitability", "five-forces", "cost-leadership", "differentiation", "focus"],
  termPreview: ["業界の収益性", "5つの競争要因", "コストリーダーシップ", "差別化", "集中"],
  status: "ready",
  scenes: [
    storyObservatory,
    explainIndustry,
    explainForces,
    storyPressure,
    explainApply,
    explainRespond,
    explainGeneric,
    explainStuck,
    termsScene,
    choiceScene,
    quizScene,
    summaryScene,
  ],
  clear: clearInfo,
};
