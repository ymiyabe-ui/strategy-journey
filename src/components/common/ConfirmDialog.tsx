"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./Button";

interface Props {
  open: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/** 取り消せない操作の前に出す確認ダイアログ */
export function ConfirmDialog({ open, title, body, confirmLabel, cancelLabel = "やめる", onConfirm, onCancel }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button aria-label="閉じる" className="absolute inset-0 bg-night-950/80 backdrop-blur-sm" onClick={onCancel} />
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-label={title}
            className="paper relative w-full max-w-sm p-6 text-center"
            initial={{ scale: 0.92, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <h3 className="font-display text-xl font-extrabold text-ink-900">{title}</h3>
            <p className="mt-2 text-[14px] leading-[1.9] text-ink-700">{body}</p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={onCancel}
                className="h-12 flex-1 rounded-full border border-ink-900/20 text-[14px] font-bold text-ink-700 hover:bg-ink-900/5"
              >
                {cancelLabel}
              </button>
              <Button className="flex-1" onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
