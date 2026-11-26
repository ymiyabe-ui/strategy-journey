import type { TermsScene } from "@/data/types";

/** 用語：今日出てきた言葉のうち、大事な5つに名前をつける */
export const termsScene: TermsScene = {
  kind: "terms",
  id: "s5-terms",
  title: "武器に、名前をつけよう",
  intro: [
    {
      who: "nana",
      mood: "smile",
      text: "今日の旅で、名前のついた言葉が出てきたわね。大事な5つを、カードで確かめましょう。",
    },
    { who: "you", mood: "think", text: "「VRIO」は、4つの問いの頭文字でしたよね。V・R・I・O…順番に言えます！" },
    {
      who: "nana",
      mood: "proud",
      text: "上出来。「経営資源」は、ひだまり亭の棚卸しに戻ると思い出せるわ。第3章の「活動システム」や、第4章の「差別化」「集中」と、つなげて覚えてみてね。",
    },
  ],
  terms: ["rbv", "resources", "vrio", "inimitability", "core-competence"],
};
