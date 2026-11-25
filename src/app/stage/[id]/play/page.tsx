import { notFound } from "next/navigation";
import { StageRunner } from "@/components/stage/StageRunner";
import { parseStageId, stageParams } from "@/lib/params";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return stageParams();
}

export default async function PlayPage({ params }: Props) {
  const id = parseStageId((await params).id);
  if (!id) notFound();
  return <StageRunner stageId={id} />;
}
