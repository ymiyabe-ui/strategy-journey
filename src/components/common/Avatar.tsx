import { useId } from "react";
import type { CharacterId, Mood } from "@/data/types";
import { AvatarFace } from "./AvatarFace";

interface AvatarProps {
  who: Exclude<CharacterId, "narrator">;
  mood?: Mood;
  size?: number;
  className?: string;
}

const SKIN: Record<AvatarProps["who"], string> = {
  nana: "#f7d6bd",
  you: "#f4d0b2",
  taisho: "#e4b088",
};

const BG: Record<AvatarProps["who"], [string, string]> = {
  nana: ["#ffe1d8", "#ff9d8d"],
  you: ["#d3e9ff", "#74b3ff"],
  taisho: ["#fff0c9", "#ffc247"],
};

const LABEL: Record<AvatarProps["who"], string> = { nana: "ナナ先生", you: "あなた", taisho: "大将" };

export function Avatar({ who, mood = "normal", size = 56, className }: AvatarProps) {
  const uid = useId().replace(/:/g, "");
  const skin = SKIN[who];
  const [bg1, bg2] = BG[who];

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`shrink-0 ${className ?? ""}`}
      role="img"
      aria-label={LABEL[who]}
    >
      <defs>
        <clipPath id={`clip-${uid}`}>
          <circle cx={50} cy={50} r={50} />
        </clipPath>
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={bg1} />
          <stop offset="1" stopColor={bg2} />
        </linearGradient>
      </defs>

      <g clipPath={`url(#clip-${uid})`}>
        <rect width={100} height={100} fill={`url(#bg-${uid})`} />

        {/* ナナ先生：コーラルのジャケット・丸メガネ・ボブ */}
        {who === "nana" && (
          <g>
            <path
              d="M24 46 C22 22 38 13 50 13 C64 13 78 22 76 46 L78 68 C71 70 66 63 65 54 L35 54 C34 63 29 70 22 68 Z"
              fill="#4a2f45"
            />
            <path d="M10 100 Q12 74 50 71 Q88 74 90 100 Z" fill="#f2695a" />
            <path d="M38 71 L50 86 L62 71 Z" fill="#fffbf1" />
            <rect x={44} y={60} width={12} height={14} rx={4} fill="#e9b99c" />
            <ellipse cx={50} cy={46} rx={22} ry={25} fill={skin} />
            <ellipse cx={28.5} cy={49} rx={3} ry={5} fill={skin} />
            <ellipse cx={71.5} cy={49} rx={3} ry={5} fill={skin} />
            <path
              d="M27 45 C27 26 40 18 52 19 C66 20 74 30 73 45 C67 36 58 31 47 31 C38 31 32 36 27 45 Z"
              fill="#4a2f45"
            />
            <AvatarFace mood={mood} brow="#3a2538" />
            <g fill="none" stroke="#c2557a" strokeWidth={1.8}>
              <circle cx={41} cy={49} r={7.4} />
              <circle cx={59} cy={49} r={7.4} />
              <path d="M48.4 48.5 L51.6 48.5" />
            </g>
          </g>
        )}

        {/* あなた：紺のスーツ・金色のネクタイ・短い髪 */}
        {who === "you" && (
          <g>
            <path d="M10 100 Q12 74 50 71 Q88 74 90 100 Z" fill="#223270" />
            <path d="M40 71 L50 84 L60 71 Z" fill="#fffbf1" />
            <path d="M47.5 74 L52.5 74 L54.5 90 L50 95 L45.5 90 Z" fill="#ffc247" />
            <rect x={44} y={60} width={12} height={14} rx={4} fill="#e6b999" />
            <ellipse cx={50} cy={46} rx={22} ry={25} fill={skin} />
            <ellipse cx={28.5} cy={49} rx={3} ry={5} fill={skin} />
            <ellipse cx={71.5} cy={49} rx={3} ry={5} fill={skin} />
            <path
              d="M27 46 C24 24 40 15 52 16 C68 17 77 29 73 47 C69 38 63 31 50 31 C40 31 33 37 27 46 Z"
              fill="#2a2233"
            />
            <AvatarFace mood={mood} brow="#2a2233" />
          </g>
        )}

        {/* 大将：ねじり鉢巻・白い割烹着 */}
        {who === "taisho" && (
          <g>
            <path d="M10 100 Q12 74 50 71 Q88 74 90 100 Z" fill="#fbf4e2" />
            <path d="M36 72 L40 100 L60 100 L64 72 Q50 78 36 72 Z" fill="#2e4390" opacity={0.9} />
            <rect x={44} y={60} width={12} height={14} rx={4} fill="#cf9a72" />
            <ellipse cx={50} cy={46} rx={22.5} ry={25} fill={skin} />
            <ellipse cx={28} cy={49} rx={3} ry={5} fill={skin} />
            <ellipse cx={72} cy={49} rx={3} ry={5} fill={skin} />
            <path
              d="M27.5 36 Q50 24 72.5 36 L72.5 42.5 Q50 31 27.5 42.5 Z"
              fill="#fffbf1"
              stroke="#d9cfb2"
              strokeWidth={0.8}
            />
            <circle cx={72} cy={39} r={3.4} fill="#fffbf1" stroke="#d9cfb2" strokeWidth={0.8} />
            <AvatarFace mood={mood} brow="#6a6672" />
          </g>
        )}
      </g>
    </svg>
  );
}
