import type { Scene } from "@/data/types";

export type PhaseId = "intro" | "core" | "terms" | "practice" | "quiz" | "summary";

export const PHASES: { id: PhaseId; label: string; emoji: string; desc: string }[] = [
  { id: "intro", label: "導入", emoji: "📖", desc: "状況設定とナナ先生との会話" },
  { id: "core", label: "解説", emoji: "💡", desc: "核心を、たとえ話と具体例で" },
  { id: "terms", label: "用語", emoji: "🔖", desc: "名前をつけて、頭の中を整理" },
  { id: "practice", label: "実践", emoji: "🧭", desc: "選んで、分岐の結果を確かめる" },
  { id: "quiz", label: "確認", emoji: "✅", desc: "解説つきの確認クイズ" },
  { id: "summary", label: "まとめ", emoji: "📝", desc: "重要ポイントを一枚に" },
];

export function phaseOf(scene: Scene): PhaseId {
  switch (scene.kind) {
    case "story":
      return "intro";
    case "explain":
      return "core";
    case "terms":
      return "terms";
    case "choice":
      return "practice";
    case "quiz":
      return "quiz";
    case "summary":
      return "summary";
  }
}
