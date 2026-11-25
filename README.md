# 戦略の旅（strategy-journey）

新米コンサルタントになって、物語を進めながら経営戦略を学ぶ学習Webアプリ。
入口はやさしく（日常のたとえだけ）、進むほど専門用語が増え、最後は本質まで届くスパイラル構成。

- 技術：Next.js 15（App Router）＋ TypeScript ＋ Tailwind CSS 3 ＋ framer-motion
- 状態：`useReducer` ＋ localStorage（進捗・選択履歴・クイズ結果・出会った用語を保存。再開できる）
- 対応：スマホ優先、PCでは本文幅を `max-w-2xl` に制限

## 現在の実装範囲

| 画面 | 状態 |
|---|---|
| スタート（世界観・プロローグ・名前入力・つづきから） | 完成 |
| メインマップ（6ステージ＋最終、航路、進捗率、ロック） | 完成 |
| ステージ詳細（ゴール・旅の流れ・出会う用語・獲得できる視点） | 完成 |
| **第1章「物語の力」本編**（12場面・約25分） | **完成** |
| **第2章「戦略の地図」本編**（12場面・約28分） | **完成** |
| ステージクリア（紙吹雪・星・獲得した視点・次章の解放） | 完成 |
| 冒険のノート（獲得した視点・用語） | 完成 |
| 第3〜6章の本編 | 紹介のみ（`status: "coming"`） |
| 最終総合ステージ | 入口のみ（条件表示まで） |

## 動かし方

```bash
cd tools/strategy-journey
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # 型チェック
npm run build      # 本番ビルド（静的生成）
```

初回ビルド時に Google Fonts（Noto Sans JP・Shippori Mincho）を取得する（ネットワーク必須）。

## 公開（GitHub Pages）

- 公開URL：https://ymiyabe-ui.github.io/strategy-journey/
- 仕組み：`npm run build:pages` で静的ファイルを `out/` に書き出し（サブパス `/strategy-journey/` 用）、`npm run deploy` で `gh-pages` ブランチへ置く。
  GitHub Pages が `gh-pages` ブランチから配信する。
- 更新するとき：変更をコミット → `git push`（ソース）→ `npm run deploy`（公開サイト）。反映まで1〜2分。
- 初回だけ：GitHub のリポジトリの Settings → Pages で、Source を「Deploy from a branch」、Branch を `gh-pages` / `(root)` にする。
- 通常の `npm run dev` / `npm run build` は、これまで通りの Next.js として動く（公開用の設定は `DEPLOY_TARGET=pages` のときだけ有効）。
- 進捗は閲覧者のブラウザの localStorage に保存される（サーバーには何も送らない）。同じドメインの他のアプリとは、キー名（`strategy-journey:v1`）で分かれている。

## フォルダ構成

```
src/
├─ app/                       … ルート（薄いラッパーだけ）
│  ├─ page.tsx                … スタート
│  ├─ map/                    … メインマップ
│  ├─ stage/[id]/             … ステージ詳細 / play（進行）/ clear（クリア）
│  ├─ notebook/  final/       … ノート／最終ステージ
│  └─ layout.tsx globals.css icon.svg not-found.tsx
├─ components/
│  ├─ common/                 … Avatar, Button, TermChip/TermSheet, ProgressBar, Stars, Confetti …
│  ├─ start/                  … StartScreen, Prologue, Compass, HarborArt
│  ├─ map/                    … MapScreen, StageNode, MapRoute, ProgressCard, geometry
│  ├─ stage/                  … StageRunner（進行役）, SceneView, RunnerHeader, StageOverview, StageClear
│  │  ├─ scenes/              … Story / Explain / Terms / Choice / Quiz / Summary の各場面
│  │  └─ blocks/              … 解説の部品（吹き出し・比較・因果の連鎖・ぶつかり表・公式・流派の地図 …）
│  ├─ notebook/  final/
├─ data/                      … 中身はすべてここ（画面側は型で描き分けるだけ）
│  ├─ types.ts                … 場面・ブロック・ステージ・保存データの型
│  ├─ characters.ts glossary.ts
│  └─ stages/                 … stage1/・stage2/（本編）, meta.ts（3〜6章の紹介）, index.ts（登録）
└─ lib/
   ├─ progress.tsx            … 進捗の Context（reducer＋localStorage）
   ├─ storage.ts text.tsx     … 保存／本文マークアップ
   ├─ choice.ts phases.ts params.ts
```

