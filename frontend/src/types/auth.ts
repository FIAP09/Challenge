import type { AppModule, AppSubmodule } from '@/types/app-access'

export type UserRole = 'super_admin' | 'hospital_admin' | 'medico' | 'enfermeiro'

/** Quando presente, lista apenas modulos/submodulos concedidos ao usuario (retorno da API). */
export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  hospital_id: number
  is_active: boolean
  modules?: AppModule[]
  submodules?: AppSubmodule[]
}
export interface LoginPayload { email: string; password: string }
export interface LoginResponse { access_token: string; token_type: string }
