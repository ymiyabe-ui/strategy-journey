"use client";

import { motion } from "framer-motion";
import type { CalloutTone, Mood } from "@/data/types";
import { Avatar } from "@/components/common/Avatar";
import { Rich } from "@/lib/text";

const TONES: Record<CalloutTone, { icon: string; label: string; box: string; tag: string }> = {
  point: { icon: "💡", label: "ポイント", box: "border-lantern-500/60 bg-lantern-200/40", tag: "text-lantern-600" },
  why: { icon: "🔍", label: "なぜ？ ─ 本質", box: "border-sea-500/50 bg-sea-400/[0.12]", tag: "text-sea-600" },
  example: { icon: "🍵", label: "たとえば", box: "border-sky-500/50 bg-sky-400/[0.12]", tag: "text-sky-500" },
  warn: { icon: "⚠️", label: "ここに注意", box: "border-coral-500/50 bg-coral-400/[0.12]", tag: "text-coral-600" },
};

export function Callout({ tone, title, text }: { tone: CalloutTone; title: string; text: string }) {
  const t = TONES[tone];
  return (
    <div className={`rounded-2xl border-y border-r border-l-4 p-4 sm:p-5 ${t.box}`}>
      <p className={`flex items-center gap-1.5 text-[11.5px] font-bold tracking-[0.12em] ${t.tag}`}>
        <span aria-hidden>{t.icon}</span>
        {t.label}
      </p>
      <p className="mt-1 text-[15px] font-bold text-ink-900">{title}</p>
      <p className="mt-1.5 text-[14.5px] leading-[1.9] text-ink-800">
        <Rich text={text} />
      </p>
    </div>
  );
}

export function NanaSays({ text, mood }: { text: string; mood?: Mood }) {
  return (
    <div className="flex items-start gap-3">
      <Avatar who="nana" mood={mood} size={52} className="rounded-full ring-2 ring-coral-400/70" />
      <div className="relative rounded-2xl rounded-tl-md border border-coral-400/40 bg-coral-400/[0.13] px-4 py-3">
        <p className="mb-0.5 text-[11px] font-bold text-coral-600">ナナ先生</p>
        <p className="text-[14.5px] leading-[1.9] text-ink-900">
          <Rich text={text} />
        </p>
      </div>
    </div>
  );
}

export function ListBlock({
  style,
  title,
  items,
}: {
  style: "bullet" | "number" | "check";
  title?: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white/55 p-4 sm:p-5">
      {title && <p className="mb-2.5 text-[14px] font-bold text-ink-900">{title}</p>}
      <ul className="space-y-2.5 p-0">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[14.5px] leading-[1.85] text-ink-800">
            <span
              aria-hidden
              className="mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lantern-400 text-[12px] font-extrabold text-ink-900"
            >
              {style === "number" ? i + 1 : style === "check" ? "✓" : "•"}
            </span>
            <span>
              <Rich text={item} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Formula({
  parts,
  ops,
  caption,
}: {
  parts: { label: string; sub?: string }[];
  ops: string[];
  caption?: string;
}) {
  return (
    <div className="rounded-2xl border border-lantern-500/50 bg-gradient-to-b from-lantern-200/55 to-paper-100 p-4 text-center sm:p-5">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {parts.map((p, i) => (
          <div key={i} className="contents">
            {i > 0 && (
              <span aria-hidden className="font-display text-2xl font-extrabold text-lantern-600">
                {ops[i - 1]}
              </span>
            )}
            <motion.div
              className={`rounded-xl px-4 py-2.5 ${
                i === parts.length - 1 ? "bg-ink-900 text-lantern-300 shadow-glow-sm" : "bg-white text-ink-900 shadow-sm"
              }`}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.18, type: "spring", stiffness: 260, damping: 18 }}
            >
              <p className="font-display text-xl font-extrabold leading-tight">{p.label}</p>
              {p.sub && <p className="text-[11px] font-bold opacity-70">{p.sub}</p>}
            </motion.div>
          </div>
        ))}
      </div>
      {caption && <p className="mt-3 text-[12.5px] font-bold text-ink-600">{caption}</p>}
    </div>
  );
}
