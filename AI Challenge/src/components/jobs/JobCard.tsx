import {
  Heart,
  Ban,
  Sparkles,
  MoreHorizontal,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
} from 'lucide-react'
import type { Job } from '../../data/mockJobs'

/**
 * Job listing card, ported from `demo ui`'s `JobCard.tsx` — same layout,
 * match-score gradient panel with animated ring, tags, meta row and action
 * buttons (block / like / ask ORION / apply). Adapted only to drop the
 * TanStack Router `Link` (no job detail route exists yet, so the card is a
 * plain `div`) and to use this app's CSS variables for the mint/ink tokens.
 */
export function JobCard({ job }: { job: Job }) {
  const isGood = job.matchScore >= 75
  const isFair = job.matchScore >= 50 && job.matchScore < 75
  const matchColor = isGood
    ? 'from-emerald-950 to-emerald-900'
    : isFair
      ? 'from-slate-800 to-slate-900'
      : 'from-slate-800 to-slate-950'

  return (
    <div className="group bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:shadow-lg hover:border-[var(--jobright-mint)]/60 transition-all duration-200">
      {/* Left: Job content */}
      <div className="flex-1 min-w-0 p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className="size-10 sm:size-12 rounded-lg grid place-items-center font-bold text-white shrink-0 text-sm sm:text-base"
            style={{ backgroundColor: job.companyColor }}
          >
            {job.companyInitial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-[11px] sm:text-xs text-[var(--color-muted)]">
                {job.postedAgo}
              </span>
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] sm:text-xs bg-[var(--jobright-mint)]/15 text-[var(--jobright-ink)] px-2 py-0.5 rounded-md font-medium"
                >
                  {tag}
                </span>
              ))}
              <button className="ml-auto text-[var(--color-muted)] hover:text-slate-900 shrink-0">
                <MoreHorizontal className="size-4" />
              </button>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 break-words group-hover:text-[var(--jobright-mint-dark)] transition-colors">
              {job.title}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-muted)] mb-4 break-words">
              <span className="font-semibold text-slate-900">{job.company}</span>
              <span className="mx-1.5">/</span>
              {job.industry} <span className="mx-1">·</span> {job.stage}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-700 min-w-0">
                <MapPin className="size-3.5 text-[var(--color-muted)] shrink-0" />
                <span className="truncate">{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 min-w-0">
                <Briefcase className="size-3.5 text-[var(--color-muted)] shrink-0" />
                <span className="truncate">{job.type}</span>
              </div>
              {job.salary ? (
                <div className="flex items-center gap-2 text-slate-700 min-w-0">
                  <DollarSign className="size-3.5 text-[var(--color-muted)] shrink-0" />
                  <span className="truncate">{job.salary}</span>
                </div>
              ) : (
                <div className="hidden lg:block" />
              )}
              <div className="flex items-center gap-2 text-slate-700 min-w-0">
                <span className="size-3.5 inline-flex items-center justify-center text-[var(--color-muted)] shrink-0">
                  🏠
                </span>
                <span className="truncate">{job.workMode}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 min-w-0">
                <Calendar className="size-3.5 text-[var(--color-muted)] shrink-0" />
                <span className="truncate">{job.level}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 min-w-0">
                <Clock className="size-3.5 text-[var(--color-muted)] shrink-0" />
                <span className="truncate">{job.experience}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--color-border)] gap-2 flex-wrap">
          <span className="text-[11px] sm:text-xs text-[var(--color-muted)]">{job.applicants}</span>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              className="size-9 rounded-full border border-[var(--color-border)] grid place-items-center hover:bg-slate-50 shrink-0"
              aria-label="Not interested"
            >
              <Ban className="size-4 text-[var(--color-muted)]" />
            </button>
            <button
              type="button"
              className="size-9 rounded-full border border-[var(--color-border)] grid place-items-center hover:bg-slate-50 shrink-0"
              aria-label="Save job"
            >
              <Heart className="size-4 text-[var(--color-muted)]" />
            </button>
            <button
              type="button"
              className="px-3 sm:px-4 h-9 rounded-full border border-[var(--color-border)] text-[11px] sm:text-sm font-semibold flex items-center gap-1.5 hover:bg-slate-50"
            >
              <Sparkles className="size-3.5" /> <span className="hidden xs:inline">ASK ORION</span>
              <span className="xs:hidden">ORION</span>
            </button>
            <button
              type="button"
              className="px-3 sm:px-5 h-9 rounded-full bg-[var(--jobright-mint)] text-[var(--jobright-ink)] text-[11px] sm:text-sm font-bold hover:bg-[var(--jobright-mint-dark)] transition-colors"
            >
              <span className="hidden sm:inline">APPLY WITH AUTOFILL</span>
              <span className="sm:hidden">APPLY</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right: Match score panel */}
      <div
        className={`relative w-full sm:w-44 bg-gradient-to-br ${matchColor} text-white p-5 flex flex-row sm:flex-col items-center justify-center gap-4 sm:gap-0 shrink-0 order-first sm:order-last`}
      >
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
          <div className="absolute top-2 right-[-20px] rotate-45 bg-[var(--jobright-mint)] text-[var(--jobright-ink)] text-[9px] font-bold py-0.5 px-5">
            ✦
          </div>
        </div>
        <MatchRing score={job.matchScore} />
        <div className="text-xs font-bold tracking-wider mt-2 text-white/90">{job.matchLabel}</div>
        {job.h1bSponsor && (
          <div className="text-[10px] mt-3 text-[var(--jobright-mint)] font-medium">
            ✓ H1B Sponsor Likely
          </div>
        )}
      </div>
    </div>
  )
}

function MatchRing({ score }: { score: number }) {
  const r = 30
  const c = 2 * Math.PI * r
  const dash = (score / 100) * c
  return (
    <div className="relative size-20">
      <svg viewBox="0 0 80 80" className="size-20 -rotate-90">
        <circle cx="40" cy="40" r={r} stroke="rgba(255,255,255,0.15)" strokeWidth="5" fill="none" />
        <circle
          cx="40"
          cy="40"
          r={r}
          stroke="var(--jobright-mint)"
          strokeWidth="5"
          fill="none"
          strokeDasharray={`${dash} ${c}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-2xl font-bold">
          {score}
          <span className="text-xs">%</span>
        </div>
      </div>
    </div>
  )
}
