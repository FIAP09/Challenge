export type AlertSeverity = 'WARNING' | 'CRITICAL'
export interface Alert { id: number; patient_name: string; surgery_id: number; type: string; severity: AlertSeverity; message: string; created_at: string; resolved_at: string | null }