## ステージの標準フロー（データの `scenes` の並び）

| 段階 | 場面の種類 | 役割 |
|---|---|---|
| 導入 | `story` | 状況設定＋ナナ先生との会話（タップで1行ずつ進む） |
| 解説 | `explain` | 核心を複数画面で。吹き出し・比較・因果の連鎖・ぶつかり表など |
| 用語 | `terms` | 専門用語をカードで1枚ずつ。かみ砕き・日常のたとえ・本質・物語での例 |
| 実践 | `choice` | 選んで組み立てる分岐。選択ごとに反応、つながりの図が光り、結末が分岐 |
| 確認 | `quiz` | 2〜3問。選んだ選択肢ごとのフィードバック＋解説 |
| まとめ | `summary` | 重要ポイントの再提示と「なぜ大事か」 |
| クリア | （クリア画面） | 星・獲得した視点・獲得用語・次章の解放 |

## 本文のマークアップ

`src/lib/text.tsx` が解釈する。

- `**強調**` … マーカー風の強調
- `[[kyoso-yui]]` / `[[kyoso-yui|表示名]]` … 用語チップ（タップでその場で解説。ノートに記録）
- `{san}` / `{name}` … プレイヤー名（空なら「あなた」）

## 章を足す手順（第2章以降）

1. `src/data/glossary.ts` に、その章で出す用語を足す（`stage` 番号つき）
2. `src/data/stages/stageN/` に場面データを書く（`stage1/` を雛形に。1ファイルを大きくしすぎない）
3. `src/data/stages/meta.ts` から該当章を外し、`stages/index.ts` の `STAGES` に `stageN` を入れる（`status: "ready"`）
4. `clear`（獲得する視点・ナナ先生のセリフ・次章の予告）を書く

画面側のコードは変更不要。

## 保存データ

localStorage キー `strategy-journey:v1`。形は `src/data/types.ts` の `SavedState`。
形を変えるときは `version` を上げ、`storage.ts` の `loadState` で移行する。

## 設計メモ

- **スパイラル学習**：第1章は専門用語を終盤まで出さず、日常のたとえ（旅行・文化祭・レシピ・定食屋）だけで核心まで進む。
  用語の場面で初めて名前をつけ、その後の `summary` やクイズの解説で用語チップとして再利用する。後の章でも同じ用語を使い回す。
- **第2章**：第1章の舞台（ひだまり亭）を引き継ぐ。専門用語はここから出すが、出した場で必ずかみ砕く（たとえ話 → 用語の順）。
  実践の分岐は第1章と同じ仕組み（`requires`）で、「状況の読み → 進め方 → 束ね方」を選ばせる。束ね方に第1章の「物語」を再登場させている。
- **「なぜ大事か」**：解説の `callout`（tone: why）、用語カードの「本質」、まとめの「なぜ、これが大事なのか」の3か所で、毎章かならず踏み込む。
- **星の判定**：クリアで1つ、クイズが3問中2問以上正解で+1、実践の結末の質が 0.66 以上で+1。再プレイで星は減らない。
- **ロック**：第N章は第N-1章のクリアで開く。最終ステージは6章すべてのクリアで開く。
- **アニメーション**：場面の切り替え・吹き出し・クリア演出に限定。OSの「視差効果を減らす」設定では装飾アニメーションを止める。
- 第1章の考え方は、楠木建『ストーリーとしての競争戦略』の「打ち手のつながり（因果論理）が競争優位をつくる」という主張を、
  学習用にかなり簡略化して再構成したもの。第2章は、ミンツバーグらの『戦略サファリ』（10の学派）と、計画的戦略／創発的戦略の区別を、
  同様に簡略化して再構成したもの。細部の厳密さは原典に当たること。

## 既知の注意

- `npm audit` は Next.js が内包するビルド時の PostCSS について指摘を出す（実行時のコードではない）。
  Next 16 系へ上げる際に解消される見込み。
- 登場人物の絵は、素材を使わず SVG で描いている（`components/common/Avatar*.tsx`）。差し替えたい場合はここだけ直す。
