import type { CurrentUser, LoginCredentials, RegisterInput } from '../types/auth'

/**
 * Mock/demo authentication store.
 *
 * ⚠️ DEMO ONLY — this is NOT secure. Passwords are stored in plain text in
 * localStorage with no hashing, no server-side validation, and no session
 * protection. This exists only to let the Login/Register UI work end-to-end
 * without a real backend. Replace with a real API + hashed passwords +
 * server-issued sessions before this app handles real user data.
 */

interface StoredUser extends RegisterInput {}

const USERS_KEY = 'demo_auth_users'
const SESSION_KEY = 'demo_auth_session'
const SEEDED_FLAG_KEY = 'demo_auth_seeded'

export const DEMO_ACCOUNT: LoginCredentials = {
  email: 'demo@example.com',
  password: 'demo1234',
}

export class AuthError extends Error {}

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as StoredUser[]) : []
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function startSession(user: StoredUser): CurrentUser {
  const session: CurrentUser = { name: user.name, email: user.email }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

/** Seed a demo account once so login works without registering first. */
export function seedDemoAccount(): void {
  if (localStorage.getItem(SEEDED_FLAG_KEY)) return

  const users = readUsers()
  const demoEmail = normalizeEmail(DEMO_ACCOUNT.email)
  if (!users.some((user) => normalizeEmail(user.email) === demoEmail)) {
    users.push({ name: 'Demo User', ...DEMO_ACCOUNT })
    writeUsers(users)
  }
  localStorage.setItem(SEEDED_FLAG_KEY, '1')
}

/** Register a new demo user. Throws AuthError if the email is already taken. */
export function registerUser(input: RegisterInput): CurrentUser {
  const users = readUsers()
  const email = normalizeEmail(input.email)

  if (users.some((user) => normalizeEmail(user.email) === email)) {
    throw new AuthError('An account with this email already exists.')
  }

  const newUser: StoredUser = {
    name: input.name.trim(),
    email: input.email.trim(),
    password: input.password,
  }
  users.push(newUser)
  writeUsers(users)

  return startSession(newUser)
}

/** Validate credentials against stored demo users. Throws AuthError on mismatch. */
export function loginUser(credentials: LoginCredentials): CurrentUser {
  const users = readUsers()
  const email = normalizeEmail(credentials.email)
  const match = users.find((user) => normalizeEmail(user.email) === email)

  if (!match || match.password !== credentials.password) {
    throw new AuthError('Invalid email or password.')
  }

  return startSession(match)
}

export function getCurrentUser(): CurrentUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as CurrentUser) : null
  } catch {
    return null
  }
}

export function logoutUser(): void {
  localStorage.removeItem(SESSION_KEY)
}
