import { Plus, Pencil, X, Sparkles } from 'lucide-react'
import type { CurrentUser } from '../../types/auth'

/**
 * Right rail on the Jobs page, ported from `demo ui`'s `RightRail` — user
 * plan chip, Saved Filters card, and Up Next card. Static/non-interactive
 * (no filter or dismiss logic wired up), using the logged-in demo user's
 * name instead of a hardcoded one.
 */
export function RightRail({ user }: { user: CurrentUser }) {
  const initial = user.name.charAt(0).toUpperCase()

  return (
    <aside className="w-72 shrink-0 space-y-4 hidden xl:block">
      <div className="bg-white border border-[var(--color-border)] rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-full bg-[var(--jobright-mint)] grid place-items-center text-xs font-bold">
            {initial}
          </div>
          <span className="font-semibold text-slate-900">{user.name}</span>
          <span className="ml-auto text-xs bg-[var(--jobright-mint)]/20 text-[var(--jobright-ink)] px-2 py-0.5 rounded-md font-semibold">
            Turbo Plan
          </span>
        </div>
      </div>

      <div className="bg-white border border-[var(--color-border)] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-slate-900">Your Saved Filters</h3>
          <button className="size-6 rounded-full bg-slate-100 grid place-items-center hover:bg-slate-200">
            <Plus className="size-3.5" />
          </button>
        </div>
        <div className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-1 h-5 bg-[var(--jobright-mint)] rounded shrink-0" />
            <span className="text-sm font-medium text-slate-900 truncate">
              Full Stack Engineer, US
            </span>
          </div>
          <Pencil className="size-3.5 text-[var(--color-muted)] shrink-0" />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3 text-slate-900">Up Next</h3>
        <div className="bg-gradient-to-br from-[var(--jobright-mint)]/30 to-purple-200/40 border border-[var(--color-border)] rounded-2xl p-4 relative">
          <button className="absolute top-3 right-3 text-[var(--color-muted)] hover:text-slate-900">
            <X className="size-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="size-4" />
            <span className="font-semibold text-sm text-slate-900">Turbo Office Hour</span>
          </div>
          <p className="text-xs text-[var(--color-muted)] mb-1">Jun 4 · Thu · 6:30 PM PST</p>
          <p className="text-xs text-slate-700 mb-3">
            Get insider career advice in this Turbo Member exclusive 1-hour live Q&amp;A with a
            Senior Recruiter
          </p>
          <button className="w-full h-9 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:opacity-90">
            Save My Spot Now
          </button>
        </div>
      </div>
    </aside>
  )
}
