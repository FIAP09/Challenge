import { API } from '@/constants/api-routes'
import { useApiFetch } from '@/lib/useApiFetch'
import type { LoginPayload, LoginResponse, User, UserRole } from '@/types/auth'

const MOCK_TOKEN_PREFIX = 'mock'

const resolveMockRoleByEmail = (email: string): UserRole => {
  const normalizedEmail = email.toLowerCase()
  if (normalizedEmail.includes('super')) return 'super_admin'
  if (normalizedEmail.includes('admin')) return 'hospital_admin'
  if (normalizedEmail.includes('enfer')) return 'enfermeiro'
  return 'medico'
}

const resolveMockRoleFromToken = (token: string): UserRole | null => {
  const match = token.match(new RegExp(`^${MOCK_TOKEN_PREFIX}\\.([a-z_]+)\\.token$`))
  if (!match?.[1]) return null

  const role = match[1] as UserRole
  const allowedRoles: UserRole[] = ['super_admin', 'hospital_admin', 'medico', 'enfermeiro']
  return allowedRoles.includes(role) ? role : null
}

const buildMockUser = (role: UserRole, email = 'hugo@hospital.com'): User => ({
  id: 1,
  name: role === 'enfermeiro' ? 'Enf. Hugo Lima' : 'Dr. Hugo Lima',
  email,
  role,
  hospital_id: 1,
  is_active: true,
})

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data, error } = await useApiFetch(API.auth.login).post(payload).json<LoginResponse>()

    if (error.value || !data.value) {
      // Fallback local para garantir fluxo de desenvolvimento mesmo sem mockoon ativo.
      const role = resolveMockRoleByEmail(payload.email)
      return {
        access_token: `${MOCK_TOKEN_PREFIX}.${role}.token`,
        token_type: 'bearer',
      }
    }

    return data.value
  },
  async me(tokenOverride?: string): Promise<User> {
    const headers = tokenOverride
      ? {
          Authorization: `Bearer ${tokenOverride}`,
        }
      : undefined

    const request = useApiFetch(API.auth.me, { headers })
    const { data, error } = await request.get().json<User>()

    if (error.value || !data.value) {
      const role = tokenOverride ? resolveMockRoleFromToken(tokenOverride) : null
      return buildMockUser(role ?? 'medico')
    }

    return data.value
  },
}
