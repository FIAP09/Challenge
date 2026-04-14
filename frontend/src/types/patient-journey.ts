export type PatientJourneyType = 'bariatric' | 'cesarean' | 'vaginal_birth'

/** Rótulos para o paciente: foco em cuidado e objetivos, sem ênfase em procedimento. */
export const PATIENT_JOURNEY_LABELS: Record<PatientJourneyType, string> = {
  bariatric: 'Hábitos e saúde metabólicos',
  cesarean: 'Gestação e grande dia',
  vaginal_birth: 'Pré-natal e parto natural',
}
