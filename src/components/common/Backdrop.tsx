/**
 * 全画面共通の背景。夜空のグラデーション・星・灯台の光。
 * 星の位置は固定の疑似乱数で決めるので、SSRとクライアントで食い違わない。
 */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const STARS = (() => {
  const rnd = seeded(20261125);
  return Array.from({ length: 64 }, () => ({
    left: rnd() * 100,
    top: rnd() * 100,
    size: 1 + rnd() * 2.2,
    delay: rnd() * 6,
    dur: 2.6 + rnd() * 3.4,
  }));
})();

export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 600px at 85% -5%, rgba(79,104,200,0.35), transparent 60%)," +
            "radial-gradient(700px 500px at 0% 100%, rgba(31,174,157,0.14), transparent 60%)," +
            "linear-gradient(180deg, #0a1124 0%, #070c1c 55%, #060a17 100%)",
        }}
      />
      <div className="lighthouse-beam" />
      {/* 海図の方眼 */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-paper-100"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
