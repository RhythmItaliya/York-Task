import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/auth/AuthLayout'
import { FormField } from '../components/ui/FormField'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { registerUser, AuthError } from '../lib/mockAuth'
import { registerSchema, type RegisterFormValues } from '../lib/validation'

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  async function onSubmit(values: RegisterFormValues): Promise<void> {
    setLoading(true)
    setFormError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 400))
      registerUser(values)
      navigate('/dashboard')
    } catch (err) {
      setFormError(
        err instanceof AuthError ? err.message : 'Registration failed. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Create your account" subtitle="Start in minutes.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <FormField
          type="text"
          placeholder="Full name"
          autoComplete="name"
          error={errors.name}
          {...register('name')}
        />
        <FormField
          type="email"
          placeholder="Email"
          autoComplete="email"
          error={errors.email}
          {...register('email')}
        />
        <FormField
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          error={errors.password}
          {...register('password')}
        />
        <FormField
          type="password"
          placeholder="Confirm password"
          autoComplete="new-password"
          error={errors.confirmPassword}
          {...register('confirmPassword')}
        />

        {formError && <p className="text-sm text-red-600">{formError}</p>}

        <PrimaryButton type="submit" loading={loading}>
          Create account
        </PrimaryButton>
      </form>

      <p className="mt-4 text-center text-sm text-[var(--color-muted)]">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-slate-900 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
