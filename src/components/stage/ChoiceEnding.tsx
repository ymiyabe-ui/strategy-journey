"use client";

import { motion } from "framer-motion";
import type { ChoiceEnding } from "@/data/types";
import { Avatar } from "@/components/common/Avatar";
import { Stars } from "@/components/common/Stars";
import { endingStars } from "@/lib/choice";
import { Rich } from "@/lib/text";

/** 組み立てた物語の結末。お店のその後と、ナナ先生の講評 */
export function ChoiceEndingCard({ ending }: { ending: ChoiceEnding }) {
  return (
    <motion.div
      className="paper px-4 pb-7 pt-7 sm:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="text-center">
        <motion.div
          className="text-5xl"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 }}
        >
          {ending.emoji}
        </motion.div>
        <p className="mt-3 text-[11.5px] font-bold tracking-[0.2em] text-coral-600">物語の結末</p>
        <h3 className="font-display mt-1 text-[24px] font-extrabold text-ink-900">{ending.title}</h3>
        <div className="mt-2 flex justify-center">
          <Stars value={endingStars(ending.quality)} size={26} animate />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-ink-900/10 bg-white/65 p-4">
        <p className="text-[12px] font-bold text-lantern-600">🏮 その後のひだまり亭</p>
        <p className="mt-1.5 text-[14.5px] leading-[1.95] text-ink-800">{ending.narration}</p>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <Avatar who="nana" mood={ending.quality >= 0.6 ? "proud" : "think"} size={50} className="rounded-full ring-2 ring-coral-400/70" />
        <div className="rounded-2xl rounded-tl-md border border-coral-400/40 bg-coral-400/[0.13] px-4 py-3">
          <p className="mb-0.5 text-[11px] font-bold text-coral-600">ナナ先生の講評</p>
          <p className="text-[14.5px] leading-[1.9] text-ink-900">
            <Rich text={ending.nana} />
          </p>
        </div>
      </div>
    </motion.div>
  );
}
