import type { TermsScene } from "@/data/types";

/** 用語：今日出てきた言葉のうち、大事な4つに名前をつける */
export const termsScene: TermsScene = {
  kind: "terms",
  id: "s3-terms",
  title: "立ち位置に、名前をつけよう",
  intro: [
    {
      who: "nana",
      mood: "smile",
      text: "今日の旅で、名前のついた言葉が出てきたわね。大事な4つを、カードで確かめましょう。",
    },
    { who: "you", mood: "think", text: "「業務効率」と「トレードオフ」は、ひだまり亭の出来事で思い出せそうです。" },
    {
      who: "nana",
      mood: "proud",
      text: "その調子。「ポジショニング」と「活動システム」も、さっきの輪の図に戻れば、ちゃんと思い出せるわ。第1章の「戦略ストーリー」と、つなげて覚えてみてね。",
    },
  ],
  terms: ["operational-effectiveness", "positioning", "trade-off", "activity-system"],
};
