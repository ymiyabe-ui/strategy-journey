// 公開：公開用ビルドを作り、gh-pages ブランチへ置く（GitHub Pages がそこから配信する）
// 前提：このフォルダが Git リポジトリで、origin が GitHub のリポジトリを指していること。
import { execFileSync, spawnSync } from "node:child_process";
import { cpSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: "inherit" });
  if (r.status !== 0) {
    console.error(`失敗しました: ${cmd} ${args.join(" ")}`);
    process.exit(r.status ?? 1);
  }
}
const out = (cmd, args) => execFileSync(cmd, args, { encoding: "utf8" }).trim();

run("node", ["scripts/build-pages.mjs"]);

const remote = out("git", ["remote", "get-url", "origin"]);
const name = out("git", ["config", "user.name"]);
const email = out("git", ["config", "user.email"]);
const rev = out("git", ["rev-parse", "--short", "HEAD"]);

const tmp = mkdtempSync(join(tmpdir(), "strategy-journey-pages-"));
try {
  cpSync("out", tmp, { recursive: true });
  const git = (...args) => run("git", ["-C", tmp, ...args]);
  git("init", "-q", "-b", "gh-pages");
  git("add", "-A");
  git("-c", `user.name=${name}`, "-c", `user.email=${email}`, "commit", "-q", "-m", `deploy: ${rev}`);
  git("push", "-f", remote, "gh-pages");
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
console.log("\ngh-pages ブランチへ公開用ファイルを置きました。反映まで1〜2分かかります。");
