<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Activity, Apple, Bed, Dumbbell, FileText, FlaskConical, Scale, Stethoscope } from 'lucide-vue-next'
import { patientsService } from '@/services/patients.service'
import { bariatricService } from '@/services/bariatric.service'
import { surgeriesService } from '@/services/surgeries.service'
import type { Patient } from '@/types/patient'
import type {
  ExamTimelineEntry,
  WeightEntry,
  LabEntry,
  DietEntry,
  SleepEntry,
  ActivityEntry,
  OrientationDocument,
} from '@/types/bariatric'
import type { SurgeryRecord } from '@/types/surgery'
import WeightChart from '@/components/bariatric/WeightChart.vue'
import ExamTimeline from '@/components/bariatric/ExamTimeline.vue'
import LabTracker from '@/components/bariatric/LabTracker.vue'
import DietLog from '@/components/bariatric/DietLog.vue'
import SleepLog from '@/components/bariatric/SleepLog.vue'
import ActivityLog from '@/components/bariatric/ActivityLog.vue'
import SurgeryRecordComponent from '@/components/bariatric/SurgeryRecord.vue'
import OrientationViewer from '@/components/bariatric/OrientationViewer.vue'

const route = useRoute()
const router = useRouter()

const patient = ref<Patient | null>(null)
const loading = ref(true)
const activeTab = ref('resumo')

const weightHistory = ref<WeightEntry[]>([])
const examEntries = ref<ExamTimelineEntry[]>([])
const labHistory = ref<LabEntry[]>([])
const dietEntries = ref<DietEntry[]>([])
const sleepEntries = ref<SleepEntry[]>([])
const activityEntries = ref<ActivityEntry[]>([])
const surgeryRecord = ref<SurgeryRecord | null>(null)
const orientations = ref<OrientationDocument[]>([])

const patientId = computed(() => Number(route.params.id))

const tabs = [
  { key: 'resumo', label: 'Resumo', icon: Activity },
  { key: 'exames', label: 'Exames', icon: Stethoscope },
  { key: 'peso', label: 'Peso', icon: Scale },
  { key: 'laboratorio', label: 'Laboratório', icon: FlaskConical },
  { key: 'dieta', label: 'Dieta', icon: Apple },
  { key: 'sono', label: 'Sono', icon: Bed },
  { key: 'atividade', label: 'Atividade', icon: Dumbbell },
  { key: 'cirurgia', label: 'Cirurgia', icon: FileText },
  { key: 'orientacoes', label: 'Orientações', icon: FileText },
]

const statusLabel = computed(() => {
  if (!patient.value) return ''
  const m: Record<string, string> = {
    REQUESTED: 'Solicitada',
    APPROVED: 'Aprovada',
    SCHEDULED: 'Agendada',
    ADMITTED: 'Internação',
    IN_SURGERY: 'Em cirurgia',
    IN_RECOVERY: 'Em recuperação',
    DISCHARGED: 'Alta',
    COMPLICATION: 'Complicação',
    CANCELLED: 'Cancelada',
  }
  return m[patient.value.status] ?? patient.value.status
})

const age = computed(() => {
  if (!patient.value) return 0
  const birth = new Date(patient.value.birth_date)
  const now = new Date()
  let a = now.getFullYear() - birth.getFullYear()
  if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) a--
  return a
})

const weightLost = computed(() => {
  if (!patient.value) return 0
  return patient.value.initial_weight - patient.value.weight
})

const weightLostPercent = computed(() => {
  if (!patient.value || patient.value.initial_weight === 0) return 0
  return Math.round((weightLost.value / patient.value.initial_weight) * 100)
})

