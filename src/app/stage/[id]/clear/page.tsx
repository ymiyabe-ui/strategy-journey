import { notFound } from "next/navigation";
import { StageClear } from "@/components/stage/StageClear";
import { parseStageId, stageParams } from "@/lib/params";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return stageParams();
}

export default async function ClearPage({ params }: Props) {
  const id = parseStageId((await params).id);
  if (!id) notFound();
  return <StageClear stageId={id} />;
}
