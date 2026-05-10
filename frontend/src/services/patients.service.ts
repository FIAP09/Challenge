import { API } from '@/constants/api-routes'
import { useApiFetch } from '@/lib/useApiFetch'
import type { Patient } from '@/types/patient'

const MOCK_PATIENTS: Patient[] = [
  {
    id: 1,
    name: 'Joao Silva',
    birth_date: '1987-03-10',
    weight: 95,
    height: 1.79,
    bmi: 29.6,
    risk_level: 'medio',
    status: 'IN_RECOVERY',
    initial_weight: 120,
    target_weight: 85,
    surgery_date: '2026-01-15',
  },
  {
    id: 3,
    name: 'Paula Ribeiro',
    birth_date: '1981-01-05',
    weight: 104,
    height: 1.64,
    bmi: 38.7,
    risk_level: 'alto',
    status: 'SCHEDULED',
    initial_weight: 104,
    target_weight: 70,
  },
  {
    id: 4,
    name: 'Carlos Mendes',
    birth_date: '1990-07-22',
    weight: 130,
    height: 1.75,
    bmi: 42.4,
    risk_level: 'medio',
    status: 'APPROVED',
    initial_weight: 130,
    target_weight: 88,
  },
]

export const patientsService = {
  async list(): Promise<Patient[]> {
    try {
      const { data } = await useApiFetch(API.patients.list).get().json<Patient[]>()
      return data.value?.length ? data.value : MOCK_PATIENTS
    } catch {
      return MOCK_PATIENTS
    }
  },

  async get(id: number): Promise<Patient | null> {
    const all = await this.list()
    return all.find((p) => p.id === id) ?? null
  },
}
