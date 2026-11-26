import type { Stage } from "@/data/types";
import { storyLighthouse, storyShop } from "./story";
import { explainLadder, explainCase, explainSpeech } from "./explain";
import { choiceScene } from "./practice";
import { quizScene } from "./quiz";
import { summaryScene, clearInfo } from "./finish";

/**
 * 最終総合ステージ「灯台の町の最終試験」── 六つの視点の総合ケース。
 * 第6章の戦略を実行して三か月後のひだまり亭を、外 → 内 → やること → 物語の順に診て、立て直す。
 * 新しい用語は出さず、第1〜6章の視点を使い切る。再生・クリアの画面は章と同じものを使う（final: true で表記だけ変わる）。
 */
export const stageFinal: Stage = {
  id: 7,
  final: true,
  title: "灯台の町の最終試験",
  subtitle: "六つの視点の総合ケース",
  theme: "戦略の総合（六つの視点の使い分け）",
  icon: "🌅",
  accent: "#ffd67c",
  blurb:
    "ここまでに手に入れた六つの視点を、ひとつのケースにすべて使います。第6章の戦略を実行して三か月後の「ひだまり亭」に、もう一度。外を診て、内を診て、立て直しの物語を組み立て、最後は、自分の言葉で語ります。",
  goals: [
    "六つの視点を、一つのケースで順番に使い分ける",
    "分析の結果を、「だから」でつながる一本の物語にまとめる",
    "自分の言葉で、戦略ストーリーを3分で説明する",
  ],
  minutes: 28,
  termKeys: [],
  termPreview: [],
  status: "ready",
  scenes: [storyLighthouse, storyShop, explainLadder, explainCase, choiceScene, explainSpeech, quizScene, summaryScene],
  clear: clearInfo,
};
