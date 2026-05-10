import type { PatientJourneyType } from '@/types/patient-journey'

export type ViewContextType = 'acompanhante' | 'paciente' | 'equipe_cirurgia'

export interface ViewAsOption {
  id: string
  name: string
  roleLabel: string
  context: ViewContextType
  institution: string
  details: string
  patientJourney?: PatientJourneyType
  linkedPatientJourney?: PatientJourneyType
  linkedPatientDisplayName?: string
  linkedPatientProfileId?: string
  linkedPatientId?: number
}

export const VIEW_CONTEXT_LABELS: Record<ViewContextType, string> = {
  acompanhante: 'Acompanhante',
  paciente: 'Paciente',
  equipe_cirurgia: 'Equipe médica',
}

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
    linkedPatientId: 1,
  },
  {
    id: 'pt-joao-bariatrica',
    name: 'João Silva',
    roleLabel: 'Paciente',
    context: 'paciente',
    institution: 'Hospital São Gabriel',
    details: 'Paciente em acompanhamento bariátrico com metas definidas pela equipe.',
    patientJourney: 'bariatric',
    linkedPatientId: 1,
  },
  {
    id: 'eq-dr-lucas',
    name: 'Dr. Lucas Lima',
    roleLabel: 'Equipe médica',
    context: 'equipe_cirurgia',
    institution: 'Hospital São Gabriel',
    details: 'Cirurgião bariátrico com acesso completo ao acompanhamento.',
  },
  {
    id: 'eq-enf-paula',
    name: 'Enf. Paula Mendes',
    roleLabel: 'Equipe médica',
    context: 'equipe_cirurgia',
    institution: 'Hospital São Gabriel',
    details: 'Enfermeira assistencial focada em alertas e checklist pré/pós-operatório.',
  },
]
