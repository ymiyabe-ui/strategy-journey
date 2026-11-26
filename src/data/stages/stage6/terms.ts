import type { TermsScene } from "@/data/types";

/** 用語：旅の計画のたとえで掴んだことに、名前をつける（戦略ストーリーは第1章の再訪） */
export const termsScene: TermsScene = {
  kind: "terms",
  id: "s6-terms",
  title: "ここまでの話に、名前をつけよう",
  intro: [
    {
      who: "nana",
      mood: "smile",
      text: "旅の計画のたとえで話してきたことにも、ちゃんと名前があるの。今日は、新しく四つ。そして、第1章の言葉に、もう一度会ってもらうわ。",
    },
    {
      who: "nana",
      text: "「環境分析」と「SWOT」は、第4章・第5章の結果を一枚にまとめる道具。「ビジョン」は旅の行き先。そして「戦略策定プロセス」は、旅の順番そのものよ。",
    },
    { who: "you", mood: "smile", text: "最後の「戦略ストーリー」は、第1章で出会った言葉ですよね。ここで、もう一度会えるんですね。" },
  ],
  terms: ["strategy-process", "environment-analysis", "swot", "vision", "strategy-story"],
};
