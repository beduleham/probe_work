import Link from 'next/link';

export default function LoginPage() {
  return (
    <section className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-xl font-bold text-slate-900">PROBE 교육문의</h1>
      <p className="mt-2 text-sm text-slate-600">사내 업무 계정으로 로그인하세요.</p>
      {/* 사내 OAuth 연동 전까지는 Mock 세션으로 대시보드에 진입한다. */}
      <Link
        href="/calendar"
        className="mt-6 flex min-h-11 items-center justify-center rounded-lg bg-brand-600 text-sm font-medium text-white hover:bg-brand-700"
      >
        사내 계정으로 계속하기
      </Link>
    </section>
  );
}
