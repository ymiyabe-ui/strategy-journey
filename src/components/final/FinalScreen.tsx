"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FINAL_STAGE } from "@/data/stages";

/**
 * 旧「最終総合ステージ」の入口（/final）。いまは最終ステージも章と同じ画面（/stage/7）で遊ぶので、
 * 以前のリンクやブックマークが迷わないよう、そこへ送るだけにしている。
 */
export function FinalScreen() {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/stage/${FINAL_STAGE.id}`);
  }, [router]);
  return <div className="min-h-dvh" />;
}
