import type { ReactNode } from "react";

/** 画面下に固定する操作バー。親指で押せる位置に「つぎへ」を置く */
export function ActionBar({ children, hint }: { children: ReactNode; hint?: ReactNode }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-night-950 from-55% via-night-950/95 to-transparent pb-[calc(1rem+var(--safe-bottom))] pt-14">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 px-4">
        {hint && <p className="rounded-full bg-night-900/90 px-3 py-0.5 text-[11.5px] font-bold tracking-wide text-paper-300">{hint}</p>}
        <div className="flex w-full items-center justify-center gap-3">{children}</div>
      </div>
    </div>
  );
}
