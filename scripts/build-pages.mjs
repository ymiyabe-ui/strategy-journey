// 公開用ビルド：静的ファイルを out/ に書き出す（GitHub Pages 用）
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";

export const REPO_NAME = "strategy-journey";

const env = { ...process.env, DEPLOY_TARGET: "pages", BASE_PATH: `/${REPO_NAME}` };
const r = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], { stdio: "inherit", env });
if (r.status !== 0) process.exit(r.status ?? 1);

// Jekyll に _next を無視させない
writeFileSync("out/.nojekyll", "");
console.log("\n公開用ファイルを out/ に書き出しました。");
