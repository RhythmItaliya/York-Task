import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/auth/AuthLayout'
import { FormField } from '../components/ui/FormField'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { loginUser, AuthError, DEMO_ACCOUNT } from '../lib/mockAuth'
import { loginSchema, type LoginFormValues } from '../lib/validation'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: DEMO_ACCOUNT,
  })

  async function onSubmit(values: LoginFormValues): Promise<void> {
    setLoading(true)
    setFormError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 400))
      loginUser(values)
      navigate('/dashboard')
    } catch (err) {
      setFormError(err instanceof AuthError ? err.message : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
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
          autoComplete="current-password"
          error={errors.password}
          {...register('password')}
        />

        {formError && <p className="text-sm text-red-600">{formError}</p>}

        <PrimaryButton type="submit" loading={loading}>
          Sign in
        </PrimaryButton>
      </form>

      <p className="mt-4 text-center text-sm text-[var(--color-muted)]">
        New here?{' '}
        <Link to="/register" className="font-medium text-slate-900 hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  )
}
