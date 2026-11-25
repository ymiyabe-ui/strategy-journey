"use client";

import type { ChoiceScene } from "@/data/types";
import { Avatar } from "@/components/common/Avatar";
import { Rich } from "@/lib/text";

/** 実践の導入：状況・観察メモ・ナナ先生のひとこと */
export function ChoiceBrief({ scene }: { scene: ChoiceScene }) {
  return (
    <article className="paper px-4 pb-8 pt-7 sm:px-8">
      <p className="text-[11.5px] font-bold tracking-[0.18em] text-coral-600">実践 ／ 分岐あり</p>
      <h2 className="font-display mt-2 text-[24px] font-extrabold leading-[1.45] text-ink-900">{scene.title}</h2>
      <p className="mt-4 text-[15px] leading-[2] text-ink-800">
        <Rich text={scene.intro} />
      </p>

      <div className="mt-5 rounded-2xl border border-sky-500/40 bg-sky-400/[0.12] p-4">
        <p className="text-[12.5px] font-extrabold tracking-wide text-sky-500">🔎 観察メモ（判断の材料）</p>
        <ul className="mt-2 space-y-2 p-0">
          {scene.notes.map((n, i) => (
            <li key={i} className="flex gap-2 text-[14px] leading-[1.8] text-ink-800">
              <span aria-hidden className="text-sky-500">
                ▸
              </span>
              {n}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <Avatar who="nana" mood="smile" size={50} className="rounded-full ring-2 ring-coral-400/70" />
        <div className="rounded-2xl rounded-tl-md border border-coral-400/40 bg-coral-400/[0.13] px-4 py-3">
          <p className="mb-0.5 text-[11px] font-bold text-coral-600">ナナ先生</p>
          <p className="text-[14.5px] leading-[1.9] text-ink-900">
            <Rich text={scene.nanaIntro} />
          </p>
        </div>
      </div>
    </article>
  );
}
