import type { Stage } from "@/data/types";
import { storyKitchen, storyOven } from "./story";
import { explainRbv, explainInventory } from "./explain-a";
import { explainVrio, explainApply } from "./explain-b";
import { explainInimitable, explainCore } from "./explain-c";
import { termsScene } from "./terms";
import { choiceScene } from "./practice";
import { quizScene } from "./quiz";
import { summaryScene, clearInfo } from "./finish";

/**
 * 第5章「自分の武器を知る」── リソース・ベースド・ビューとVRIO
 * 第3・4章の「外から見る」に対して、「内から見る」を扱う。
 * 第1章の「大将の煮物と焼き魚＝違いの種」から入り、第3・4章の用語を再利用する。
 */
export const stage5: Stage = {
  id: 5,
  title: "自分の武器を知る",
  subtitle: "リソース・ベースド・ビューとVRIO",
  theme: "経営資源に基づく戦略（RBV）とVRIO分析",
  icon: "🗡️",
  accent: "#a58bff",
  blurb:
    "外の環境だけでなく、内側にある「自分の武器」から戦略を考える方法です。持っている資源のうち、何が本当に競争優位になるのかを、VRIOの4つの問いで見極めます。",
  goals: [
    "自社の経営資源（強み）を棚卸しできる",
    "VRIOの4つの問いで、強みが競争優位になるか判定できる",
    "外から見る視点（第3・4章）と内から見る視点を組み合わせられる",
  ],
  minutes: 28,
  termKeys: ["rbv", "resources", "vrio", "inimitability", "core-competence"],
  termPreview: ["リソース・ベースド・ビュー", "経営資源", "VRIO", "模倣困難性", "コアコンピタンス"],
  status: "ready",
  scenes: [
    storyKitchen,
    explainRbv,
    explainInventory,
    storyOven,
    explainVrio,
    explainApply,
    explainInimitable,
    explainCore,
    termsScene,
    choiceScene,
    quizScene,
    summaryScene,
  ],
  clear: clearInfo,
};
