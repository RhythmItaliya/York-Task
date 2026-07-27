/**
 * Shared auth-related types, used by the mock auth store and the UI layer.
 */

export interface CurrentUser {
  name: string
  email: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}
