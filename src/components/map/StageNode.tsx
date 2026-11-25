"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Stars } from "@/components/common/Stars";
import { nodeCenter } from "./geometry";

export type NodeState = "cleared" | "current" | "soon" | "locked";

interface Props {
  index: number;
  chapter: string;
  title: string;
  subtitle: string;
  icon: string;
  accent: string;
  state: NodeState;
  stars: number;
  href: string;
  onLockedTap: () => void;
}

const SIZE = 84;

/** マップ上の1つの島（ステージ）。状態で見た目と操作が変わる */
export function StageNode({ index, chapter, title, subtitle, icon, accent, state, stars, href, onLockedTap }: Props) {
  const { x, y } = nodeCenter(index);
  const locked = state === "locked";
  const right = x > 50; // 右寄りの島はラベルを左に出す
  const center = x === 50;

  const circle = (
    <motion.span
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: SIZE,
        height: SIZE,
        background: locked
          ? "radial-gradient(circle at 35% 30%, #2a3358, #131a34)"
          : `radial-gradient(circle at 35% 30%, ${accent}, #17224d 78%)`,
        border: `3px solid ${locked ? "rgba(255,255,255,0.18)" : state === "cleared" ? "#ffc247" : accent}`,
        boxShadow: locked
          ? "none"
          : state === "current"
            ? `0 0 0 6px ${accent}33, 0 0 34px ${accent}aa`
            : `0 0 22px ${accent}66`,
      }}
      whileHover={locked ? undefined : { scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
    >
      {state === "current" && (
        <>
          <span className="absolute inset-0 animate-pulseRing rounded-full border-2" style={{ borderColor: accent }} />
          <span
            className="absolute inset-0 animate-pulseRing rounded-full border-2"
            style={{ borderColor: accent, animationDelay: "1.1s" }}
          />
        </>
      )}
      <span className={`text-[38px] leading-none ${locked ? "opacity-30 grayscale" : ""}`} aria-hidden>
        {icon}
      </span>
      <span
        className="absolute -left-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-night-900 text-[12px] font-extrabold text-ink-900"
        style={{ background: locked ? "#8e94b0" : accent }}
        aria-hidden
      >
        {chapter.replace(/\D/g, "") || "★"}
      </span>
      {state === "cleared" && (
        <span
          className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-night-900 bg-sea-400 text-[14px] font-extrabold text-night-950"
          aria-hidden
        >
          ✓
        </span>
      )}
      {locked && (
        <span className="absolute inset-0 flex items-center justify-center text-2xl" aria-hidden>
          🔒
        </span>
      )}
    </motion.span>
  );

  const label = (
    <div className={`${center ? "text-center" : right ? "text-right" : "text-left"}`}>
      <p className="text-[11px] font-extrabold tracking-[0.18em]" style={{ color: locked ? "#8e94b0" : accent }}>
        {chapter}
      </p>
      <p className={`font-display text-[18px] font-extrabold leading-snug ${locked ? "text-paper-300/50" : "text-paper-50"}`}>
        {title}
      </p>
      <p className={`mt-0.5 text-[12px] leading-snug ${locked ? "text-paper-300/40" : "text-paper-300/85"}`}>{subtitle}</p>
      <div className={`mt-1.5 flex ${center ? "justify-center" : right ? "justify-end" : "justify-start"}`}>
        {state === "cleared" && <Stars value={stars} size={16} />}
        {state === "current" && (
          <span className="rounded-full bg-lantern-400 px-2.5 py-0.5 text-[11px] font-extrabold text-ink-900 shadow-glow-sm">
            いまここ ›
          </span>
        )}
        {state === "soon" && (
          <span className="rounded-full border border-white/25 px-2.5 py-0.5 text-[11px] font-bold text-paper-200">
            近日公開
          </span>
        )}
        {locked && <span className="text-[11px] font-bold text-paper-300/45">前の章をクリアで開く</span>}
      </div>
    </div>
  );

  const wrapCircle = locked ? (
    <button type="button" onClick={onLockedTap} aria-label={`${title}（まだ開いていません）`} className="block rounded-full">
      {circle}
    </button>
  ) : (
    <Link href={href} aria-label={`${chapter} ${title}`} className="block rounded-full">
      {circle}
    </Link>
  );

  return (
    <motion.div
      className="absolute left-0 w-full"
      style={{ top: y, height: 0 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.09, duration: 0.5 }}
    >
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%` }}>
        {wrapCircle}
      </div>
      {center ? (
        <div className="absolute left-1/2 w-[80%] -translate-x-1/2" style={{ top: SIZE / 2 + 12 }}>
          {locked ? label : <Link href={href}>{label}</Link>}
        </div>
      ) : (
        <div
          className="absolute -translate-y-1/2"
          style={
            right
              ? { left: 4, right: `calc(${100 - x}% + ${SIZE / 2 + 12}px)` }
              : { right: 4, left: `calc(${x}% + ${SIZE / 2 + 12}px)` }
          }
        >
          {locked ? (
            <button type="button" onClick={onLockedTap} className="block w-full">
              {label}
            </button>
          ) : (
            <Link href={href} className="block">
              {label}
            </Link>
          )}
        </div>
      )}
    </motion.div>
  );
}
