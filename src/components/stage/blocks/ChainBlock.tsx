"use client";

import { motion } from "framer-motion";
import type { ChainNode } from "@/data/types";
import { Rich } from "@/lib/text";

interface Props {
  title?: string;
  nodes: ChainNode[];
  caption?: string;
}

/** 「だから」で縦につなぐ因果の連鎖図。切れたつながりは赤い点線で見せる */
export function ChainBlock({ title, nodes, caption }: Props) {
  return (
    <figure className="rounded-2xl border border-ink-900/10 bg-white/55 p-4 sm:p-5">
      {title && <figcaption className="mb-3 text-[13px] font-bold tracking-wide text-ink-700">{title}</figcaption>}
      <ol className="m-0 list-none p-0">
        {nodes.map((node, i) => {
          const tone = node.tone ?? "normal";
          const nodeStyle =
            tone === "goal"
              ? "border-lantern-500 bg-lantern-200/70 shadow-glow-sm"
              : tone === "bad"
                ? "border-coral-500/60 bg-coral-400/15"
                : "border-ink-900/10 bg-paper-50";
          return (
            <li key={i}>
              {i > 0 && (
                <motion.div
                  className="ml-[22px] flex h-9 items-center gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 }}
                >
                  <span
                    className={`block h-full w-0 border-l-2 ${
                      node.broken ? "border-dashed border-coral-500" : "border-solid border-lantern-500"
                    }`}
                  />
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      node.broken ? "bg-coral-500/15 text-coral-600" : "bg-lantern-200 text-ink-700"
                    }`}
                  >
                    {node.broken ? "✕ つながらない" : `↓ ${node.linkLabel ?? "だから"}`}
                  </span>
                </motion.div>
              )}
              <motion.div
                className={`flex items-center gap-3 rounded-2xl border px-3.5 py-3 ${nodeStyle}`}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -6% 0px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[22px] shadow-sm"
                >
                  {node.emoji ?? "•"}
                </span>
                <span className="text-[14.5px] font-medium leading-[1.7] text-ink-900 sm:text-[15px]">
                  <Rich text={node.label} />
                </span>
              </motion.div>
            </li>
          );
        })}
      </ol>
      {caption && <p className="mt-3 text-center text-[12.5px] font-bold text-ink-600">{caption}</p>}
    </figure>
  );
}
