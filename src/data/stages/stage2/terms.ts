import type { TermsScene } from "@/data/types";

/** 用語：今日出てきた言葉のうち、大事な4つに名前をつける */
export const termsScene: TermsScene = {
  kind: "terms",
  id: "s2-terms",
  title: "地図に、名前をつけよう",
  intro: [
    {
      who: "nana",
      mood: "smile",
      text: "今日の旅で、名前のついた言葉がいくつか出てきたわよね。その中から、大事な4つを、カードで確かめましょう。",
    },
    { who: "you", mood: "worry", text: "覚えられるか、ちょっと不安です…。" },
    {
      who: "nana",
      mood: "smile",
      text: "大丈夫。どれも、さっきのたとえ話——象、レシピ、空き店舗——に、ちゃんと戻れるから。",
    },
  ],
  terms: ["strategy-safari", "deliberate", "emergent", "positioning-school"],
};
