import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import type { CurrentUser } from '../../types/auth'

interface DashboardLayoutProps {
  user: CurrentUser
  onLogout: () => void
  children?: ReactNode
  /** Skip the default content padding when the page manages its own (e.g. Jobs). */
  noPadding?: boolean
}

/**
 * Shared authenticated-area layout: sidebar on the left, content area on the
 * right. `children` is intentionally optional/blank so pages can render
 * whatever they need inside the content area without duplicating the shell.
 */
export function DashboardLayout({
  user,
  onLogout,
  children,
  noPadding = false,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50 pt-14 md:pt-0">
      <Sidebar user={user} onLogout={onLogout} />
      <main className={`flex-1 min-w-0 ${noPadding ? '' : 'p-6'}`}>{children}</main>
    </div>
  )
}
