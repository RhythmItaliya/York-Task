/**
 * Small, reusable Tailwind class fragments shared across auth components.
 * Keeping them here avoids repeating the same long utility strings in every
 * input/button and keeps styling changes centralized to one place.
 */

export const inputClass =
  'w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[var(--color-mint)]'

export const fieldErrorClass = 'mt-1 text-xs text-red-600'

export const primaryButtonClass =
  'w-full rounded-lg bg-[var(--color-mint)] text-[var(--color-ink)] px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50'
