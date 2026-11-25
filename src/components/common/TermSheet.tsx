"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getTerm } from "@/data/glossary";
import { useProgress } from "@/lib/progress";

interface Props {
  termKey: string;
  open: boolean;
  onClose: () => void;
}

/** 用語の解説シート（下からせり上がる）。開くとノートに記録される */
export function TermSheet({ termKey, open, onClose }: Props) {
  const entry = getTerm(termKey);
  const { unlockTerms } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open && entry) unlockTerms([entry.key]);
  }, [open, entry, unlockTerms]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || !entry) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="閉じる"
            className="absolute inset-0 bg-night-950/75 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${entry.term}の解説`}
            className="paper relative max-h-[86dvh] w-full max-w-lg overflow-y-auto rounded-b-none p-5 pb-[calc(1.25rem+var(--safe-bottom))] sm:rounded-b-[22px] sm:p-7"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <p className="text-[11px] font-bold tracking-[0.2em] text-coral-600">用語メモ ・ 第{entry.stage}章</p>
            <h3 className="font-display mt-1 text-2xl font-bold text-ink-900">{entry.term}</h3>
            <p className="text-xs text-ink-600">
              {entry.reading}
              {entry.english ? ` ／ ${entry.english}` : ""}
            </p>

            <dl className="mt-4 space-y-3 text-[14.5px] leading-[1.85] text-ink-800">
              <div className="rounded-xl bg-white/70 p-3.5">
                <dt className="text-xs font-bold text-sea-600">ひとことで言うと</dt>
                <dd className="mt-1">{entry.plain}</dd>
              </div>
              <div className="rounded-xl bg-white/70 p-3.5">
                <dt className="text-xs font-bold text-lantern-600">日常のたとえ</dt>
                <dd className="mt-1">{entry.everyday}</dd>
              </div>
              <div className="rounded-xl bg-white/70 p-3.5">
                <dt className="text-xs font-bold text-coral-600">なぜ大事？</dt>
                <dd className="mt-1">{entry.essence}</dd>
              </div>
            </dl>

            <button
              onClick={onClose}
              className="mt-5 h-11 w-full rounded-full bg-ink-800 text-sm font-bold text-paper-100 hover:bg-ink-700"
            >
              わかった
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
