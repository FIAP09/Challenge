export type AppModule = 'dashboard' | 'cirurgias' | 'alertas' | 'pacientes' | 'equipe' | 'orientacoes'

export type AppSubmodule =
  | 'resumo'
  | 'lista_pacientes'
  | 'detalhe_paciente'
  | 'painel_alertas'
  | 'registro_cirurgia'

export type UserModuleGrants = {
  modules?: AppModule[]
  submodules?: AppSubmodule[]
}
