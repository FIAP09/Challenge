import { API } from '@/constants/api-routes'
import { useApiFetch } from '@/lib/useApiFetch'
import type { Alert } from '@/types/alert'

const MOCK_ALERTS: Alert[] = [
  {
    id: 201,
    patient_name: 'Joao Silva',
    surgery_id: 1,
    type: 'HEART_RATE',
    severity: 'CRITICAL',
    message: 'Queda de pressao arterial detectada no intra-operatorio.',
    created_at: '2026-04-14T10:35:00.000Z',
    resolved_at: null,
  },
  {
    id: 202,
    patient_name: 'Maria Santos',
    surgery_id: 2,
    type: 'TEMPERATURE',
    severity: 'WARNING',
    message: 'Temperatura acima da faixa esperada no pos-operatorio.',
    created_at: '2026-04-14T11:05:00.000Z',
    resolved_at: null,
  },
  {
    id: 203,
    patient_name: 'Paula Ribeiro',
    surgery_id: 3,
    type: 'CHECKLIST',
    severity: 'WARNING',
    message: 'Checklist pre-operatorio pendente de validacao final.',
    created_at: '2026-04-14T11:20:00.000Z',
    resolved_at: null,
  },
]

export const alertsService = {
  async list(): Promise<Alert[]> {
    try {
      const { data } = await useApiFetch(API.alerts.list).get().json<Alert[]>()
      return data.value?.length ? data.value : MOCK_ALERTS
    } catch {
      return MOCK_ALERTS
    }
  },
}
