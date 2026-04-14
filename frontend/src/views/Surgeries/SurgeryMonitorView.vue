<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { surgeriesService } from '@/services/surgeries.service'
import type { Surgery, SurgeryMonitor } from '@/types/surgery'

const route = useRoute()
const router = useRouter()
const surgeries = ref<Surgery[]>([])
const monitor = ref<SurgeryMonitor | null>(null)
const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | null = null

const selectedSurgeryId = computed(() => Number(route.params.id))

const loadMonitor = async (id: number) => {
  if (!Number.isFinite(id) || id <= 0) return
  monitor.value = await surgeriesService.monitor(id)
}

const changeSurgery = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const id = Number(target.value)
  if (!id || id === selectedSurgeryId.value) return
  router.push(`/app/surgeries/${id}/monitor`)
}

onMounted(async () => {
  surgeries.value = await surgeriesService.list()
  if (!selectedSurgeryId.value && surgeries.value.length > 0) {
    router.replace(`/app/surgeries/${surgeries.value[0].id}/monitor`)
    return
  }
  await loadMonitor(selectedSurgeryId.value)
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

watch(
  () => route.params.id,
  async () => {
    await loadMonitor(selectedSurgeryId.value)
  },
)

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const isHeartRateCritical = computed(() => (monitor.value?.vitals.heart_rate ?? 0) < 50 || (monitor.value?.vitals.heart_rate ?? 0) > 120)
const isPressureCritical = computed(() => (monitor.value?.vitals.blood_pressure_systolic ?? 0) < 90)
const isOxygenCritical = computed(() => (monitor.value?.vitals.oxygen_level ?? 0) < 94)
const isTempCritical = computed(() => (monitor.value?.vitals.temperature ?? 0) > 38)
const elapsedMinutes = computed(() => {
  if (!monitor.value?.started_at) return 0
  return Math.floor((now.value - new Date(monitor.value.started_at).getTime()) / 60000)
})
const surgeryTimeCritical = computed(() => elapsedMinutes.value > (monitor.value?.expected_duration_minutes ?? Number.MAX_SAFE_INTEGER))
</script>

<template>
  <section v-if="monitor" class="space-y-6">
    <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 class="text-xl font-semibold text-slate-700 dark:text-slate-100">{{ monitor.patient.name }}</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Status: {{ monitor.status }} | IMC: {{ monitor.patient.bmi }}</p>
        </div>
        <div class="w-full sm:w-72">
          <label class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Paciente monitorado</label>
          <select
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            :value="selectedSurgeryId"
            @change="changeSurgery"
          >
            <option v-for="surgery in surgeries" :key="surgery.id" :value="surgery.id">
              {{ surgery.patient_name }} - {{ surgery.type }} ({{ surgery.status }})
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="rounded-xl border p-4" :class="surgeryTimeCritical ? 'border-error-300 bg-error-50 dark:border-error-800 dark:bg-error-950/30' : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'">
      <p class="text-sm text-slate-500 dark:text-slate-400">Tempo de cirurgia</p>
      <p class="mt-2 text-3xl font-bold text-slate-700 dark:text-slate-100">{{ elapsedMinutes }} min</p>
    </div>
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <div class="rounded-xl border p-4" :class="isHeartRateCritical ? 'border-error-300 bg-error-50 dark:border-error-800 dark:bg-error-950/30' : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'"><p class="text-xs uppercase text-slate-500 dark:text-slate-400">FC</p><p class="mt-2 text-2xl font-semibold text-slate-700 dark:text-slate-100">{{ monitor.vitals.heart_rate }} bpm</p></div>
      <div class="rounded-xl border p-4" :class="isPressureCritical ? 'border-error-300 bg-error-50 dark:border-error-800 dark:bg-error-950/30' : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'"><p class="text-xs uppercase text-slate-500 dark:text-slate-400">PA</p><p class="mt-2 text-2xl font-semibold text-slate-700 dark:text-slate-100">{{ monitor.vitals.blood_pressure_systolic }}/{{ monitor.vitals.blood_pressure_diastolic }}</p></div>
      <div class="rounded-xl border p-4" :class="isOxygenCritical ? 'border-error-300 bg-error-50 dark:border-error-800 dark:bg-error-950/30' : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'"><p class="text-xs uppercase text-slate-500 dark:text-slate-400">O2</p><p class="mt-2 text-2xl font-semibold text-slate-700 dark:text-slate-100">{{ monitor.vitals.oxygen_level }}%</p></div>
      <div class="rounded-xl border p-4" :class="isTempCritical ? 'border-error-300 bg-error-50 dark:border-error-800 dark:bg-error-950/30' : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'"><p class="text-xs uppercase text-slate-500 dark:text-slate-400">Temp</p><p class="mt-2 text-2xl font-semibold text-slate-700 dark:text-slate-100">{{ monitor.vitals.temperature }} C</p></div>
      <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"><p class="text-xs uppercase text-slate-500 dark:text-slate-400">Sangramento</p><p class="mt-2 text-2xl font-semibold text-slate-700 dark:text-slate-100">{{ monitor.vitals.bleeding_ml }} ml</p></div>
    </div>
    <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <h3 class="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-100">Alertas ativos</h3>
      <div class="space-y-2">
        <div v-for="alert in monitor.active_alerts" :key="alert.id" class="rounded-lg border border-error-300 bg-error-50 p-3 dark:border-error-800 dark:bg-error-950/30"><p class="text-sm font-medium text-slate-700 dark:text-slate-100">{{ alert.message }}</p></div>
        <p v-if="monitor.active_alerts.length === 0" class="text-sm text-slate-500 dark:text-slate-400">Sem alertas ativos.</p>
      </div>
    </div>
  </section>
  <div v-else class="rounded-xl border border-slate-200 bg-white p-6 text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">Carregando monitor...</div>
</template>
