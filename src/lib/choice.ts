import type { ChoiceEnding, ChoiceOption, ChoiceScene } from "@/data/types";

/** requires に書かれた選択がすべて、これまでの選択に含まれていれば「つながった」 */
export function isMatch(option: ChoiceOption, before: string[]): boolean {
  return !option.requires || option.requires.every((id) => before.includes(id));
}

/** 2つ目以降のステップで、つながった数 */
export function countMatches(scene: ChoiceScene, picks: string[]): number {
  let n = 0;
  for (let i = 1; i < scene.steps.length; i++) {
    const opt = scene.steps[i].options.find((o) => o.id === picks[i]);
    if (opt && isMatch(opt, picks.slice(0, i))) n++;
  }
  return n;
}

/** 上から順に評価して、最初に当てはまった結末を返す（最後は受け皿） */
export function pickEnding(scene: ChoiceScene, picks: string[]): ChoiceEnding {
  const matches = countMatches(scene, picks);
  const found = scene.endings.find((e) => {
    if (!e.when) return false;
    const okFirst = !e.when.firstPick || e.when.firstPick.includes(picks[0]);
    const okMatches = !e.when.matches || e.when.matches.includes(matches);
    return okFirst && okMatches;
  });
  return found ?? scene.endings[scene.endings.length - 1];
}

/** 結末の質（0〜1）を、表示用の星（1〜3）に */
export function endingStars(quality: number): number {
  if (quality >= 0.9) return 3;
  if (quality >= 0.6) return 2;
  return 1;
}
