export type SurgeryStatus = 'REQUESTED'|'APPROVED'|'SCHEDULED'|'ADMITTED'|'IN_SURGERY'|'IN_RECOVERY'|'DISCHARGED'|'COMPLICATION'|'CANCELLED'
export type RiskLevel = 'baixo' | 'medio' | 'alto' | 'critico'
export type SurgeryTechnique = 'bypass_gastrico' | 'sleeve' | 'banda_gastrica' | 'duodenal_switch' | 'outro'

export interface Surgery {
  id: number
  patient_name: string
  status: SurgeryStatus
  scheduled_at: string
  started_at?: string
  finished_at?: string
  risk_level: RiskLevel
}

export interface SurgeryRecord {
  surgery_id: number
  patient_id: number
  technique: SurgeryTechnique
  duration_minutes: number
  complications: string[]
  notes: string
  surgeon: string
  date: string
}

export interface DashboardSummary {
  patients_pre_op: number
  patients_post_op: number
  surgeries_scheduled: number
  weight_regain_alerts: number
  pending_exams: number
}
