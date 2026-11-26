import type { Stage } from "@/data/types";
import { storyNotice, storyHidamari3 } from "./story";
import { explainEffectiveness, explainPosition } from "./explain-a";
import { explainTradeoff, explainFit } from "./explain-b";
import { explainWheels, explainLink } from "./explain-c";
import { termsScene } from "./terms";
import { choiceScene } from "./practice";
import { quizScene } from "./quiz";
import { summaryScene, clearInfo } from "./finish";

/**
 * 第3章「ポジションを取る」── ポーターのポジショニング
 * 第1章の「やらないことも物語の一部」と、第2章の「ポジショニング派」を受けて深掘りする。
 * 用語は日常のたとえ（マラソン・ひだまり亭の煮物）から入り、第1・2章の言葉を再利用する。
 */
export const stage3: Stage = {
  id: 3,
  title: "ポジションを取る",
  subtitle: "ポーターのポジショニング",
  theme: "ポジショニングとトレードオフ",
  icon: "📍",
  accent: "#ff8c7c",
  blurb:
    "戦略とは、「何をやるか」と同じくらい「何をやらないか」を決めること。第1章の「物語」に戻って、他社と違う立ち位置を取る意味と、そこに宿る真似されにくさを掘り下げます。",
  goals: [
    "「業務の効率化」と「戦略」の違いを説明できる",
    "トレードオフ（やらないこと）が競争優位を守る理由が言える",
    "活動のつながり（フィット）で、真似されにくさをつくれる",
  ],
  minutes: 28,
  termKeys: ["operational-effectiveness", "positioning", "trade-off", "activity-system"],
  termPreview: ["業務効率", "ポジショニング", "トレードオフ", "活動システム"],
  status: "ready",
  scenes: [
    storyNotice,
    explainEffectiveness,
    explainPosition,
    storyHidamari3,
    explainTradeoff,
    explainFit,
    explainWheels,
    explainLink,
    termsScene,
    choiceScene,
    quizScene,
    summaryScene,
  ],
  clear: clearInfo,
};
