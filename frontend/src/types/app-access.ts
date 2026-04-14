export type AppModule = 'dashboard' | 'cirurgias' | 'monitor' | 'alertas' | 'pacientes' | 'equipe'

export type AppSubmodule =
  | 'resumo'
  | 'lista_cirurgias'
  | 'monitor_tempo_real'
  | 'painel_alertas'
  | 'lista_pacientes'
  | 'detalhe_paciente'

/** Lista apenas o que o backend concedeu ao usuario (sem flags false por item). */
export type UserModuleGrants = {
  modules?: AppModule[]
  submodules?: AppSubmodule[]
}
