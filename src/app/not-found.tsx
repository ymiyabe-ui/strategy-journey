import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="text-6xl" aria-hidden>
        🧭
      </p>
      <h1 className="font-display mt-4 text-2xl font-extrabold text-paper-50">道に迷ってしまいました</h1>
      <p className="mt-2 text-[14px] text-paper-300/80">このページは、地図にありません。</p>
      <Link
        href="/map"
        className="mt-6 inline-flex h-12 items-center rounded-full bg-gradient-to-b from-lantern-300 to-lantern-500 px-7 text-[15px] font-bold text-ink-900"
      >
        地図にもどる
      </Link>
    </main>
  );
}
