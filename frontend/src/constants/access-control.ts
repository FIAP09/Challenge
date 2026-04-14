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
    modules: ['dashboard', 'cirurgias', 'monitor', 'alertas', 'pacientes', 'equipe'],
    submodules: ['resumo', 'lista_cirurgias', 'monitor_tempo_real', 'painel_alertas', 'lista_pacientes', 'detalhe_paciente'],
  },
  hospital_admin: {
    modules: ['dashboard', 'cirurgias', 'monitor', 'alertas', 'pacientes', 'equipe'],
    submodules: ['resumo', 'lista_cirurgias', 'monitor_tempo_real', 'painel_alertas', 'lista_pacientes', 'detalhe_paciente'],
  },
  medico: {
    modules: ['dashboard', 'cirurgias', 'monitor', 'alertas', 'pacientes', 'equipe'],
    submodules: ['resumo', 'lista_cirurgias', 'monitor_tempo_real', 'painel_alertas', 'lista_pacientes', 'detalhe_paciente'],
  },
  enfermeiro: {
    modules: ['dashboard', 'cirurgias', 'monitor', 'alertas'],
    submodules: ['resumo', 'lista_cirurgias', 'monitor_tempo_real', 'painel_alertas'],
  },
}

const contextAccess: Record<ViewContextType, AccessRule> = {
  acompanhante: {
    modules: ['dashboard', 'alertas'],
    submodules: ['resumo', 'painel_alertas'],
  },
  paciente: {
    modules: ['dashboard'],
    submodules: ['resumo'],
  },
  equipe_cirurgia: {
    modules: ['dashboard', 'cirurgias', 'monitor', 'alertas', 'pacientes', 'equipe'],
    submodules: ['resumo', 'lista_cirurgias', 'monitor_tempo_real', 'painel_alertas', 'lista_pacientes', 'detalhe_paciente'],
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

/** Modulos efetivos: lista da API, se enviada; senao intersecao perfil x contexto (demo / fallback). */
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
