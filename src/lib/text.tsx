"use client";

import { Fragment, type ReactNode } from "react";
import { useProgress } from "@/lib/progress";
import { TermChip } from "@/components/common/TermChip";
import { getTerm } from "@/data/glossary";

/** {name} {san} を差し込む。名前が空なら「あなた」 */
export function fillName(text: string, name: string): string {
  const n = name.trim();
  return text.replaceAll("{name}", n || "あなた").replaceAll("{san}", n ? `${n}さん` : "あなた");
}

/** マークアップを外した素の文字列にする（ボタンの中など、チップを置けない場所で使う） */
export function stripMarkup(text: string): string {
  return text
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, key: string, label?: string) => label ?? getTerm(key)?.term ?? key)
    .replaceAll("**", "");
}

const TOKEN = /(\*\*[^*]+\*\*|\[\[[^\]]+\]\]|\n)/g;

/**
 * 本文の簡易マークアップを描画する。
 *  **強調**        … マーカー風の強調
 *  [[key]]         … 用語チップ（タップでその場で解説）
 *  [[key|表示]]    … 表示文字を変えた用語チップ
 *  {name} / {san}  … プレイヤー名
 */
export function Rich({ text, className }: { text: string; className?: string }) {
  const { state } = useProgress();
  const filled = fillName(text, state.playerName);
  const parts = filled.split(TOKEN).filter((p) => p !== "");

  const nodes: ReactNode[] = parts.map((part, i) => {
    if (part === "\n") return <br key={i} />;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="mark-lantern font-bold text-inherit">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("[[") && part.endsWith("]]")) {
      const [key, label] = part.slice(2, -2).split("|");
      return <TermChip key={i} termKey={key} label={label} />;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });

  return <span className={className}>{nodes}</span>;
}
