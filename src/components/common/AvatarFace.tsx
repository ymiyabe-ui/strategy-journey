import type { Mood } from "@/data/types";

const INK = "#2a2233";
const LIP = "#8a3b3b";

/** 目・眉・口を表情ごとに描き分ける（イラスト素材なしで表情を出す） */
export function AvatarFace({ mood, brow }: { mood: Mood; brow: string }) {
  const eyeY = 49;
  const arc = (cx: number) => `M${cx - 3.6} ${eyeY + 1} Q${cx} ${eyeY - 4} ${cx + 3.6} ${eyeY + 1}`;

  let eyes;
  if (mood === "smile" || mood === "proud") {
    eyes = (
      <g stroke={INK} strokeWidth={2.2} strokeLinecap="round" fill="none">
        <path d={arc(41)} />
        <path d={arc(59)} />
      </g>
    );
  } else if (mood === "surprise") {
    eyes = (
      <g>
        <ellipse cx={41} cy={eyeY} rx={3.2} ry={4.2} fill={INK} />
        <ellipse cx={59} cy={eyeY} rx={3.2} ry={4.2} fill={INK} />
        <circle cx={42} cy={eyeY - 1.4} r={1.1} fill="#fff" />
        <circle cx={60} cy={eyeY - 1.4} r={1.1} fill="#fff" />
      </g>
    );
  } else {
    const dx = mood === "think" ? 1.6 : 0;
    eyes = (
      <g>
        <ellipse cx={41 + dx} cy={eyeY} rx={2.4} ry={3.1} fill={INK} />
        <ellipse cx={59 + dx} cy={eyeY} rx={2.4} ry={3.1} fill={INK} />
        <circle cx={41.8 + dx} cy={eyeY - 1.1} r={0.9} fill="#fff" />
        <circle cx={59.8 + dx} cy={eyeY - 1.1} r={0.9} fill="#fff" />
      </g>
    );
  }

  const bp = { stroke: brow, strokeWidth: 2.2, strokeLinecap: "round" as const, fill: "none" };
  let brows;
  switch (mood) {
    case "smile":
    case "proud":
      brows = (
        <g {...bp}>
          <path d="M36 40 Q41 37.5 45.5 39.5" />
          <path d="M54.5 39.5 Q59 37.5 64 40" />
        </g>
      );
      break;
    case "think":
      brows = (
        <g {...bp}>
          <path d="M36 42 L45 41.5" />
          <path d="M54.5 38 Q59.5 35.5 64.5 38.5" />
        </g>
      );
      break;
    case "surprise":
      brows = (
        <g {...bp}>
          <path d="M36 37 Q41 34 45.5 36.5" />
          <path d="M54.5 36.5 Q59 34 64 37" />
        </g>
      );
      break;
    case "worry":
      brows = (
        <g {...bp}>
          <path d="M36 43 L45.5 39.5" />
          <path d="M54.5 39.5 L64 43" />
        </g>
      );
      break;
    default:
      brows = (
        <g {...bp}>
          <path d="M36 41 Q41 39 45.5 40.5" />
          <path d="M54.5 40.5 Q59 39 64 41" />
        </g>
      );
  }

  let mouth;
  switch (mood) {
    case "smile":
      mouth = <path d="M43.5 57 Q50 64 56.5 57" stroke={LIP} strokeWidth={2.2} strokeLinecap="round" fill="none" />;
      break;
    case "proud":
      mouth = <path d="M42.5 56 Q50 67 57.5 56 Z" fill="#fff" stroke={LIP} strokeWidth={1.8} strokeLinejoin="round" />;
      break;
    case "surprise":
      mouth = <ellipse cx={50} cy={60} rx={3} ry={4} fill="#7a2f3a" />;
      break;
    case "think":
      mouth = <path d="M46 60 L54 59" stroke={LIP} strokeWidth={2.2} strokeLinecap="round" />;
      break;
    case "worry":
      mouth = <path d="M45 61.5 Q50 57 55 61.5" stroke={LIP} strokeWidth={2.2} strokeLinecap="round" fill="none" />;
      break;
    default:
      mouth = <path d="M45 58 Q50 61 55 58" stroke={LIP} strokeWidth={2.2} strokeLinecap="round" fill="none" />;
  }

  return (
    <g>
      {(mood === "smile" || mood === "proud") && (
        <g fill="#ff8c7c" opacity={0.28}>
          <ellipse cx={35} cy={56} rx={4.5} ry={2.8} />
          <ellipse cx={65} cy={56} rx={4.5} ry={2.8} />
        </g>
      )}
      {brows}
      {eyes}
      {mouth}
    </g>
  );
}
