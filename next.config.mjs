/**
 * 通常（npm run dev / build / start）は普通の Next.js として動く。
 * 公開用（npm run build:pages）のときだけ、静的ファイルに書き出して、
 * GitHub Pages のプロジェクトサイト（/<リポジトリ名>/）の下で動くようにする。
 */
const isPages = process.env.DEPLOY_TARGET === "pages";
const basePath = isPages ? (process.env.BASE_PATH ?? "") : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