onMounted(async () => {
  loading.value = true
  try {
    const [p, w, e, l, d, s, a, sr, o] = await Promise.all([
      patientsService.get(patientId.value),
      bariatricService.weightHistory(patientId.value),
      bariatricService.examTimeline(patientId.value),
      bariatricService.labHistory(patientId.value),
      bariatricService.dietLog(patientId.value),
      bariatricService.sleepLog(patientId.value),
      bariatricService.activityLog(patientId.value),
      surgeriesService.record(patientId.value),
      bariatricService.orientations(),
    ])
    patient.value = p
    weightHistory.value = w
    examEntries.value = e
    labHistory.value = l
    dietEntries.value = d
    sleepEntries.value = s
    activityEntries.value = a
    surgeryRecord.value = sr
    orientations.value = o
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="flex min-h-0 flex-1 flex-col overflow-hidden">
    <div v-if="loading" class="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
      Carregando dados do paciente...
    </div>

    <template v-else-if="patient">
      <div class="shrink-0 pb-4">
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            @click="router.push('/app/patients')"
          >
            <ArrowLeft :size="18" />
          </button>
          <div>
            <h2 class="text-xl font-semibold text-slate-700 dark:text-slate-100">{{ patient.name }}</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ age }} anos · IMC {{ patient.bmi }} · {{ statusLabel }}</p>
          </div>
        </div>

        <div class="mt-4 overflow-x-auto border-b border-slate-200 dark:border-slate-700">
          <div class="flex min-w-max items-center gap-1">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              type="button"
              class="flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium transition whitespace-nowrap"
              :class="activeTab === tab.key
                ? 'border-[#FFE14D] text-[#0f2743] dark:text-[#FFE14D]'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'"
              @click="activeTab = tab.key"
            >
              <component :is="tab.icon" :size="16" class="shrink-0" />
              {{ tab.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="min-h-0 flex-1 overflow-y-auto pb-4">
        <div v-if="activeTab === 'resumo'" class="space-y-4">
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <p class="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Peso atual</p>
              <p class="mt-1 text-2xl font-semibold text-[#0f2743] dark:text-[#FFE14D]">{{ patient.weight }} kg</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <p class="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Peso inicial</p>
              <p class="mt-1 text-2xl font-semibold text-slate-700 dark:text-slate-100">{{ patient.initial_weight }} kg</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <p class="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Peso perdido</p>
              <p class="mt-1 text-2xl font-semibold text-emerald-600 dark:text-emerald-400">-{{ weightLost }} kg ({{ weightLostPercent }}%)</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <p class="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Meta</p>
              <p class="mt-1 text-2xl font-semibold text-slate-700 dark:text-slate-100">{{ patient.target_weight }} kg</p>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-100">Dados pessoais</h3>
              <dl class="mt-3 space-y-2 text-sm">
                <div class="flex justify-between">
                  <dt class="text-slate-500 dark:text-slate-400">Data de nascimento</dt>
                  <dd class="font-medium text-slate-700 dark:text-slate-100">{{ new Date(patient.birth_date).toLocaleDateString('pt-BR') }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-slate-500 dark:text-slate-400">Altura</dt>
                  <dd class="font-medium text-slate-700 dark:text-slate-100">{{ patient.height }}m</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-slate-500 dark:text-slate-400">IMC atual</dt>
                  <dd class="font-medium text-slate-700 dark:text-slate-100">{{ patient.bmi }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-slate-500 dark:text-slate-400">Nível de risco</dt>
                  <dd class="font-medium text-slate-700 dark:text-slate-100 capitalize">{{ patient.risk_level }}</dd>
                </div>
              </dl>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-100">Cirurgia</h3>
              <dl class="mt-3 space-y-2 text-sm">
                <div class="flex justify-between">
                  <dt class="text-slate-500 dark:text-slate-400">Data da cirurgia</dt>
                  <dd class="font-medium text-slate-700 dark:text-slate-100">
                    {{ patient.surgery_date ? new Date(patient.surgery_date).toLocaleDateString('pt-BR') : 'Não realizada' }}
                  </dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-slate-500 dark:text-slate-400">Técnica</dt>
                  <dd class="font-medium text-slate-700 dark:text-slate-100">
                    {{ surgeryRecord?.technique === 'sleeve' ? 'Sleeve' : surgeryRecord?.technique === 'bypass_gastrico' ? 'Bypass Gástrico' : surgeryRecord?.technique ?? 'N/A' }}
                  </dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-slate-500 dark:text-slate-400">Status</dt>
                  <dd class="font-medium text-slate-700 dark:text-slate-100">{{ statusLabel }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <ExamTimeline v-if="activeTab === 'exames'" :entries="examEntries" />

        <WeightChart
          v-if="activeTab === 'peso'"
          :entries="weightHistory"
          :target-weight="patient.target_weight"
          :initial-weight="patient.initial_weight"
        />

        <LabTracker v-if="activeTab === 'laboratorio'" :entries="labHistory" />

        <DietLog v-if="activeTab === 'dieta'" :entries="dietEntries" />

        <SleepLog v-if="activeTab === 'sono'" :entries="sleepEntries" />

        <ActivityLog v-if="activeTab === 'atividade'" :entries="activityEntries" />

        <SurgeryRecordComponent v-if="activeTab === 'cirurgia'" :record="surgeryRecord" />

        <OrientationViewer v-if="activeTab === 'orientacoes'" :documents="orientations" />
      </div>
    </template>

    <div v-else class="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
      Paciente não encontrado.
      <button class="mt-2 block mx-auto text-[#FFE14D] hover:underline" @click="router.push('/app/patients')">Voltar para lista</button>
    </div>
  </section>
</template>
