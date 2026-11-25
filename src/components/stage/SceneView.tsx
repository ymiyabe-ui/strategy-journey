"use client";

import type { Scene } from "@/data/types";
import { ChoiceSceneView } from "./scenes/ChoiceScene";
import { ExplainSceneView } from "./scenes/ExplainScene";
import { QuizSceneView } from "./scenes/QuizScene";
import { StorySceneView } from "./scenes/StoryScene";
import { SummarySceneView } from "./scenes/SummaryScene";
import { TermsSceneView } from "./scenes/TermsScene";

/** 場面の種類ごとに、対応する画面を出し分ける */
export function SceneView({ scene, stageId, onNext }: { scene: Scene; stageId: number; onNext: () => void }) {
  switch (scene.kind) {
    case "story":
      return <StorySceneView scene={scene} onNext={onNext} />;
    case "explain":
      return <ExplainSceneView scene={scene} onNext={onNext} />;
    case "terms":
      return <TermsSceneView scene={scene} onNext={onNext} />;
    case "choice":
      return <ChoiceSceneView scene={scene} stageId={stageId} onNext={onNext} />;
    case "quiz":
      return <QuizSceneView scene={scene} stageId={stageId} onNext={onNext} />;
    case "summary":
      return <SummarySceneView scene={scene} onNext={onNext} />;
  }
}
