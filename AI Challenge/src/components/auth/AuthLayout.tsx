import type { ReactNode } from 'react'
import { Briefcase } from 'lucide-react'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="size-9 rounded-full bg-[var(--color-mint)] grid place-items-center">
            <Briefcase className="size-5 text-[var(--color-ink)]" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">AI Challenge</span>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-1 text-slate-900">{title}</h1>
          <p className="text-sm text-[var(--color-muted)] mb-5">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  )
}
