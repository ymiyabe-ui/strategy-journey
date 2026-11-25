import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  title?: string;
  backHref?: string;
  backLabel?: string;
  right?: ReactNode;
}

/** 画面上部の共通バー。戻る・タイトル・右側の小物 */
export function TopBar({ title, backHref, backLabel = "戻る", right }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-night-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center gap-3 px-4">
        {backHref ? (
          <Link
            href={backHref}
            className="-ml-2 flex h-10 items-center gap-1 rounded-full px-3 text-sm font-bold text-paper-200 hover:bg-white/5"
          >
            <span aria-hidden>‹</span>
            {backLabel}
          </Link>
        ) : (
          <span className="font-display text-base font-bold tracking-widest text-lantern-300">戦略の旅</span>
        )}
        {title && (
          <h1 className="min-w-0 flex-1 truncate text-center text-[13px] font-bold text-paper-200">{title}</h1>
        )}
        <div className={`flex items-center justify-end gap-2 ${title ? "" : "ml-auto"}`}>{right}</div>
      </div>
    </header>
  );
}
