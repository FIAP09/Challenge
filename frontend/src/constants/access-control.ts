import type { UserRole } from '@/types/auth'
import type { AppModule, AppSubmodule, UserModuleGrants } from '@/types/app-access'
import type { ViewContextType } from './view-as'

export type { AppModule, AppSubmodule, UserModuleGrants } from '@/types/app-access'

interface AccessRule {
  modules: AppModule[]
  submodules: AppSubmodule[]
}

const roleAccess: Record<UserRole, AccessRule> = {
  super_admin: {
    modules: ['dashboard', 'cirurgias', 'alertas', 'pacientes', 'equipe', 'orientacoes'],
    submodules: ['resumo', 'lista_pacientes', 'detalhe_paciente', 'painel_alertas', 'registro_cirurgia'],
  },
  hospital_admin: {
    modules: ['dashboard', 'cirurgias', 'alertas', 'pacientes', 'equipe', 'orientacoes'],
    submodules: ['resumo', 'lista_pacientes', 'detalhe_paciente', 'painel_alertas', 'registro_cirurgia'],
  },
  medico: {
    modules: ['dashboard', 'cirurgias', 'alertas', 'pacientes', 'equipe', 'orientacoes'],
    submodules: ['resumo', 'lista_pacientes', 'detalhe_paciente', 'painel_alertas', 'registro_cirurgia'],
  },
  enfermeiro: {
    modules: ['dashboard', 'alertas', 'pacientes', 'orientacoes'],
    submodules: ['resumo', 'lista_pacientes', 'painel_alertas'],
  },
}

const contextAccess: Record<ViewContextType, AccessRule> = {
  acompanhante: {
    modules: ['dashboard', 'alertas', 'pacientes', 'orientacoes'],
    submodules: ['resumo', 'painel_alertas', 'detalhe_paciente'],
  },
  paciente: {
    modules: ['dashboard', 'pacientes', 'orientacoes'],
    submodules: ['resumo', 'detalhe_paciente'],
  },
  equipe_cirurgia: {
    modules: ['dashboard', 'cirurgias', 'alertas', 'pacientes', 'equipe', 'orientacoes'],
    submodules: ['resumo', 'lista_pacientes', 'detalhe_paciente', 'painel_alertas', 'registro_cirurgia'],
  },
}

function defaultModulesFor(role: UserRole, context: ViewContextType): AppModule[] {
  const a = roleAccess[role].modules
  const b = contextAccess[context].modules
  return a.filter((m) => b.includes(m))
}

function defaultSubmodulesFor(role: UserRole, context: ViewContextType): AppSubmodule[] {
  const a = roleAccess[role].submodules
  const b = contextAccess[context].submodules
  return a.filter((s) => b.includes(s))
}

export function getEffectiveModules(
  role: UserRole,
  context: ViewContextType,
  grants?: UserModuleGrants | null,
): AppModule[] {
  if (grants?.modules !== undefined) {
    return grants.modules
  }
  return defaultModulesFor(role, context)
}

export function getEffectiveSubmodules(
  role: UserRole,
  context: ViewContextType,
  grants?: UserModuleGrants | null,
): AppSubmodule[] {
  if (grants?.submodules !== undefined) {
    return grants.submodules
  }
  return defaultSubmodulesFor(role, context)
}

export function canAccessModule(
  role: UserRole,
  context: ViewContextType,
  moduleName: AppModule,
  grants?: UserModuleGrants | null,
): boolean {
  return getEffectiveModules(role, context, grants).includes(moduleName)
}

export function canAccessSubmodule(
  role: UserRole,
  context: ViewContextType,
  submoduleName: AppSubmodule,
  grants?: UserModuleGrants | null,
): boolean {
  return getEffectiveSubmodules(role, context, grants).includes(submoduleName)
}

export function userModuleGrants(user: { modules?: AppModule[]; submodules?: AppSubmodule[] } | null): UserModuleGrants | null {
  if (!user) return null
  if (user.modules === undefined && user.submodules === undefined) return null
  return { modules: user.modules, submodules: user.submodules }
}
