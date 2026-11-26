/**
 * 「戦略の旅」のデータ型。
 * ステージの中身はすべてここの型に沿った「データ」で書き、画面側は型で描き分ける。
 * → ステージを足すときは src/data/stages/ にファイルを足すだけで済む。
 */

// ───────── 登場人物 ─────────
export type CharacterId = "nana" | "you" | "taisho" | "narrator";
export type Mood = "normal" | "smile" | "think" | "surprise" | "proud" | "worry";

export interface Line {
  who: CharacterId;
  /** 本文。**強調** / [[用語キー]] / {name} {san} が使える（src/lib/text.tsx） */
  text: string;
  mood?: Mood;
}

// ───────── 場面（シーン）─────────
export interface StoryScene {
  kind: "story";
  id: string;
  /** 場所。例：「ノースハーバー ─ ノースライト戦略研究所」 */
  place: string;
  /** 時間帯。例：「入社初日 午前9:00」 */
  time?: string;
  lines: Line[];
}

export type CalloutTone = "point" | "why" | "example" | "warn";

export interface CompareSide {
  label: string;
  emoji?: string;
  items: string[];
  note?: string;
}

export interface ChainNode {
  label: string;
  emoji?: string;
  tone?: "normal" | "goal" | "bad";
  /** true なら「手前のノードからここへのつながり」が切れている */
  broken?: boolean;
  /** 手前からの矢印に添える言葉（既定は「だから」） */
  linkLabel?: string;
}

export interface MapSchool {
  name: string;
  gist: string;
  /** 「この章」「第3章で深掘り」など、旅の中での位置づけ */
  tag?: string;
}

export interface MapRegion {
  name: string;
  emoji: string;
  tagline: string;
  tone: "sea" | "lantern" | "sky";
  schools: MapSchool[];
}

export interface ForceItem {
  name: string;
  emoji: string;
  /** その力のひとこと説明 */
  gist: string;
  /** 強さの目安（具体例の場面で使う） */
  level?: "high" | "mid" | "low";
  /** 具体例（ひだまり亭ならどうか、など） */
  note?: string;
}

export interface LadderStep {
  /** 頭文字（V・R・I・O など） */
  letter: string;
  name: string;
  question: string;
  /** 「いいえ」だったときの結論 */
  no: string;
  /** ひだまり亭などの具体例 */
  example?: string;
}

export interface MatrixRow {
  name: string;
  emoji: string;
  /** columns と同じ順番の判定 */
  marks: ("yes" | "no" | "maybe")[];
  verdict: string;
  tone: "good" | "mid" | "bad";
  note?: string;
}

export interface QuadCell {
  /** 頭文字や記号（S・W・O・T、S×O など） */
  tag: string;
  name: string;
  /** 出どころ・位置づけ（「第5章の武器」など） */
  from?: string;
  /** 中身（短い項目を並べる） */
  items: string[];
  tone: "sea" | "coral" | "lantern" | "sky";
}

export type Block =
  | { type: "p"; text: string }
  | { type: "callout"; tone: CalloutTone; title: string; text: string }
  | { type: "compare"; left: CompareSide; right: CompareSide; caption?: string }
  | { type: "chain"; title?: string; nodes: ChainNode[]; caption?: string }
  | { type: "map"; title?: string; regions: MapRegion[] }
  | { type: "ladder"; title?: string; steps: LadderStep[]; goal: { label: string; text: string } }
  | { type: "matrix"; title?: string; columns: string[]; rows: MatrixRow[] }
  | {
      type: "quad";
      title?: string;
      /** 行の見出し（上・下） */
      rows: [string, string];
      /** 列の見出し（左・右） */
      cols: [string, string];
      /** 左上・右上・左下・右下の順 */
      cells: [QuadCell, QuadCell, QuadCell, QuadCell];
      caption?: string;
    }
  | {
      type: "forces";
      title?: string;
      center: ForceItem;
      /** 順番は 新規参入・売り手・買い手・代替品 */
      forces: [ForceItem, ForceItem, ForceItem, ForceItem];
    }
  | { type: "clash"; title?: string; items: { a: string; b: string; result: string }[] }
  | { type: "nana"; text: string; mood?: Mood }
  | { type: "list"; style: "bullet" | "number" | "check"; title?: string; items: string[] }
  | { type: "formula"; parts: { label: string; sub?: string }[]; ops: string[]; caption?: string };

