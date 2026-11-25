"use client";

import { motion } from "framer-motion";
import type { Line } from "@/data/types";
import { CHARACTERS } from "@/data/characters";
import { Avatar } from "@/components/common/Avatar";
import { Rich, fillName } from "@/lib/text";
import { useProgress } from "@/lib/progress";

/** チャット形式の会話。shown 行目まで表示する */
export function Dialogue({ lines, shown }: { lines: Line[]; shown: number }) {
  const { state } = useProgress();
  const visible = lines.slice(0, shown);

  return (
    <div className="space-y-4">
      {visible.map((line, i) => {
        const isNew = i === shown - 1;
        if (line.who === "narrator") {
          return (
            <motion.div
              key={i}
              initial={isNew ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-[34rem] rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-center text-[14px] leading-[1.95] text-paper-200"
            >
              <Rich text={line.text} />
            </motion.div>
          );
        }

        const c = CHARACTERS[line.who];
        const mine = line.who === "you";
        const name = mine ? fillName("{name}", state.playerName) : c.name;
        return (
          <motion.div
            key={i}
            initial={isNew ? { opacity: 0, y: 14, scale: 0.97 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className={`flex items-end gap-2.5 ${mine ? "flex-row-reverse" : ""}`}
          >
            <Avatar
              who={line.who}
              mood={line.mood}
              size={46}
              className="mb-1 rounded-full ring-2 ring-white/20"
            />
            <div className={`max-w-[82%] ${mine ? "items-end text-right" : ""}`}>
              <p className="mb-1 px-1 text-[11px] font-bold tracking-wide" style={{ color: c.color }}>
                {name}
              </p>
              <div
                className={`inline-block px-4 py-3 text-left text-[15px] leading-[1.9] shadow-card sm:text-[15.5px] ${
                  mine
                    ? "rounded-2xl rounded-br-md bg-gradient-to-br from-night-500 to-sky-500/80 text-white"
                    : "rounded-2xl rounded-bl-md bg-paper-50 text-ink-900"
                }`}
              >
                <Rich text={line.text} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
