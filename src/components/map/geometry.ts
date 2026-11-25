/** マップの座標計算。ステージ6つ＋最終ステージを、左右に振りながら縦に並べる */
export const ROW_H = 188;
export const NODE_COUNT = 7; // 6ステージ + 最終
export const MAP_H = ROW_H * NODE_COUNT;

/** ノード i の中心（x は百分率、y は px） */
export function nodeCenter(i: number): { x: number; y: number } {
  const last = i === NODE_COUNT - 1;
  const x = last ? 50 : i % 2 === 0 ? 27 : 73;
  return { x, y: i * ROW_H + ROW_H / 2 };
}

/** ノード i から i+1 へ、なめらかに曲がる航路（SVGのパス） */
export function segmentPath(i: number): string {
  const a = nodeCenter(i);
  const b = nodeCenter(i + 1);
  const dy = (b.y - a.y) * 0.55;
  return `M ${a.x} ${a.y} C ${a.x} ${a.y + dy}, ${b.x} ${b.y - dy}, ${b.x} ${b.y}`;
}
