import type { ButtonHTMLAttributes } from 'react'
import { primaryButtonClass } from '../../styles/classNames'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  loadingText?: string
}

/** Shared submit button for auth forms, with a built-in loading state. */
export function PrimaryButton({
  loading = false,
  loadingText = 'Please wait…',
  children,
  disabled,
  ...buttonProps
}: PrimaryButtonProps) {
  return (
    <button className={primaryButtonClass} disabled={disabled || loading} {...buttonProps}>
      {loading ? loadingText : children}
    </button>
  )
}
