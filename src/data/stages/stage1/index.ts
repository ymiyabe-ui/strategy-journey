import type { Stage } from "@/data/types";
import { storyOffice, storyHidamari, storySakura } from "./story";
import { explainTrip, explainSakura, explainWall } from "./explain-a";
import { explainImitate, explainWhy } from "./explain-b";
import { termsScene, choiceScene } from "./practice";
import { quizScene } from "./quiz";
import { summaryScene, clearInfo } from "./finish";

/**
 * 第1章「物語の力」── ストーリーとしての競争戦略
 * 序盤なので、専門用語は終盤の「用語」の場面まで出さない。日常のたとえだけで核心まで進む。
 */
export const stage1: Stage = {
  id: 1,
  title: "物語の力",
  subtitle: "ストーリーとしての競争戦略",
  theme: "ストーリーとしての競争戦略",
  icon: "📖",
  accent: "#ffc247",
  blurb:
    "入社初日。最初の依頼主は、お客さんが減り続ける商店街の定食屋。行列のできるお店と、何でもやっているのに空席のお店。その差を生んでいる「見えない筋」を、日常のたとえ話だけで解き明かします。",
  goals: [
    "戦略が「やることリスト」ではなく「つながった物語」だと、自分の言葉で説明できる",
    "打ち手の「つながり」が、なぜ真似されにくさ（長く続く強さ）を生むのかが言える",
    "「競争優位」「戦略ストーリー」「因果論理」の3つの言葉を、日常の例えで説明できる",
  ],
  minutes: 25,
  termKeys: ["kyoso-yui", "strategy-story", "inga-ronri"],
  termPreview: ["競争優位", "戦略ストーリー", "因果論理"],
  status: "ready",
  scenes: [
    storyOffice,
    storyHidamari,
    storySakura,
    explainTrip,
    explainSakura,
    explainWall,
    explainImitate,
    explainWhy,
    termsScene,
    choiceScene,
    quizScene,
    summaryScene,
  ],
  clear: clearInfo,
};
