import { defineStore } from 'pinia'
import { alertsService } from '@/services/alerts.service'
import type { Alert } from '@/types/alert'
export const useAlertsStore = defineStore('alerts', { state: () => ({ items: [] as Alert[], loading: false }), getters: { criticalCount: (s) => s.items.filter(a => a.severity==='CRITICAL' && !a.resolved_at).length }, actions: { async fetchAlerts() { this.loading=true; try { this.items = await alertsService.list() } finally { this.loading=false } } } })
