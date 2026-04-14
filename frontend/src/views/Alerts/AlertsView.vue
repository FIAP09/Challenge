<script setup lang="ts">
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { alertsService } from '@/services/alerts.service'
import { surgeriesService } from '@/services/surgeries.service'
import type { Alert } from '@/types/alert'
import type { SurgeryType } from '@/types/surgery'

const alerts = ref<Alert[]>([])
const severityFilter = ref<'ALL' | 'CRITICAL' | 'WARNING'>('ALL')
const surgeryTypeFilter = ref<'ALL' | SurgeryType>('ALL')
const viewMode = ref<'grid' | 'list'>('list')
const patientQuery = ref('')
const surgeryTypeById = ref<Record<number, SurgeryType>>({})
const isFiltersOpen = ref(false)
const perPage = ref(10)
const currentPage = ref(1)

onMounted(async () => {
  const [alertsList, surgeries] = await Promise.all([alertsService.list(), surgeriesService.list()])
  alerts.value = alertsList
  surgeryTypeById.value = surgeries.reduce<Record<number, SurgeryType>>((acc, surgery) => {
    acc[surgery.id] = surgery.type
    return acc
  }, {})
})

const filteredAlerts = computed(() => {
  return alerts.value.filter((alert) => {
    const matchesSeverity = severityFilter.value === 'ALL' || alert.severity === severityFilter.value
    const currentType = surgeryTypeById.value[alert.surgery_id]
    const matchesType = surgeryTypeFilter.value === 'ALL' || currentType === surgeryTypeFilter.value
    const matchesPatient =
      patientQuery.value.trim().length === 0 ||
      alert.patient_name.toLowerCase().includes(patientQuery.value.trim().toLowerCase())

    return matchesSeverity && matchesType && matchesPatient
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredAlerts.value.length / perPage.value)))

const paginatedAlerts = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredAlerts.value.slice(start, start + perPage.value)
})

const pageLabel = computed(() => {
  if (filteredAlerts.value.length === 0) return 'Mostrando 0-0 de 0'
  const start = (currentPage.value - 1) * perPage.value + 1
  const end = Math.min(filteredAlerts.value.length, start + perPage.value - 1)
  return `Mostrando ${start}-${end} de ${filteredAlerts.value.length}`
})

function surgeryTypeLabel(type: SurgeryType | undefined) {
  if (!type) return '—'
  return type === 'bariatrica' ? 'Bariátrica' : 'Cesárea'
}

function severityLabel(s: Alert['severity']) {
  return s === 'CRITICAL' ? 'Crítico' : 'Aviso'
}

function formatAlertTime(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(iso))
}

function runSearch() {
  currentPage.value = 1
}

function clearFilters() {
  patientQuery.value = ''
  severityFilter.value = 'ALL'
  surgeryTypeFilter.value = 'ALL'
  perPage.value = 10
  currentPage.value = 1
}

function alertCardClass(alert: Alert) {
  return alert.severity === 'CRITICAL'
    ? 'border-error-200 bg-white dark:border-error-900/50 dark:bg-slate-900'
    : 'border-warning-200 bg-white dark:border-warning-900/40 dark:bg-slate-900'
}

function alertBadgeClass(alert: Alert) {
  return alert.severity === 'CRITICAL'
    ? 'bg-error-100 text-error-800 dark:bg-error-900/50 dark:text-error-200'
    : 'bg-warning-100 text-warning-800 dark:bg-warning-900/40 dark:text-warning-100'
}
</script>

