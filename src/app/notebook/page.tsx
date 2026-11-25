import type { Metadata } from "next";
import { NotebookScreen } from "@/components/notebook/NotebookScreen";

export const metadata: Metadata = { title: "冒険のノート ─ 戦略の旅" };

export default function NotebookPage() {
  return <NotebookScreen />;
}