export interface ExplainScene {
  kind: "explain";
  id: string;
  eyebrow: string;
  title: string;
  blocks: Block[];
}

export interface TermsScene {
  kind: "terms";
  id: string;
  title: string;
  intro: Line[];
  /** 用語集のキー */
  terms: string[];
}

export interface ChoiceOption {
  id: string;
  emoji: string;
  label: string;
  detail?: string;
  /** ストーリー組み立て図に出す短いラベル */
  short: string;
  /** これまでの選択の id が全部そろっていれば「つながった」 */
  requires?: string[];
  /** つながった（または最初の一手の）ときのナナ先生の反応 */
  reaction: string;
  /** つながらなかったときの反応 */
  mismatchReaction?: string;
  /** 最初の一手の評価（見た目の色分け用） */
  start?: "good" | "ok" | "weak";
}

export interface ChoiceStep {
  id: string;
  /** 組み立て図の見出し。例：「誰に」 */
  nodeLabel: string;
  title: string;
  question: string;
  options: ChoiceOption[];
}

export interface ChoiceEnding {
  id: string;
  emoji: string;
  title: string;
  /** 0〜1。星の判定に使う */
  quality: number;
  /** お店のその後（語り） */
  narration: string;
  /** ナナ先生の講評 */
  nana: string;
  /** 上から順に評価し、最初に当てはまったものを採用（when なしは最後の受け皿） */
  when?: { firstPick?: string[]; matches?: number[] };
}

export interface ChoiceScene {
  kind: "choice";
  id: string;
  title: string;
  /** 状況説明 */
  intro: string;
  /** 観察メモ（判断材料） */
  notes: string[];
  nanaIntro: string;
  steps: ChoiceStep[];
  endings: ChoiceEnding[];
}

export interface QuizOption {
  text: string;
  /** その選択肢を選んだときに出すひとこと（正解でも不正解でも） */
  feedback: string;
}

export interface QuizQuestion {
  id: string;
  scenario?: string;
  question: string;
  options: QuizOption[];
  answer: number;
  explanation: string;
}

export interface QuizScene {
  kind: "quiz";
  id: string;
  title: string;
  intro: string;
  questions: QuizQuestion[];
}

export interface SummaryScene {
  kind: "summary";
  id: string;
  title: string;
  points: { title: string; text: string }[];
  why: { title: string; text: string };
  nana: Line[];
}

export type Scene =
  | StoryScene
  | ExplainScene
  | TermsScene
  | ChoiceScene
  | QuizScene
  | SummaryScene;

// ───────── ステージ ─────────
export type StageId = 1 | 2 | 3 | 4 | 5 | 6;

export interface Perspective {
  icon: string;
  name: string;
  tagline: string;
  description: string;
  /** 日常で使うときの3つの問い */
  checks: string[];
}

export interface ClearInfo {
  perspective: Perspective;
  nana: Line[];
  /** 次のステージの予告 */
  teaser: string;
}

export interface Stage {
  id: StageId;
  title: string;
  subtitle: string;
  /** 学ぶ理論 */
  theme: string;
  icon: string;
  /** 差し色（CSSカラー） */
  accent: string;
  blurb: string;
  goals: string[];
  minutes: number;
  /** このステージで出会う用語（用語集のキー） */
  termKeys: string[];
  /** 公開前のステージで見せる、出会う予定の用語ラベル */
  termPreview: string[];
  status: "ready" | "coming";
  scenes: Scene[];
  clear: ClearInfo;
}

// ───────── 用語集 ─────────
export interface GlossaryEntry {
  key: string;
  term: string;
  reading: string;
  english?: string;
  stage: StageId;
  /** かみ砕いた説明 */
  plain: string;
  /** 日常のたとえ */
  everyday: string;
  /** なぜ重要か（本質） */
  essence: string;
  /** この旅の舞台での例 */
  inStory: string;
}

// ───────── 保存データ（localStorage）─────────
export interface StageProgress {
  /** 続きから再開するときの場面番号 */
  sceneIndex: number;
  cleared: boolean;
  stars: number;
  choice?: { picks: string[]; quality: number; endingId: string };
  quiz?: { answers: number[]; correct: number; total: number };
  clearedAt?: string;
}

export interface SavedState {
  version: 1;
  playerName: string;
  /** プロローグを見終えたか */
  prologueSeen: boolean;
  startedAt: string | null;
  updatedAt: string | null;
  stages: Partial<Record<number, StageProgress>>;
  /** 出会った用語のキー */
  terms: string[];
}
