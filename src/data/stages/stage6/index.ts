import type { Stage } from "@/data/types";
import { storyJourney, storySticky, storyMany } from "./story";
import { explainProcess, explainSwot } from "./explain-a";
import { explainCross, explainStory } from "./explain-b";
import { explainReview } from "./explain-c";
import { termsScene } from "./terms";
import { choiceScene } from "./practice";
import { quizScene } from "./quiz";
import { summaryScene, clearInfo } from "./finish";

/**
 * 第6章「戦略を組み立てる」── 戦略策定のプロセス
 * 第3〜5章の結果（ポジション・戦場・武器）を、環境分析（SWOT）で一枚にまとめ、
 * 選択肢づくり → 選ぶ → 実行 → 見直し、そして第1章の戦略ストーリーに束ねて戻る。
 */
export const stage6: Stage = {
  id: 6,
  title: "戦略を組み立てる",
  subtitle: "策定プロセス",
  theme: "戦略策定のプロセス",
  icon: "🧩",
  accent: "#8bd86a",
  blurb:
    "ここまでの視点を、一本の筋にまとめ上げる章です。ありたい姿から、分析、選択肢づくり、選ぶ、実行、見直しまで。外（第4章）と内（第5章）をSWOTで一枚にし、最後は第1章の「物語」に戻って、自分の手で戦略ストーリーを組み立てます。",
  goals: [
    "戦略策定の流れ（ありたい姿→分析→選択肢→選ぶ→実行→見直し）を説明できる",
    "五つの力・VRIO・ポジショニングを、順番に使い分けられる",
    "分析の結果を、「だから」でつながる一本の物語にまとめられる",
  ],
  minutes: 32,
  termKeys: ["strategy-process", "environment-analysis", "swot", "vision", "strategy-story"],
  termPreview: ["戦略策定プロセス", "環境分析", "SWOT分析", "ビジョン", "戦略ストーリー（再訪）"],
  status: "ready",
  scenes: [
    storyJourney,
    explainProcess,
    explainSwot,
    storySticky,
    explainCross,
    storyMany,
    explainStory,
    explainReview,
    termsScene,
    choiceScene,
    quizScene,
    summaryScene,
  ],
  clear: clearInfo,
};
