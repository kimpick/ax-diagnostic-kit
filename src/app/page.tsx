export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="max-w-md text-center">
        <p className="mb-2 text-xs font-medium tracking-widest text-neutral-500 uppercase">
          AX Diagnostic Kit
        </p>
        <h1 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          AI 활용 역량 진단
        </h1>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          &ldquo;AI를 안다&rdquo;가 아니라 &ldquo;AI로 일할 수 있다&rdquo;를 측정합니다.
        </p>
      </div>

      <div className="rounded-lg border border-neutral-200 px-4 py-3 text-xs text-neutral-500 dark:border-neutral-800">
        개발 중 · S0 (프로젝트 골격)
      </div>
    </main>
  );
}
