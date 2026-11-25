"use client";

import { useState } from "react";
import { getTerm } from "@/data/glossary";
import { TermSheet } from "./TermSheet";

/** 本文中の用語。タップすると、その場でかみ砕いた解説が開く */
export function TermChip({ termKey, label }: { termKey: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const entry = getTerm(termKey);

  if (!entry) return <>{label ?? termKey}</>;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mx-0.5 inline rounded-md border-b-2 border-dotted border-coral-500 bg-coral-500/10 px-1 font-bold text-inherit transition-colors hover:bg-coral-500/20"
        aria-label={`${entry.term} の意味を見る`}
      >
        {label ?? entry.term}
        <span aria-hidden className="ml-0.5 align-super text-[9px] text-coral-500">
          ?
        </span>
      </button>
      <TermSheet termKey={termKey} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
