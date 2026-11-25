import type { Metadata } from "next";
import { MapScreen } from "@/components/map/MapScreen";

export const metadata: Metadata = { title: "旅の地図 ─ 戦略の旅" };

export default function MapPage() {
  return <MapScreen />;
}
