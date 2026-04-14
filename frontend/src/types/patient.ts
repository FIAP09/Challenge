import type { RiskLevel, SurgeryStatus, SurgeryType } from './surgery'
export interface Patient { id:number; name:string; birth_date:string; weight:number; height:number; bmi:number; risk_level:RiskLevel; surgery_type:SurgeryType; status:SurgeryStatus }
