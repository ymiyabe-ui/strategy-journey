import type { Stage } from "@/data/types";
import { storyMapRoom, storyHidamari2 } from "./story";
import { explainElephant, explainMap } from "./explain-a";
import { explainDeliberate, explainPick } from "./explain-b";
import { explainPositioning, explainUse } from "./explain-c";
import { termsScene } from "./terms";
import { choiceScene } from "./practice";
import { quizScene } from "./quiz";
import { summaryScene, clearInfo } from "./finish";

/**
 * 第2章「戦略の地図」── 戦略サファリ的全体像
 * 第1章の物語・ひだまり亭を引き継ぎ、ここから専門用語を出す。
 * 用語は出した場でかみ砕き、第1章の用語（戦略ストーリー・因果論理）を再利用する。
 */
export const stage2: Stage = {
  id: 2,
  title: "戦略の地図",
  subtitle: "戦略サファリ的全体像",
  theme: "戦略の流派を見渡す（戦略サファリ）",
  icon: "🗺️",
  accent: "#3cc9b6",
  blurb:
    "「戦略」と一口に言っても、考え方はひとつではありません。計画を重んじる流派、現場から生まれる流派、市場での位置どりを重んじる流派…。六人の盲人と象の話から出発して、それぞれの特徴を一枚の地図にし、いま自分が立っている場所を知ります。",
  goals: [
    "戦略の考え方に複数の「流派」があることを、象のたとえで説明できる",
    "「計画的戦略」と「創発的戦略」の違いと、両方が必要な理由が言える",
    "環境・情報・現場の知恵の3つの問いで、場面に合う見方を選べる",
  ],
  minutes: 28,
  termKeys: ["strategy-safari", "deliberate", "emergent", "positioning-school"],
  termPreview: ["戦略サファリ", "計画的戦略", "創発的戦略", "ポジショニング派"],
  status: "ready",
  scenes: [
    storyMapRoom,
    explainElephant,
    explainMap,
    storyHidamari2,
    explainDeliberate,
    explainPick,
    explainPositioning,
    explainUse,
    termsScene,
    choiceScene,
    quizScene,
    summaryScene,
  ],
  clear: clearInfo,
};
