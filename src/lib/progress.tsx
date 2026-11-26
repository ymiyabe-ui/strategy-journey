"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { SavedState, StageId, StageProgress } from "@/data/types";
import { FINAL_STAGE, STAGES, STAGE_IDS, getStage } from "@/data/stages";
import { clearState, emptyState, loadState, saveState } from "@/lib/storage";

// ───────── reducer ─────────
type Action =
  | { type: "hydrate"; state: SavedState }
  | { type: "setName"; name: string }
  | { type: "finishPrologue" }
  | { type: "setScene"; stageId: number; index: number }
  | { type: "recordChoice"; stageId: number; choice: NonNullable<StageProgress["choice"]> }
  | { type: "recordQuiz"; stageId: number; quiz: NonNullable<StageProgress["quiz"]> }
  | { type: "unlockTerms"; keys: string[] }
  | { type: "complete"; stageId: number; stars: number }
  | { type: "reset" };

const now = () => new Date().toISOString();

function stageOf(state: SavedState, id: number): StageProgress {
  return state.stages[id] ?? { sceneIndex: 0, cleared: false, stars: 0 };
}

function reducer(state: SavedState, action: Action): SavedState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "setName":
      return { ...state, playerName: action.name, startedAt: state.startedAt ?? now(), updatedAt: now() };
    case "finishPrologue":
      return { ...state, prologueSeen: true, startedAt: state.startedAt ?? now(), updatedAt: now() };
    case "setScene": {
      const cur = stageOf(state, action.stageId);
      return {
        ...state,
        updatedAt: now(),
        stages: { ...state.stages, [action.stageId]: { ...cur, sceneIndex: action.index } },
      };
    }
    case "recordChoice": {
      const cur = stageOf(state, action.stageId);
      return {
        ...state,
        updatedAt: now(),
        stages: { ...state.stages, [action.stageId]: { ...cur, choice: action.choice } },
      };
    }
    case "recordQuiz": {
      const cur = stageOf(state, action.stageId);
      return {
        ...state,
        updatedAt: now(),
        stages: { ...state.stages, [action.stageId]: { ...cur, quiz: action.quiz } },
      };
    }
    case "unlockTerms": {
      const merged = Array.from(new Set([...state.terms, ...action.keys]));
      if (merged.length === state.terms.length) return state;
      return { ...state, terms: merged, updatedAt: now() };
    }
    case "complete": {
      const cur = stageOf(state, action.stageId);
      return {
        ...state,
        updatedAt: now(),
        stages: {
          ...state.stages,
          [action.stageId]: {
            ...cur,
            sceneIndex: 0,
            cleared: true,
            // 再プレイで星が減らないよう、最高値を残す
            stars: Math.max(cur.stars, action.stars),
            clearedAt: cur.clearedAt ?? now(),
          },
        },
      };
    }
    case "reset":
      return emptyState();
  }
}

// ───────── context ─────────
interface ProgressApi {
  /** localStorage の読み込みが終わったか（それまでは描画を控えめにする） */
  ready: boolean;
  state: SavedState;
  /** 保存データがあるか（つづきから を出す判定） */
  hasSave: boolean;
  setName: (name: string) => void;
  finishPrologue: () => void;
  setScene: (stageId: number, index: number) => void;
  recordChoice: (stageId: number, choice: NonNullable<StageProgress["choice"]>) => void;
  recordQuiz: (stageId: number, quiz: NonNullable<StageProgress["quiz"]>) => void;
  unlockTerms: (keys: string[]) => void;
  completeStage: (stageId: number, stars: number) => void;
  resetAll: () => void;
  // 派生
  stageProgress: (id: number) => StageProgress;
  isCleared: (id: number) => boolean;
  isUnlocked: (id: number) => boolean;
  /** 0〜1。ステージ内の進み具合 */
  stageFraction: (id: number) => number;
  /** 0〜100。6ステージ全体の進捗率 */
  overallPercent: number;
  clearedCount: number;
  allCleared: boolean;
  /** 次に遊ぶべきステージ（なければ null） */
  nextStageId: StageId | null;
}

const ProgressContext = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, emptyState);
  const [ready, setReady] = useState(false);

  // マウント後に1回だけ復元（SSRとの不一致を避ける）
  useEffect(() => {
    const saved = loadState();
    if (saved) dispatch({ type: "hydrate", state: saved });
    setReady(true);
  }, []);

  // 変更のたびに保存（復元前は書かない）
  useEffect(() => {
    if (ready) saveState(state);
  }, [state, ready]);

  const stageProgress = useCallback((id: number) => stageOf(state, id), [state]);
  const isCleared = useCallback((id: number) => stageOf(state, id).cleared, [state]);

  const isUnlocked = useCallback(
    (id: number) => {
      if (id <= 1) return true;
      return stageOf(state, id - 1).cleared;
    },
    [state],
  );

  const stageFraction = useCallback(
    (id: number) => {
      const p = stageOf(state, id);
      if (p.cleared) return 1;
      const stage = getStage(id);
      if (!stage || stage.scenes.length === 0) return 0;
      // 最終場面に着いていても、クリア前は 0.95 で止める
      return Math.min(0.95, p.sceneIndex / stage.scenes.length);
    },
    [state],
  );

  const derived = useMemo(() => {
    const clearedCount = STAGE_IDS.filter((id) => stageOf(state, id).cleared).length;
    const sum = STAGE_IDS.reduce((acc, id) => {
      const p = stageOf(state, id);
      if (p.cleared) return acc + 1;
      const stage = STAGES.find((s) => s.id === id);
      if (!stage || stage.scenes.length === 0) return acc;
      return acc + Math.min(0.95, p.sceneIndex / stage.scenes.length);
    }, 0);
    // 6章がすべて終わったら、次は最終ステージ（それもクリア済みなら null）
    const next: StageId | null =
      STAGE_IDS.find((id) => !stageOf(state, id).cleared) ?? (stageOf(state, FINAL_STAGE.id).cleared ? null : FINAL_STAGE.id);
    return {
      clearedCount,
      overallPercent: Math.round((sum / STAGE_IDS.length) * 100),
      allCleared: clearedCount === STAGE_IDS.length,
      nextStageId: next,
    };
  }, [state]);

  const hasSave = ready && (state.startedAt !== null || state.prologueSeen);

  const api: ProgressApi = {
    ready,
    state,
    hasSave,
    setName: useCallback((name: string) => dispatch({ type: "setName", name }), []),
    finishPrologue: useCallback(() => dispatch({ type: "finishPrologue" }), []),
    setScene: useCallback((stageId: number, index: number) => dispatch({ type: "setScene", stageId, index }), []),
    recordChoice: useCallback(
      (stageId: number, choice: NonNullable<StageProgress["choice"]>) =>
        dispatch({ type: "recordChoice", stageId, choice }),
      [],
    ),
    recordQuiz: useCallback(
      (stageId: number, quiz: NonNullable<StageProgress["quiz"]>) => dispatch({ type: "recordQuiz", stageId, quiz }),
      [],
    ),
    unlockTerms: useCallback((keys: string[]) => dispatch({ type: "unlockTerms", keys }), []),
    completeStage: useCallback(
      (stageId: number, stars: number) => dispatch({ type: "complete", stageId, stars }),
      [],
    ),
    resetAll: useCallback(() => {
      clearState();
      dispatch({ type: "reset" });
    }, []),
    stageProgress,
    isCleared,
    isUnlocked,
    stageFraction,
    ...derived,
  };

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressApi {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress は ProgressProvider の内側で使ってください");
  return ctx;
}
