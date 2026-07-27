import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Briefcase,
  FileText,
  User,
  Sparkles,
  MessagesSquare,
  Mic,
  Gift,
  Bell,
  MessageSquareWarning,
  Settings,
  Menu,
  X,
  LogOut,
} from 'lucide-react'
import type { CurrentUser } from '../../types/auth'

/**
 * Sidebar ported from `demo ui`'s `AppSidebar.tsx` — same structure, colors,
 * font sizes, spacing and icon set. Adapted only where it must differ:
 * - `react-router-dom` instead of `@tanstack/react-router`.
 * - Bottom utility items (Messages/Feedback/Settings) are static since this
 *   app has no modal system yet — clicking them is a no-op placeholder.
 * - User/session data comes from the local mock auth store instead of Supabase.
 */

const navItems = [
  { to: '/dashboard', label: 'Jobs', icon: Briefcase },
  { to: '/resume', label: 'Resume', icon: FileText },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/agent', label: 'AI Agent', icon: Sparkles, badge: 'AI' },
  { to: '/coaching', label: 'Coaching', icon: MessagesSquare },
  { to: '/interview', label: 'Interview', icon: Mic, badge: 'NEW' },
]

const bottomItems = [
  { key: 'messages', label: 'Messages', icon: Bell },
  { key: 'feedback', label: 'Feedback', icon: MessageSquareWarning },
  { key: 'settings', label: 'Settings', icon: Settings },
]

interface SidebarBodyProps {
  user: CurrentUser
  onLogout: () => void
  onNavigate?: () => void
}

/** Jobright logomark, reused by both the mobile top bar and the sidebar header. */
function JobrightLogo({
  size = 'size-8',
  iconSize = 'size-5',
}: {
  size?: string
  iconSize?: string
}) {
  return (
    <div className={`${size} rounded-full bg-[var(--jobright-mint)] grid place-items-center`}>
      <svg
        viewBox="0 0 24 24"
        className={`${iconSize} text-[var(--jobright-ink)]`}
        fill="currentColor"
      >
        <path d="M3 12c0-4.4 3.6-8 8-8s8 3.6 8 8c0 2.2-.9 4.2-2.3 5.6L21 21l-3.5-3.5C16.2 18.5 14.2 19 12 19c-4.9 0-9-3.1-9-7z" />
      </svg>
    </div>
  )
}

function SidebarBody({ user, onLogout, onNavigate }: SidebarBodyProps) {
  const { pathname } = useLocation()

  return (
    <>
      <div className="px-6 py-5 flex items-center gap-2">
        <JobrightLogo />
        <span className="font-bold text-lg tracking-tight">Jobright</span>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon, badge }) => {
          const active = pathname === to
          return (
            <Link
              key={to}
              to={to}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]'
                  : 'text-[var(--sidebar-foreground)]/70 hover:bg-[var(--sidebar-accent)]/50 hover:text-[var(--sidebar-foreground)]'
              }`}
            >
              <Icon className={`size-4 ${active ? 'text-[var(--jobright-mint-dark)]' : ''}`} />
              <span>{label}</span>
              {badge && (
                <span className="ml-auto text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded">
                  {badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-3 border-t border-[var(--sidebar-border)]">
        <div className="bg-[var(--sidebar-accent)]/60 rounded-xl p-3 mb-3">
          <div className="flex items-center gap-2 text-sm font-semibold mb-1">
            <Gift className="size-4" /> Refer &amp; Earn
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            Invite friends or share on LinkedIn to earn extra rewards!
          </p>
        </div>
        <div className="space-y-1">
          {bottomItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={onNavigate}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--sidebar-foreground)]/70 hover:bg-[var(--sidebar-accent)]/50 hover:text-[var(--sidebar-foreground)] transition-colors text-left"
            >
              <Icon className="size-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <UserChip user={user} onLogout={onLogout} />
      </div>
    </>
  )
}

function UserChip({ user, onLogout }: { user: CurrentUser; onLogout: () => void }) {
  const name = user.name || user.email.split('@')[0] || 'Account'
  const initial = name.charAt(0).toUpperCase()
  return (
    <div className="mt-3 flex items-center gap-2 px-2 py-2 rounded-lg bg-[var(--sidebar-accent)]/40">
      <div className="size-8 rounded-full bg-[var(--jobright-mint)] text-[var(--jobright-ink)] grid place-items-center text-sm font-bold">
        {initial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium truncate">{name}</div>
        <div className="text-xs text-[var(--color-muted)] truncate">{user.email}</div>
      </div>
      <button
        onClick={onLogout}
        aria-label="Sign out"
        className="size-8 rounded-md grid place-items-center hover:bg-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--sidebar-foreground)]"
      >
        <LogOut className="size-4" />
      </button>
    </div>
  )
}

interface SidebarProps {
  user: CurrentUser
  onLogout: () => void
}

export function Sidebar({ user, onLogout }: SidebarProps) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 h-14 z-50 bg-[var(--sidebar)]/95 backdrop-blur border-b border-[var(--sidebar-border)] flex items-center px-4 gap-3">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="size-9 rounded-lg grid place-items-center hover:bg-[var(--color-border)]"
        >
          <Menu className="size-5" />
        </button>
        <div className="flex items-center gap-2">
          <JobrightLogo size="size-7" iconSize="size-4" />
          <span className="font-bold tracking-tight">Jobright</span>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 max-w-[85%] bg-[var(--sidebar)] border-r border-[var(--sidebar-border)] flex flex-col">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute top-3 right-3 size-8 rounded-lg grid place-items-center hover:bg-[var(--color-border)]"
            >
              <X className="size-4" />
            </button>
            <SidebarBody user={user} onLogout={onLogout} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] h-screen sticky top-0">
        <SidebarBody user={user} onLogout={onLogout} />
      </aside>
    </>
  )
}
