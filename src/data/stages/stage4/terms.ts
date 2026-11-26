import type { TermsScene } from "@/data/types";

/** 用語：今日出てきた言葉のうち、大事な5つに名前をつける */
export const termsScene: TermsScene = {
  kind: "terms",
  id: "s4-terms",
  title: "戦場に、名前をつけよう",
  intro: [
    {
      who: "nana",
      mood: "smile",
      text: "今日の旅で、名前のついた言葉が、いくつも出てきたわね。大事な5つを、カードで確かめましょう。",
    },
    { who: "you", mood: "think", text: "「5つの競争要因」と「業界の収益性」は、かき氷屋さんの話に戻れば思い出せそうです。" },
    {
      who: "nana",
      mood: "proud",
      text: "その調子。「コストリーダーシップ」「差別化」「集中」は、まんぷく弁当とひだまり亭を並べて覚えると、頭に入りやすいわよ。第3章の「トレードオフ」も、いっしょに思い出してね。",
    },
  ],
  terms: ["industry-profitability", "five-forces", "cost-leadership", "differentiation", "focus"],
};
