import type { PatientJourneyType } from '@/types/patient-journey'

export type ViewContextType = 'acompanhante' | 'paciente' | 'equipe_cirurgia'

export interface ViewAsOption {
  id: string
  name: string
  roleLabel: string
  context: ViewContextType
  institution: string
  details: string
  /** Perfil paciente: tipo de jornada clínica (demo). */
  patientJourney?: PatientJourneyType
  /** Acompanhante: jornada do paciente vinculado (demo). */
  linkedPatientJourney?: PatientJourneyType
  /** Acompanhante: nome do paciente para textos (demo). */
  linkedPatientDisplayName?: string
  /** Acompanhante: id do perfil paciente em VIEW_AS (avaliações e mock alinhados). */
  linkedPatientProfileId?: string
}

export const VIEW_CONTEXT_LABELS: Record<ViewContextType, string> = {
  acompanhante: 'Acompanhante',
  paciente: 'Paciente',
  equipe_cirurgia: 'Equipe médica',
}

/** Perfil cujo painel de jornada deve receber avaliações (paciente = próprio id; acompanhante = paciente vinculado). */
export function evaluationSubjectProfileId(option: ViewAsOption | null): string | null {
  if (!option) return null
  if (option.context === 'paciente') return option.id
  if (option.context === 'acompanhante') return option.linkedPatientProfileId ?? null
  return null
}

export const VIEW_AS_OPTIONS: ViewAsOption[] = [
  {
    id: 'cmp-ana-familia',
    name: 'Ana Souza',
    roleLabel: 'Acompanhante',
    context: 'acompanhante',
    institution: 'Hospital São Gabriel',
    details: 'Mãe de paciente bariátrico, acompanha sinais e alertas.',
    linkedPatientJourney: 'bariatric',
    linkedPatientDisplayName: 'João Silva',
    linkedPatientProfileId: 'pt-joao-bariatrica',
  },
  {
    id: 'cmp-carlos-conjuge',
    name: 'Carlos Oliveira',
    roleLabel: 'Acompanhante',
    context: 'acompanhante',
    institution: 'Clínica Vida Nova',
    details: 'Cônjuge no fluxo de cesárea com acesso apenas de leitura.',
    linkedPatientJourney: 'cesarean',
    linkedPatientDisplayName: 'Maria Santos',
    linkedPatientProfileId: 'pt-maria-obstetrica',
  },
  {
    id: 'pt-joao-bariatrica',
    name: 'João Silva',
    roleLabel: 'Paciente',
    context: 'paciente',
    institution: 'Hospital São Gabriel',
    details: 'Paciente em preparo bariátrico com metas definidas pela equipe.',
    patientJourney: 'bariatric',
  },
  {
    id: 'pt-maria-obstetrica',
    name: 'Maria Santos',
    roleLabel: 'Paciente',
    context: 'paciente',
    institution: 'Maternidade Santa Clara',
    details: 'Paciente obstétrica no fluxo de cesariana monitorada.',
    patientJourney: 'cesarean',
  },
  {
    id: 'pt-fernanda-parto-normal',
    name: 'Fernanda Costa',
    roleLabel: 'Paciente',
    context: 'paciente',
    institution: 'Maternidade Santa Clara',
    details: 'Gestante em pré-natal com plano de parto normal.',
    patientJourney: 'vaginal_birth',
  },
  {
    id: 'eq-dr-lucas',
    name: 'Dr. Lucas Lima',
    roleLabel: 'Equipe médica',
    context: 'equipe_cirurgia',
    institution: 'Hospital São Gabriel',
    details: 'Cirurgião líder com acesso ao monitor intraoperatório.',
  },
  {
    id: 'eq-enf-paula',
    name: 'Enf. Paula Mendes',
    roleLabel: 'Equipe médica',
    context: 'equipe_cirurgia',
    institution: 'Maternidade Santa Clara',
    details: 'Enfermeira assistencial focada em alertas e checklist.',
  },
]
