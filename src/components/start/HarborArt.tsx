function HarborSvg({ uid, viewBox, className }: { uid: string; viewBox: string; className: string }) {
  return (
    <svg
      aria-hidden
      viewBox={viewBox}
      preserveAspectRatio="xMidYMax meet"
      className={className}
    >
      <defs>
        <linearGradient id={`${uid}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12204a" />
          <stop offset="1" stopColor="#060a17" />
        </linearGradient>
        <linearGradient id={`${uid}-beam`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffd67c" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffd67c" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 灯台の光 */}
      <polygon points="610,58 800,6 800,92" fill={`url(#${uid}-beam)`} className="animate-beam" />

      {/* 遠い山並み */}
      <path d="M0 150 L70 118 L140 146 L220 108 L300 144 L380 122 L460 150 L800 150 L800 220 L0 220 Z" fill="#0d1737" />

      {/* 灯台 */}
      <g transform="translate(596 52)">
        <path d="M6 20 L26 20 L30 96 L2 96 Z" fill="#e9e1cd" />
        <path d="M5 40 L27 40 L28 50 L4 50 Z" fill="#c8423a" />
        <path d="M4 68 L28 68 L29 78 L3 78 Z" fill="#c8423a" />
        <rect x={6} y={8} width={20} height={12} fill="#ffd67c" />
        <path d="M4 8 L16 -4 L28 8 Z" fill="#2a2739" />
        <circle cx={16} cy={14} r={9} fill="#ffd67c" opacity={0.35} className="animate-pulse" />
      </g>

      {/* 高台と港の家並み */}
      <path d="M470 160 Q560 120 640 140 L800 150 L800 220 L470 220 Z" fill="#0a122b" />
      <g fill="#0a122b">
        <rect x={40} y={140} width={38} height={30} />
        <path d="M34 140 L59 122 L84 140 Z" />
        <rect x={96} y={148} width={30} height={24} />
        <path d="M92 148 L111 134 L130 148 Z" />
        <rect x={146} y={136} width={44} height={36} />
        <path d="M140 136 L168 116 L196 136 Z" />
      </g>
      <g fill="#ffd67c" opacity={0.8}>
        <rect x={52} y={150} width={7} height={8} />
        <rect x={104} y={156} width={6} height={7} />
        <rect x={158} y={148} width={7} height={8} />
        <rect x={172} y={148} width={7} height={8} />
      </g>

      {/* 海 */}
      <rect x={0} y={168} width={800} height={52} fill={`url(#${uid}-sea)`} />
      <g stroke="#ffd67c" strokeOpacity={0.25} strokeWidth={1.5} strokeLinecap="round">
        <path d="M580 182 h40 M600 192 h60 M560 202 h90" />
      </g>
      <g stroke="#79a8ff" strokeOpacity={0.22} strokeWidth={1.5} strokeLinecap="round">
        <path d="M60 184 h50 M240 192 h70 M360 180 h40 M120 204 h80 M300 208 h50" />
      </g>

      {/* 小さな船 */}
      <g transform="translate(380 168)">
        <path d="M0 10 L44 10 L36 20 L8 20 Z" fill="#1a2552" />
        <path d="M22 -14 L22 10" stroke="#e9e1cd" strokeWidth={1.8} />
        <path d="M24 -12 L40 6 L24 6 Z" fill="#fbf4e2" />
      </g>
    </svg>
  );
}

/** 画面の下に敷く、夜の港と灯台のシルエット（装飾）。スマホは灯台まわりを切り出し、PCは全景 */
export function HarborArt() {
  const base = "pointer-events-none absolute inset-x-0 bottom-0 w-full";
  return (
    <>
      <HarborSvg uid="m" viewBox="330 0 470 220" className={`${base} h-auto sm:hidden`} />
      <HarborSvg uid="d" viewBox="0 0 800 220" className={`${base} hidden h-auto max-h-[38vh] sm:block`} />
    </>
  );
}
