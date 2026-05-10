import type { RiskLevel, SurgeryStatus } from './surgery'

export interface Patient {
  id: number
  name: string
  birth_date: string
  weight: number
  height: number
  bmi: number
  risk_level: RiskLevel
  status: SurgeryStatus
  initial_weight: number
  target_weight: number
  surgery_date?: string
}
