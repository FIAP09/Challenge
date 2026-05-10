import { API } from '@/constants/api-routes'
import { useApiFetch } from '@/lib/useApiFetch'
import type { DashboardSummary } from '@/types/surgery'

const MOCK_DASHBOARD_SUMMARY: DashboardSummary = {
  patients_pre_op: 8,
  patients_post_op: 15,
  surgeries_scheduled: 3,
  weight_regain_alerts: 2,
  pending_exams: 5,
}

export const dashboardService = {
  async summary(): Promise<DashboardSummary> {
    try {
      const { data } = await useApiFetch(API.dashboard.summary).get().json<DashboardSummary>()
      return data.value ?? MOCK_DASHBOARD_SUMMARY
    } catch {
      return MOCK_DASHBOARD_SUMMARY
    }
  },
}
