import type { Metadata } from "next";
import { FinalScreen } from "@/components/final/FinalScreen";

export const metadata: Metadata = { title: "最終総合ステージ ─ 戦略の旅" };

export default function FinalPage() {
  return <FinalScreen />;
}
