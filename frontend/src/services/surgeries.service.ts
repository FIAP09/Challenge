import { API } from '@/constants/api-routes'
import { useApiFetch } from '@/lib/useApiFetch'
import type { Surgery, SurgeryMonitor } from '@/types/surgery'
import type { Alert } from '@/types/alert'

const MOCK_SURGERIES: Surgery[] = [
  {
    id: 1,
    patient_name: 'Joao Silva',
    type: 'bariatrica',
    status: 'IN_SURGERY',
    scheduled_at: '2026-04-14T08:00:00.000Z',
    started_at: '2026-04-14T08:20:00.000Z',
    risk_level: 'medio',
  },
  {
    id: 2,
    patient_name: 'Maria Santos',
    type: 'cesariana',
    status: 'IN_RECOVERY',
    scheduled_at: '2026-04-14T09:30:00.000Z',
    started_at: '2026-04-14T09:45:00.000Z',
    finished_at: '2026-04-14T10:55:00.000Z',
    risk_level: 'baixo',
  },
  {
    id: 3,
    patient_name: 'Paula Ribeiro',
    type: 'bariatrica',
    status: 'SCHEDULED',
    scheduled_at: '2026-04-14T13:15:00.000Z',
    risk_level: 'alto',
  },
]

const MOCK_ALERTS: Alert[] = [
  {
    id: 101,
    patient_name: 'Joao Silva',
    surgery_id: 1,
    type: 'HEART_RATE',
    severity: 'WARNING',
    message: 'Frequencia cardiaca oscilando acima da meta.',
    created_at: '2026-04-14T10:25:00.000Z',
    resolved_at: null,
  },
]

const buildMockMonitor = (id: number): SurgeryMonitor => {
  const surgery = MOCK_SURGERIES.find((item) => item.id === id) ?? MOCK_SURGERIES[0]

  return {
    surgery_id: surgery.id,
    patient: {
      id: surgery.id,
      name: surgery.patient_name,
      age: surgery.type === 'cesariana' ? 31 : 38,
      bmi: surgery.type === 'cesariana' ? 27.4 : 36.1,
      risk_level: surgery.risk_level,
    },
    status: surgery.status,
    started_at: surgery.started_at ?? '2026-04-14T10:00:00.000Z',
    expected_duration_minutes: surgery.type === 'cesariana' ? 90 : 140,
    vitals: {
      heart_rate: surgery.status === 'IN_SURGERY' ? 104 : 86,
      blood_pressure_systolic: surgery.status === 'IN_SURGERY' ? 98 : 112,
      blood_pressure_diastolic: surgery.status === 'IN_SURGERY' ? 64 : 72,
      oxygen_level: 97,
      temperature: 36.8,
      bleeding_ml: surgery.type === 'cesariana' ? 220 : 140,
      updated_at: new Date().toISOString(),
    },
    active_alerts: surgery.status === 'IN_SURGERY' ? MOCK_ALERTS : [],
  }
}

export const surgeriesService = {
  async list(): Promise<Surgery[]> {
    try {
      const { data } = await useApiFetch(API.surgeries.list).get().json<Surgery[]>()
      return data.value?.length ? data.value : MOCK_SURGERIES
    } catch {
      return MOCK_SURGERIES
    }
  },

  async monitor(id: number): Promise<SurgeryMonitor> {
    try {
      const { data } = await useApiFetch(API.surgeries.monitor(id)).get().json<SurgeryMonitor>()
      return data.value ?? buildMockMonitor(id)
    } catch {
      return buildMockMonitor(id)
    }
  },
}
