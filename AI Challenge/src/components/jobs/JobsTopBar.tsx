import { Search, Sparkles } from 'lucide-react'

export type JobsTab = 'Recommended' | 'Liked' | 'Applied' | 'External'

const TABS: { label: JobsTab; count: number | null }[] = [
  { label: 'Recommended', count: null },
  { label: 'Liked', count: 1 },
  { label: 'Applied', count: 53 },
  { label: 'External', count: 2 },
]

interface JobsTopBarProps {
  activeTab: JobsTab
  onTabChange: (tab: JobsTab) => void
}

/**
 * Jobs page top bar, ported from `demo ui`'s `index.tsx` — title, tab list
 * with counts, search input, and the coaching CTA. Filter chips/sub-bars
 * from the original are intentionally omitted (no filtering logic wired up
 * yet); only the tab switcher, search box and CTA are functional here.
 */
export function JobsTopBar({ activeTab, onTabChange }: JobsTopBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur border-b border-[var(--color-border)]">
      <div className="flex items-center gap-3 md:gap-6 px-4 md:px-8 pt-4 md:pt-6 pb-3 flex-wrap">
        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">JOBS</h1>
        <span className="text-[var(--color-muted)] hidden sm:inline">›</span>

        <div className="flex items-center gap-3 sm:gap-5 overflow-x-auto -mx-1 px-1">
          {TABS.map((t) => {
            const active = t.label === activeTab
            return (
              <button
                key={t.label}
                type="button"
                onClick={() => onTabChange(t.label)}
                className={`shrink-0 text-sm font-semibold flex items-center gap-1.5 pb-1 border-b-2 transition-colors ${
                  active
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-[var(--color-muted)] hover:text-slate-900'
                }`}
              >
                {t.label}
                {t.count !== null && (
                  <span
                    className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded font-bold ${
                      active ? 'bg-slate-900 text-white' : 'bg-slate-100 text-[var(--color-muted)]'
                    }`}
                  >
                    {t.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="md:ml-auto flex items-center gap-2 md:gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-muted)]" />
            <input
              placeholder="Search by title or company"
              className="w-full md:w-72 h-10 pl-10 pr-4 rounded-full bg-slate-100 text-sm outline-none focus:ring-2 focus:ring-[var(--jobright-mint)] transition-shadow"
            />
          </div>
          <button className="h-10 px-4 rounded-full bg-slate-900 text-white text-sm font-semibold flex items-center gap-2 hover:opacity-90 shrink-0">
            <Sparkles className="size-4" />
            <span className="hidden lg:inline">Claim Your 45-min Coaching</span>
            <span className="lg:hidden">Coaching</span>
          </button>
        </div>
      </div>
    </div>
  )
}
