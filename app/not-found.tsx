import Link from "next/link"
import { notFoundContent } from "@/content/global"

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-wider text-teal">// 404 ──→ ?</p>
      <p className="mt-6 max-w-md text-lg text-ink-70">{notFoundContent.message}</p>
      <Link
        href={notFoundContent.cta.href}
        className="mt-8 rounded bg-teal px-6 py-3 text-base font-semibold text-on-brand transition-transform hover:-translate-y-0.5 hover:shadow-teal"
      >
        {notFoundContent.cta.label}
      </Link>
    </main>
  )
}
