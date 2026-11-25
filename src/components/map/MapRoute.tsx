"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { MAP_H, NODE_COUNT, segmentPath } from "./geometry";

/** クリア済みの区間。金色の線が、手前から先へ伸びていく */
function LitSegment({ d, delay }: { d: string; delay: number }) {
  const pathLength = useMotionValue(0);

  useEffect(() => {
    const controls = animate(pathLength, 1, { duration: 1.1, delay, ease: "easeInOut" });
    return () => controls.stop();
  }, [pathLength, delay]);

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#ffc247"
      strokeWidth={4}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      style={{ pathLength, filter: "drop-shadow(0 0 6px rgba(255,194,71,0.85))" }}
    />
  );
}

/**
 * ノード間の航路。lit[i] が true なら、i → i+1 の区間が金色に光る。
 */
export function MapRoute({ lit }: { lit: boolean[] }) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 100 ${MAP_H}`}
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full overflow-visible"
    >
      {Array.from({ length: NODE_COUNT - 1 }, (_, i) => (
        <g key={i}>
          <path
            d={segmentPath(i)}
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth={3}
            strokeDasharray="2 9"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {lit[i] && <LitSegment d={segmentPath(i)} delay={0.3 + i * 0.25} />}
        </g>
      ))}
    </svg>
  );
}
