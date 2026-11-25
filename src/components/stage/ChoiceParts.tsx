"use client";

import { motion } from "framer-motion";
import type { ChoiceOption } from "@/data/types";
import { Avatar } from "@/components/common/Avatar";
import { Rich } from "@/lib/text";

interface OptionCardProps {
  option: ChoiceOption;
  letter: string;
  selected: boolean;
  dimmed: boolean;
  disabled: boolean;
  onPick: () => void;
}

/** 選択肢カード。選んだものは強調、選ばなかったものは少し沈める */
export function OptionCard({ option, letter, selected, dimmed, disabled, onPick }: OptionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onPick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      animate={{ opacity: dimmed ? 0.5 : 1 }}
      className={`flex w-full items-start gap-3 rounded-2xl border-2 p-3.5 text-left transition-colors sm:p-4 ${
        selected
          ? "border-lantern-500 bg-lantern-200/70 shadow-glow-sm"
          : "border-ink-900/10 bg-white/70 hover:border-lantern-500/60 hover:bg-white"
      } ${disabled && !selected ? "cursor-default" : ""}`}
    >
      <span
        aria-hidden
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold ${
          selected ? "bg-lantern-500 text-ink-900" : "bg-paper-200 text-ink-700"
        }`}
      >
        {letter}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start gap-2.5 text-[15px] font-bold leading-[1.7] text-ink-900">
          <span aria-hidden className="w-7 shrink-0 text-center text-xl leading-[1.5]">
            {option.emoji}
          </span>
          <span>{option.label}</span>
        </span>
        {option.detail && <span className="mt-1 block text-[13px] leading-[1.7] text-ink-600">{option.detail}</span>}
      </span>
    </motion.button>
  );
}

interface ReactionProps {
  badge: { text: string; tone: "good" | "ok" | "bad" };
  text: string;
}

const BADGE: Record<ReactionProps["badge"]["tone"], string> = {
  good: "bg-sea-500/15 text-sea-600 border-sea-500/40",
  ok: "bg-lantern-400/25 text-ink-700 border-lantern-500/50",
  bad: "bg-coral-500/15 text-coral-600 border-coral-500/40",
};

/** 選んだあとの、ナナ先生の反応（分岐のフィードバック） */
export function Reaction({ badge, text }: ReactionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="mt-5"
    >
      <span className={`inline-flex rounded-full border px-3 py-1 text-[12.5px] font-extrabold ${BADGE[badge.tone]}`}>
        {badge.text}
      </span>
      <div className="mt-3 flex items-start gap-3">
        <Avatar
          who="nana"
          mood={badge.tone === "good" ? "smile" : badge.tone === "bad" ? "think" : "normal"}
          size={48}
          className="rounded-full ring-2 ring-coral-400/70"
        />
        <div className="rounded-2xl rounded-tl-md border border-coral-400/40 bg-coral-400/[0.13] px-4 py-3">
          <p className="mb-0.5 text-[11px] font-bold text-coral-600">ナナ先生</p>
          <p className="text-[14.5px] leading-[1.9] text-ink-900">
            <Rich text={text} />
          </p>
        </div>
      </div>
    </motion.div>
  );
}
