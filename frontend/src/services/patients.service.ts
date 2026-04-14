import { API } from '@/constants/api-routes'
import { useApiFetch } from '@/lib/useApiFetch'
import type { Patient } from '@/types/patient'

const MOCK_PATIENTS: Patient[] = [
  {
    id: 1,
    name: 'Joao Silva',
    birth_date: '1987-03-10',
    weight: 118,
    height: 1.79,
    bmi: 36.8,
    risk_level: 'medio',
    surgery_type: 'bariatrica',
    status: 'IN_SURGERY',
  },
  {
    id: 2,
    name: 'Maria Santos',
    birth_date: '1994-09-18',
    weight: 76,
    height: 1.67,
    bmi: 27.2,
    risk_level: 'baixo',
    surgery_type: 'cesariana',
    status: 'IN_RECOVERY',
  },
  {
    id: 3,
    name: 'Paula Ribeiro',
    birth_date: '1981-01-05',
    weight: 104,
    height: 1.64,
    bmi: 38.7,
    risk_level: 'alto',
    surgery_type: 'bariatrica',
    status: 'SCHEDULED',
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
}
