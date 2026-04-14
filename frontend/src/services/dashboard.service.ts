import { API } from '@/constants/api-routes'
import { useApiFetch } from '@/lib/useApiFetch'
import type { DashboardSummary } from '@/types/surgery'

const MOCK_DASHBOARD_SUMMARY: DashboardSummary = {
  surgeries_today: 12,
  in_surgery: 4,
  in_recovery: 3,
  with_alert: 2,
  scheduled: 5,
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
