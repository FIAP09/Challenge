import type { Alert } from './alert'
export type SurgeryType = 'bariatrica' | 'cesariana'
export type SurgeryStatus = 'REQUESTED'|'APPROVED'|'SCHEDULED'|'ADMITTED'|'IN_SURGERY'|'IN_RECOVERY'|'DISCHARGED'|'COMPLICATION'|'CANCELLED'
export type RiskLevel = 'baixo' | 'medio' | 'alto' | 'critico'
export interface Surgery { id:number; patient_name:string; type:SurgeryType; status:SurgeryStatus; scheduled_at:string; started_at?:string; finished_at?:string; risk_level:RiskLevel }
export interface VitalSigns { heart_rate:number; blood_pressure_systolic:number; blood_pressure_diastolic:number; oxygen_level:number; temperature:number; bleeding_ml:number; updated_at:string }
export interface SurgeryMonitor { surgery_id:number; patient:{ id:number; name:string; age:number; bmi:number; risk_level:RiskLevel }; status:SurgeryStatus; started_at:string; expected_duration_minutes:number; vitals:VitalSigns; active_alerts:Alert[] }
export interface DashboardSummary { surgeries_today:number; in_surgery:number; in_recovery:number; with_alert:number; scheduled:number }
