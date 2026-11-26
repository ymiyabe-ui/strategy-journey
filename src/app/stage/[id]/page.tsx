import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StageOverview } from "@/components/stage/StageOverview";
import { getStage } from "@/data/stages";
import { parseStageId, stageParams } from "@/lib/params";
import { stageTag } from "@/lib/stageLabel";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return stageParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseStageId((await params).id);
  const stage = id ? getStage(id) : undefined;
  return { title: stage ? `${stageTag(stage)} ${stage.title} ─ 戦略の旅` : "戦略の旅" };
}

export default async function StagePage({ params }: Props) {
  const id = parseStageId((await params).id);
  if (!id) notFound();
  return <StageOverview stageId={id} />;
}
