import type { SavedState } from "@/data/types";

export const STORAGE_KEY = "strategy-journey:v1";

export function emptyState(): SavedState {
  return {
    version: 1,
    playerName: "",
    prologueSeen: false,
    startedAt: null,
    updatedAt: null,
    stages: {},
    terms: [],
  };
}

/** localStorage が使えない（プライベートモード等）場合でも落とさない */
export function loadState(): SavedState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SavedState> | null;
    if (!parsed || parsed.version !== 1) return null;
    return { ...emptyState(), ...parsed } as SavedState;
  } catch {
    return null;
  }
}

export function saveState(state: SavedState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* 保存できなくても、そのセッション中は遊べる */
  }
}

export function clearState(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}
