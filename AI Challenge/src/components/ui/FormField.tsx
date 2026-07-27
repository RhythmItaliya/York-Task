import type { InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'
import { inputClass, fieldErrorClass } from '../../styles/classNames'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
}

/**
 * Labeled-by-placeholder text input with inline validation error, shared by
 * every auth form field (Login and Register) to avoid repeating markup.
 */
export function FormField({ error, className, ...inputProps }: FormFieldProps) {
  return (
    <div>
      <input className={className ?? inputClass} {...inputProps} />
      {error && <p className={fieldErrorClass}>{error.message}</p>}
    </div>
  )
}