<template>
  <section class="space-y-5">
    <div>
      <h2 class="text-2xl font-semibold text-slate-700 dark:text-slate-100">Alertas</h2>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Painel de sinais clínicos e operacionais vinculados aos procedimentos. Use a simulação para testar notificações com som.
      </p>
    </div>

    <div class="border-b border-slate-200 dark:border-slate-700">
      <div class="flex flex-wrap items-center gap-5">
        <span
          class="border-b-2 border-[#FFE14D] px-1 pb-2 text-sm font-semibold text-slate-700 dark:text-slate-100"
        >
          Listagem
        </span>
        <RouterLink
          to="/app/alerts/simulacao"
          class="border-b-2 border-transparent px-1 pb-2 text-sm font-semibold text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          Simulação
        </RouterLink>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <div class="inline-flex overflow-hidden rounded-lg border border-slate-300 dark:border-slate-600">
        <button
          type="button"
          class="px-4 py-2 text-sm font-semibold transition"
          :class="viewMode === 'grid' ? 'bg-[#FFE14D] text-slate-700' : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'"
          @click="viewMode = 'grid'"
        >
          Grid
        </button>
        <button
          type="button"
          class="px-4 py-2 text-sm font-semibold transition"
          :class="viewMode === 'list' ? 'bg-[#FFE14D] text-slate-700' : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'"
          @click="viewMode = 'list'"
        >
          Lista
        </button>
      </div>
    </div>

    <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <p class="mb-3 text-sm text-slate-500 dark:text-slate-400">
        A pesquisa usa registros da API ou mock armazenado conforme o ambiente.
      </p>
      <div class="max-w-xl">
        <label class="mb-1 block text-sm font-semibold text-slate-500 dark:text-slate-400">Pesquisar</label>
        <div class="grid gap-2 sm:grid-cols-[1fr_auto]">
          <input
            v-model="patientQuery"
            type="text"
            placeholder="Nome do paciente"
            class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            @keyup.enter="runSearch"
          />
          <button
            type="button"
            class="rounded-lg bg-[#FFE14D] px-4 py-2 text-sm font-semibold text-slate-700"
            @click="runSearch"
          >
            Pesquisar
          </button>
        </div>
      </div>
      <div class="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
        <button
          type="button"
          class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
          @click="isFiltersOpen = !isFiltersOpen"
        >
          <span class="inline-flex items-center gap-1">
            Filtros
            <ChevronUp v-if="isFiltersOpen" class="h-3.5 w-3.5" stroke-width="2.5" />
            <ChevronDown v-else class="h-3.5 w-3.5" stroke-width="2.5" />
          </span>
        </button>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Refine por severidade e tipo de procedimento; controle a paginação na visualização em lista.
        </p>
      </div>
      <div v-if="isFiltersOpen" class="mt-3 grid gap-3 md:grid-cols-3">
        <div>
          <label class="mb-1 block text-sm font-semibold text-slate-500 dark:text-slate-400">Severidade</label>
          <select
            v-model="severityFilter"
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            @change="runSearch"
          >
            <option value="ALL">Todas</option>
            <option value="CRITICAL">Crítico</option>
            <option value="WARNING">Aviso</option>
          </select>
        </div>
        <div>
          <label class="mb-1 block text-sm font-semibold text-slate-500 dark:text-slate-400">Tipo de procedimento</label>
          <select
            v-model="surgeryTypeFilter"
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            @change="runSearch"
          >
            <option value="ALL">Todos os tipos</option>
            <option value="bariatrica">Bariátrica</option>
            <option value="cesariana">Cesárea</option>
          </select>
        </div>
        <div>
          <label class="mb-1 block text-sm font-semibold text-slate-500 dark:text-slate-400">Itens por página</label>
          <select
            v-model.number="perPage"
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            @change="runSearch"
          >
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
        </div>
        <div class="flex items-end md:col-span-3">
          <button
            type="button"
            class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 sm:w-auto"
            @click="clearFilters"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </div>

    <div v-if="filteredAlerts.length === 0" class="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
      Nenhum alerta encontrado
    </div>

    <div v-else-if="viewMode === 'grid'" class="grid gap-4 lg:grid-cols-2">
      <article
        v-for="alert in filteredAlerts"
        :key="alert.id"
        class="rounded-xl border p-5 dark:bg-slate-900"
        :class="alertCardClass(alert)"
      >
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div class="min-w-0">
            <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-100">{{ alert.patient_name }}</h3>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {{ surgeryTypeLabel(surgeryTypeById[alert.surgery_id]) }} · {{ formatAlertTime(alert.created_at) }}
            </p>
          </div>
          <span class="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold" :class="alertBadgeClass(alert)">
            {{ severityLabel(alert.severity) }}
          </span>
        </div>
        <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ alert.message }}</p>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <RouterLink
            :to="`/app/surgeries/${alert.surgery_id}/monitor`"
            class="inline-flex justify-center rounded-lg bg-[#FFE14D] px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:brightness-95"
          >
            Abrir monitor
          </RouterLink>
          <RouterLink
            to="/app/alerts/simulacao"
            class="inline-flex justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Simulação
          </RouterLink>
        </div>
      </article>
    </div>

    <div v-else class="rounded-xl border border-slate-200 bg-white p-0 dark:border-slate-700 dark:bg-slate-900">
      <div class="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <div>
          <p class="text-sm font-semibold text-slate-700 dark:text-slate-100">Resultados da pesquisa</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ filteredAlerts.length }} alerta(s) encontrado(s).</p>
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ pageLabel }}</p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            <tr>
              <th class="p-3 text-left">Paciente</th>
              <th class="p-3 text-left">Severidade</th>
              <th class="p-3 text-left">Procedimento</th>
              <th class="p-3 text-left">Mensagem</th>
              <th class="p-3 text-left">Registro</th>
              <th class="p-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="alert in paginatedAlerts"
              :key="alert.id"
              class="border-t border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-100"
            >
              <td class="p-3 font-medium">{{ alert.patient_name }}</td>
              <td class="p-3">
                <span class="rounded-full px-2 py-0.5 text-xs font-semibold" :class="alertBadgeClass(alert)">
                  {{ severityLabel(alert.severity) }}
                </span>
              </td>
              <td class="p-3">{{ surgeryTypeLabel(surgeryTypeById[alert.surgery_id]) }}</td>
              <td class="max-w-xs truncate p-3 text-slate-600 dark:text-slate-300" :title="alert.message">
                {{ alert.message }}
              </td>
              <td class="p-3 whitespace-nowrap text-slate-500 dark:text-slate-400">
                {{ formatAlertTime(alert.created_at) }}
              </td>
              <td class="p-3">
                <RouterLink
                  :to="`/app/surgeries/${alert.surgery_id}/monitor`"
                  class="text-sm font-semibold text-[#FFE14D] hover:underline"
                >
                  Monitor
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex items-center justify-between px-4 py-3">
        <p class="text-sm text-slate-500 dark:text-slate-400">Página {{ currentPage }} de {{ totalPages }}</p>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-600 disabled:opacity-50 dark:border-slate-600 dark:text-slate-300"
            :disabled="currentPage <= 1"
            @click="currentPage--"
          >
            Anterior
          </button>
          <button
            type="button"
            class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-600 disabled:opacity-50 dark:border-slate-600 dark:text-slate-300"
            :disabled="currentPage >= totalPages"
            @click="currentPage++"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
