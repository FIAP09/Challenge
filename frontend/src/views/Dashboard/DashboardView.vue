<script setup lang="ts">
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
} from 'lucide-vue-next'
import { computed, onMounted, ref, watch } from 'vue'
import ExpandableDetailRow from '@/components/journey/ExpandableDetailRow.vue'
import ExpandableGoalCard from '@/components/journey/ExpandableGoalCard.vue'
import { useViewAs } from '@/composables/useViewAs'
import {
  buildPatientMoments,
  examStatusLabel,
  getCompanionPhaseCards,
  getJourneyLabel,
  getPatientDashboardMock,
  resolvePatientJourneyType,
  type ExamStatus,
  type JourneyMoment,
} from '@/constants/patient-journey-content'
import { evaluationSubjectProfileId } from '@/constants/view-as'
import { dashboardService } from '@/services/dashboard.service'
import { surgeriesService } from '@/services/surgeries.service'
import { useAlertsStore } from '@/stores/alerts.store'
import { usePatientJourneyEvaluationsStore } from '@/stores/patient-journey-evaluations.store'
import type { Alert } from '@/types/alert'
import type { DashboardSummary, RiskLevel, Surgery, SurgeryStatus, SurgeryType } from '@/types/surgery'

const summary = ref<DashboardSummary | null>(null)
const surgeries = ref<Surgery[]>([])
const loading = ref(true)
const alertsStore = useAlertsStore()
const evalStore = usePatientJourneyEvaluationsStore()
const { currentContext, activeViewAs, canModule } = useViewAs()
const isCompanionContext = computed(() => currentContext.value === 'acompanhante')
const isPatientContext = computed(() => currentContext.value === 'paciente')
const showOperationalDashboard = computed(() => !isCompanionContext.value && !isPatientContext.value)

const linkedPatientName = computed(
  () => activeViewAs.value?.linkedPatientDisplayName ?? activeViewAs.value?.name ?? 'Paciente vinculado',
)

const patientMock = computed(() => getPatientDashboardMock(activeViewAs.value))
const showPatientJourneyPanel = computed(
  () => (isPatientContext.value || isCompanionContext.value) && Boolean(patientMock.value),
)

const journeyLabel = computed(() => {
  const j = resolvePatientJourneyType(activeViewAs.value)
  return j ? getJourneyLabel(j) : ''
})

const journeyHeroTitle = computed(() => {
  if (isPatientContext.value) return patientMock.value?.titleFirstPerson ?? ''
  return `Jornada de ${linkedPatientName.value}`
})

const journeyHeroSubtitle = computed(() => {
  if (isPatientContext.value) return patientMock.value?.subtitleFirstPerson ?? ''
  return `Metas, avaliações e orientações da equipe sobre ${linkedPatientName.value}.`
})

const journeyEyebrow = computed(() => (isPatientContext.value ? 'Sua jornada' : 'Jornada acompanhada'))

const journeyCarouselRef = ref<HTMLElement | null>(null)
const journeySlideIndex = ref(0)

const journeySlideStepLabel = computed(() =>
  journeySlideIndex.value === 0 ? journeyEyebrow.value : 'Acompanhamento',
)

const journeySlideDescription = computed(() => {
  if (journeySlideIndex.value === 0) {
    return isPatientContext.value ? 'Visão geral e etapas da sua jornada' : 'Visão geral da jornada do paciente'
  }
  return isPatientContext.value
    ? 'Metas, exames e checklist — toque para ver detalhes e avaliações'
    : `Metas, exames e checklist de ${linkedPatientName.value}`
})

function goJourneySlide(index: 0 | 1) {
  const el = journeyCarouselRef.value
  if (!el) {
    journeySlideIndex.value = index
    return
  }
  const w = el.clientWidth
  el.scrollTo({ left: index * w, behavior: 'smooth' })
  journeySlideIndex.value = index
}

function onJourneyCarouselScroll() {
  const el = journeyCarouselRef.value
  if (!el) return
  const w = el.clientWidth
  if (w <= 0) return
  const i = Math.round(el.scrollLeft / w)
  journeySlideIndex.value = Math.min(1, Math.max(0, i))
}

watch(activeViewAs, () => {
  journeySlideIndex.value = 0
  journeyCarouselRef.value?.scrollTo({ left: 0 })
})

const patientGoals = computed(() => patientMock.value?.goals ?? [])

const journeyProfileId = computed(() => evaluationSubjectProfileId(activeViewAs.value) ?? '')

const mergedGoals = computed(() => {
  const mock = patientMock.value
  const pid = journeyProfileId.value
  if (!mock?.goals || !pid) return []
  return mock.goals.map((g) => ({
    ...g,
    entries: g.entries?.map((e) => {
      const p = evalStore.getPatch(pid, g.id, e.id)
      if (!p) return e
      return {
        ...e,
        rating: p.rating,
        notes: p.notes,
        evaluator: p.evaluator,
        date: p.evaluatedAt.length >= 10 ? p.evaluatedAt.slice(0, 10) : e.date,
      }
    }),
  }))
})

const hasJourneyFollowUpContent = computed(
  () =>
    mergedGoals.value.length > 0 ||
    Boolean(patientMock.value?.exams?.length) ||
    Boolean(patientMock.value?.clinicalChecklist?.length),
)

const goalProgressPrefix = computed(() => (isCompanionContext.value ? 'Está em' : 'Você está em'))

function normalizePersonName(s: string) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

const patientCareDisplayName = computed(() => {
  if (activeViewAs.value?.context === 'paciente') return activeViewAs.value.name
  if (activeViewAs.value?.context === 'acompanhante') return activeViewAs.value.linkedPatientDisplayName
  return null
})

/** Registro de cuidado na unidade associado ao paciente do demo (quando existir). */
const patientCareSurgery = computed(() => {
  const name = patientCareDisplayName.value
  if (!name || (!isPatientContext.value && !isCompanionContext.value)) return null
  const n = normalizePersonName(name)
  return surgeries.value.find((row) => normalizePersonName(row.patient_name) === n) ?? null
})

const patientCareStatus = computed(() => patientCareSurgery.value?.status ?? 'SCHEDULED')
const patientCareMatched = computed(() => Boolean(patientCareSurgery.value))

const overallProgress = computed(() => {
  const goals = patientGoals.value
  if (goals.length === 0) return 0
  const percentage =
    goals.reduce((acc, goal) => acc + Math.min(100, (goal.current / goal.target) * 100), 0) / goals.length
  return Math.round(percentage)
})

const patientJourneyType = computed(() => resolvePatientJourneyType(activeViewAs.value))

const patientMoments = computed(() => {
  const journey = patientJourneyType.value
  if (!journey) return []
  return buildPatientMoments(journey, patientCareStatus.value, overallProgress.value, patientCareMatched.value)
})

const journeyFocusMoment = computed(() => patientMoments.value.find((m) => m.status === 'Em foco agora') ?? null)

const journeyIsComplete = computed(
  () =>
    patientMoments.value.length > 0 && patientMoments.value.every((m) => m.status === 'Concluído'),
)

function journeyStepIndex(moment: JourneyMoment) {
  return patientMoments.value.indexOf(moment) + 1
}

function journeyStepRingClass(moment: JourneyMoment) {
  if (moment.status === 'Em foco agora') {
    return 'bg-[#FFE14D] text-slate-900 ring-4 ring-[#FFE14D]/35 shadow-lg'
  }
  if (moment.status === 'Concluído') {
    return 'bg-emerald-500/90 text-white dark:bg-emerald-600'
  }
  return 'border-2 border-dashed border-slate-300 bg-white text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300'
}

const surgeryPhase = computed(() => surgeries.value[0]?.status ?? 'SCHEDULED')

const companionJourney = computed(() => activeViewAs.value?.linkedPatientJourney ?? null)

const phaseCards = computed(() => getCompanionPhaseCards(companionJourney.value, surgeryPhase.value))

function examBadgeClass(status: ExamStatus) {
  return status === 'ok'
    ? 'bg-success-100 text-success-800 dark:bg-success-900/40 dark:text-success-200'
    : status === 'pending'
      ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
      : 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-200'
}

function capitalizePt(s: string) {
  if (!s) return s
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const agendaDateLong = computed(() =>
  capitalizePt(
    new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date()),
  ),
)

function formatAgendaTime(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
}

function surgeryStatusLabelPt(status: SurgeryStatus): string {
  const m: Record<SurgeryStatus, string> = {
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
  return m[status] ?? status
}

function surgeryTypeLabelPt(type: SurgeryType): string {
  return type === 'bariatrica' ? 'Bariátrica' : 'Cesárea'
}

function riskLabelPt(level: RiskLevel): string {
  const m: Record<RiskLevel, string> = {
    baixo: 'baixo',
    medio: 'médio',
    alto: 'alto',
    critico: 'crítico',
  }
  return m[level] ?? level
}

function surgeryStatusPillClass(status: SurgeryStatus): string {
  switch (status) {
    case 'IN_SURGERY':
      return 'bg-[#FFE14D]/25 text-[#7a6200] dark:bg-[#FFE14D]/20 dark:text-[#FFE14D]'
    case 'IN_RECOVERY':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
    case 'COMPLICATION':
      return 'bg-error-100 text-error-800 dark:bg-error-900/40 dark:text-error-200'
    case 'CANCELLED':
      return 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
    default:
      return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
  }
}

const sortedAgendaSurgeries = computed(() =>
  [...surgeries.value].sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()),
)

const openCriticalAlerts = computed(() =>
  alertsStore.items.filter((a) => a.severity === 'CRITICAL' && !a.resolved_at),
)

const openWarningAlerts = computed(() =>
  alertsStore.items.filter((a) => a.severity === 'WARNING' && !a.resolved_at),
)

function alertRelativeHint(alert: Alert) {
  const t = new Date(alert.created_at).getTime()
  const diffMin = Math.round((Date.now() - t) / 60000)
  if (diffMin < 1) return 'agora'
  if (diffMin < 60) return `há ${diffMin} min`
  const h = Math.floor(diffMin / 60)
  if (h < 24) return `há ${h} h`
  return formatAgendaTime(alert.created_at)
}

onMounted(async () => {
  loading.value = true
  try {
    const [s, list] = await Promise.all([dashboardService.summary(), surgeriesService.list(), alertsStore.fetchAlerts()])
    summary.value = s
    surgeries.value = list
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="min-w-0 space-y-6">
    <div v-if="showPatientJourneyPanel && patientMock" class="min-w-0 space-y-4">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0 flex-1">
          <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9e8500] dark:text-[#FFE14D]/90">
            {{ journeySlideStepLabel }}
          </p>
          <p class="mt-1 text-sm leading-snug text-slate-600 dark:text-slate-400">
            {{ journeySlideDescription }}
          </p>
          <div class="mt-2 flex items-center gap-2">
            <span
              class="h-1.5 w-8 rounded-full transition-colors"
              :class="journeySlideIndex === 0 ? 'bg-[#FFE14D]' : 'bg-slate-300 dark:bg-slate-600'"
              aria-hidden="true"
            />
            <span
              class="h-1.5 w-8 rounded-full transition-colors"
              :class="journeySlideIndex === 1 ? 'bg-[#FFE14D]' : 'bg-slate-300 dark:bg-slate-600'"
              aria-hidden="true"
            />
          </div>
        </div>
        <div class="flex shrink-0 items-center gap-1">
          <button
            v-if="journeySlideIndex === 1"
            type="button"
            class="rounded-full p-2 text-[#0f2743] transition hover:bg-black/5 dark:text-[#FFE14D] dark:hover:bg-white/10"
            aria-label="Voltar para a visão geral da jornada"
            @click="goJourneySlide(0)"
          >
            <ChevronLeft class="h-6 w-6" stroke-width="2" />
          </button>
          <button
            v-if="journeySlideIndex === 0"
            type="button"
            class="rounded-full p-2 text-[#0f2743] transition hover:bg-black/5 dark:text-[#FFE14D] dark:hover:bg-white/10"
            aria-label="Ir para acompanhamento: metas, exames e checklist"
            @click="goJourneySlide(1)"
          >
            <ChevronRight class="h-6 w-6" stroke-width="2" />
          </button>
        </div>
      </div>

      <div class="min-w-0 max-w-full overflow-x-hidden">
        <div
          ref="journeyCarouselRef"
          class="flex min-h-0 min-w-0 w-full max-w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          @scroll.passive="onJourneyCarouselScroll"
        >
          <div class="box-border min-w-0 max-w-full flex-[0_0_100%] snap-start overflow-x-hidden pb-2">
            <div v-if="patientMoments.length > 0" class="space-y-6">
            <div class="relative pt-1">
              <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                <h2 class="text-xl font-semibold leading-snug text-[#0f2743] dark:text-white sm:text-2xl">
                  {{ journeyHeroTitle }}
                </h2>
                <span
                  v-if="journeyLabel"
                  class="rounded-full border border-[#c8a800]/40 bg-white/80 px-3 py-0.5 text-[11px] font-semibold text-[#0f2743] backdrop-blur-sm dark:border-[#FFE14D]/35 dark:bg-[#152754]/90 dark:text-[#FFE14D]"
                >
                  {{ journeyLabel }}
                </span>
              </div>
              <p class="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {{ journeyHeroSubtitle }}
              </p>
              <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <span class="shrink-0 text-sm font-medium text-slate-700 dark:text-slate-200"> Progresso geral </span>
                <div class="flex min-w-0 flex-1 items-center gap-3 sm:max-w-md">
                  <div class="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800/80">
                    <div
                      class="h-full rounded-full bg-[#FFE14D] transition-all duration-500 dark:bg-[#FFE14D]"
                      :style="{ width: `${overallProgress}%` }"
                    />
                  </div>
                  <span class="text-sm font-semibold tabular-nums text-[#0f2743] dark:text-[#FFE14D]"
                    >{{ overallProgress }}%</span
                  >
                </div>
              </div>
            </div>

            <div>
              <div
                v-if="journeyFocusMoment"
                class="rounded-xl border-2 border-[#FFE14D]/55 bg-white/90 p-5 shadow-md dark:border-[#FFE14D]/40 dark:bg-slate-900/85 dark:shadow-none"
              >
                <p class="text-[11px] font-semibold uppercase tracking-wider text-[#9e8500] dark:text-[#FFE14D]">
                  Momento em destaque
                </p>
                <h3 class="mt-2 text-lg font-semibold text-slate-800 dark:text-white">
                  {{ journeyFocusMoment.title }}
                </h3>
                <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {{ journeyFocusMoment.description }}
                </p>
              </div>
              <div
                v-else-if="journeyIsComplete"
                class="rounded-xl border border-emerald-200/80 bg-emerald-50/90 p-5 dark:border-emerald-800/50 dark:bg-emerald-950/40"
              >
                <p class="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Etapas principais concluídas
                </p>
                <h3 class="mt-2 text-lg font-semibold text-emerald-950 dark:text-emerald-100">Você avançou nesta fase</h3>
                <p class="mt-2 text-sm leading-relaxed text-emerald-900/90 dark:text-emerald-200/90">
                  As etapas centrais da sua jornada aqui estão registradas como concluídas. Continue seguindo o plano da
                  sua equipe e use o painel de acompanhamento para metas e orientações.
                </p>
              </div>
            </div>

            <div class="border-t border-slate-200/80 pt-6 dark:border-slate-700/80">
              <p class="mb-4 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
                Como está organizada sua jornada
              </p>
              <div class="flex flex-col gap-5 md:flex-row md:items-stretch md:gap-4">
                <div
                  v-for="moment in patientMoments"
                  :key="moment.id"
                  class="flex flex-1 flex-col rounded-xl border border-slate-200/90 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/60"
                  :class="moment.status === 'Em foco agora' ? 'ring-2 ring-[#FFE14D]/50 dark:ring-[#FFE14D]/35' : ''"
                >
                  <div class="flex items-start gap-3">
                    <div
                      class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-shadow"
                      :class="journeyStepRingClass(moment)"
                    >
                      {{ journeyStepIndex(moment) }}
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="font-semibold text-slate-800 dark:text-slate-100">{{ moment.title }}</p>
                      <p
                        class="mt-1 text-[11px] font-semibold uppercase tracking-wide"
                        :class="
                          moment.status === 'Em foco agora'
                            ? 'text-[#9e8500] dark:text-[#FFE14D]'
                            : moment.status === 'Concluído'
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : 'text-slate-500 dark:text-slate-400'
                        "
                      >
                        {{ moment.status }}
                      </p>
                      <p
                        v-if="moment.status !== 'Em foco agora'"
                        class="mt-2 text-sm leading-snug text-slate-600 dark:text-slate-400"
                      >
                        {{ moment.description }}
                      </p>
                      <p v-else class="mt-2 text-sm text-slate-500 dark:text-slate-500">
                        Veja o destaque acima para mais detalhes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div
              v-else
              class="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400"
            >
              Visão geral da jornada indisponível para este perfil. Use a seta para ver o acompanhamento, se houver
              itens.
            </div>
          </div>

          <div class="box-border min-w-0 max-w-full flex-[0_0_100%] snap-start overflow-x-hidden pb-6">
            <div class="space-y-4">
            <div v-if="mergedGoals.length > 0" class="grid gap-4 lg:grid-cols-3">
              <ExpandableGoalCard
                v-for="goal in mergedGoals"
                :key="goal.id"
                :goal="goal"
                :progress-prefix="goalProgressPrefix"
              />
            </div>

            <div
              v-if="patientMock?.exams?.length"
              class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
            >
              <h3 class="mb-2 text-base font-semibold text-slate-700 dark:text-slate-100">
                Exames e critérios acompanhados pela equipe
              </h3>
              <p class="mb-3 text-xs text-slate-500 dark:text-slate-400">
                Informação ilustrativa para demo; decisões clínicas são sempre da equipe.
              </p>
              <ul>
                <ExpandableDetailRow
                  v-for="exam in patientMock.exams"
                  :key="exam.id"
                  :title="exam.name"
                  :badge="examStatusLabel(exam.status)"
                  :badge-class="examBadgeClass(exam.status)"
                  :summary="exam.detail?.summary"
                  :criteria="exam.detail?.criteria"
                  :meta="
                    exam.detail
                      ? `${exam.detail.lastEvaluatedAt !== '—' ? exam.detail.lastEvaluatedAt + ' · ' : ''}${exam.detail.evaluator}`
                      : undefined
                  "
                />
              </ul>
            </div>

            <div
              v-if="patientMock?.clinicalChecklist?.length"
              class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
            >
              <h3 class="mb-2 text-base font-semibold text-slate-700 dark:text-slate-100">
                Checklist clínico (orientação da equipe)
              </h3>
              <ul>
                <ExpandableDetailRow
                  v-for="item in patientMock.clinicalChecklist"
                  :key="item.id"
                  :title="item.name"
                  :badge="examStatusLabel(item.status)"
                  :badge-class="examBadgeClass(item.status)"
                  :summary="item.detail?.summary"
                  :criteria="item.detail?.criteria"
                  :meta="
                    item.detail ? `${item.detail.lastEvaluatedAt} · ${item.detail.evaluator}` : undefined
                  "
                />
              </ul>
            </div>

              <p
                v-if="!hasJourneyFollowUpContent"
                class="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400"
              >
                Nenhum item de acompanhamento nesta demo para este perfil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isCompanionContext"
      class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
    >
      <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-100">
        Acompanhamento de {{ linkedPatientName }}
      </h2>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Visão resumida do acompanhamento, do grande dia na maternidade e da recuperação — conforme o perfil vinculado.
      </p>
    </div>

    <div v-if="isCompanionContext" class="grid gap-4 lg:grid-cols-3">
      <article
        v-for="phaseCard in phaseCards"
        :key="phaseCard.key"
        class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
      >
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-slate-700 dark:text-slate-100">{{ phaseCard.title }}</h3>
          <span class="rounded-full bg-[#FFE14D]/40 px-2 py-1 text-xs font-semibold text-slate-700 dark:text-slate-100">
            {{ phaseCard.status }}
          </span>
        </div>
        <ul class="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li v-for="item in phaseCard.details" :key="item">- {{ item }}</li>
        </ul>
      </article>
    </div>

    <div
      v-if="isCompanionContext"
      class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
    >
      <h3 class="mb-3 text-base font-semibold text-slate-700 dark:text-slate-100">Alertas do paciente</h3>
      <div v-if="alertsStore.items.length === 0" class="text-sm text-slate-500 dark:text-slate-400">
        Nenhum alerta relevante no momento.
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="alert in alertsStore.items"
          :key="alert.id"
          class="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700"
        >
          <p class="text-sm font-medium text-slate-700 dark:text-slate-100">{{ alert.message }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ alert.severity }}</p>
        </div>
      </div>
    </div>

    <div v-if="showOperationalDashboard" class="space-y-6">
      <div
        v-if="loading"
        class="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
      >
        Carregando agenda...
      </div>

      <template v-else>
        <div
          class="overflow-hidden rounded-2xl border border-[#f3e5a8]/80 bg-gradient-to-br from-[#fff9e8] via-white to-[#fffdf5] shadow-sm dark:border-[#1b2747] dark:from-[#0a1332] dark:via-[#07122E] dark:to-[#0f1834]"
        >
          <div class="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-start sm:justify-between sm:px-8 sm:py-8">
            <div class="min-w-0">
              <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9e8500] dark:text-[#FFE14D]/90">
                Equipe · Início
              </p>
              <div class="mt-2 flex items-center gap-2 text-[#0f2743] dark:text-white">
                <Calendar class="h-6 w-6 shrink-0 text-[#9e8500] dark:text-[#FFE14D]" stroke-width="1.75" />
                <h1 class="text-xl font-semibold leading-tight sm:text-2xl"> Agenda operacional </h1>
              </div>
              <p class="mt-2 text-sm capitalize text-slate-600 dark:text-slate-300">
                {{ agendaDateLong }}
              </p>
              <p class="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Visão do dia: procedimentos por horário, sala e recuperação, com alertas que precisam de resposta imediata.
                Jornadas e metas dos pacientes ficam em
                <span class="font-medium text-[#0f2743] dark:text-[#FFE14D]/90">Avaliações da jornada</span>
                quando disponível ao seu perfil.
              </p>
            </div>
            <div
              v-if="summary"
              class="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:min-w-[280px]"
            >
              <div
                class="rounded-xl border border-[#c8a800]/25 bg-white/90 px-3 py-2.5 dark:border-[#FFE14D]/20 dark:bg-[#152754]/80"
              >
                <p class="text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Hoje
                </p>
                <p class="mt-0.5 text-lg font-semibold tabular-nums text-[#0f2743] dark:text-[#FFE14D]">
                  {{ summary.surgeries_today }}
                </p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Procedimentos</p>
              </div>
              <div
                class="rounded-xl border border-[#c8a800]/25 bg-white/90 px-3 py-2.5 dark:border-[#FFE14D]/20 dark:bg-[#152754]/80"
              >
                <p class="text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Em sala
                </p>
                <p class="mt-0.5 text-lg font-semibold tabular-nums text-[#0f2743] dark:text-[#FFE14D]">
                  {{ summary.in_surgery }}
                </p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Cirurgia</p>
              </div>
              <div
                class="rounded-xl border border-[#c8a800]/25 bg-white/90 px-3 py-2.5 dark:border-[#FFE14D]/20 dark:bg-[#152754]/80"
              >
                <p class="text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Recuperação
                </p>
                <p class="mt-0.5 text-lg font-semibold tabular-nums text-[#0f2743] dark:text-[#FFE14D]">
                  {{ summary.in_recovery }}
                </p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Pacientes</p>
              </div>
              <div
                class="rounded-xl border border-[#c8a800]/25 bg-white/90 px-3 py-2.5 dark:border-[#FFE14D]/20 dark:bg-[#152754]/80"
              >
                <p class="text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Na fila
                </p>
                <p class="mt-0.5 text-lg font-semibold tabular-nums text-[#0f2743] dark:text-[#FFE14D]">
                  {{ summary.scheduled }}
                </p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Agendadas</p>
              </div>
              <div
                class="rounded-xl border border-error-200/80 bg-error-50/90 px-3 py-2.5 dark:border-error-800/50 dark:bg-error-950/50"
              >
                <p class="text-[10px] font-medium uppercase tracking-wide text-error-700 dark:text-error-300">
                  Alertas
                </p>
                <p class="mt-0.5 text-lg font-semibold tabular-nums text-error-700 dark:text-error-200">
                  {{ summary.with_alert }}
                </p>
                <p class="text-[11px] text-error-600/90 dark:text-error-300/80">Com sinalização</p>
              </div>
              <div
                class="rounded-xl border border-error-300/80 bg-white/90 px-3 py-2.5 dark:border-error-800/40 dark:bg-[#152754]/80"
              >
                <p class="text-[10px] font-medium uppercase tracking-wide text-error-700 dark:text-error-300">
                  Críticos
                </p>
                <p class="mt-0.5 text-lg font-semibold tabular-nums text-error-700 dark:text-error-200">
                  {{ alertsStore.criticalCount }}
                </p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Abertos</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <RouterLink
            v-if="canModule('alertas')"
            to="/app/alerts"
            class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Central de alertas
            <ArrowRight class="h-4 w-4 opacity-70" />
          </RouterLink>
          <RouterLink
            v-if="canModule('pacientes')"
            to="/app/journey-evaluations"
            class="inline-flex items-center gap-1.5 rounded-lg border border-[#c8a800]/40 bg-[#fffdf5] px-3 py-2 text-sm font-medium text-[#0f2743] transition hover:bg-[#fff4c4] dark:border-[#FFE14D]/35 dark:bg-[#152754]/90 dark:text-[#FFE14D] dark:hover:bg-[#1a3158]"
          >
            <ClipboardList class="h-4 w-4 shrink-0" stroke-width="2" />
            Avaliações da jornada
            <ArrowRight class="h-4 w-4 opacity-70" />
          </RouterLink>
          <RouterLink
            v-if="canModule('pacientes')"
            to="/app/patients"
            class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Pacientes
            <ArrowRight class="h-4 w-4 opacity-70" />
          </RouterLink>
        </div>

        <div
          v-if="openCriticalAlerts.length > 0"
          class="rounded-xl border border-error-200 bg-error-50/80 p-4 dark:border-error-900/50 dark:bg-error-950/35"
        >
          <div class="flex items-center gap-2 text-error-800 dark:text-error-200">
            <AlertTriangle class="h-5 w-5 shrink-0" stroke-width="2" />
            <h2 class="text-base font-semibold"> Atenção imediata </h2>
          </div>
          <p class="mt-1 text-sm text-error-800/90 dark:text-error-200/85">
            Alertas críticos abertos — priorize checagem e registro no monitor do paciente.
          </p>
          <ul class="mt-3 space-y-2">
            <li v-for="alert in openCriticalAlerts" :key="alert.id">
              <RouterLink
                :to="`/app/surgeries/${alert.surgery_id}/monitor`"
                class="flex flex-col gap-0.5 rounded-lg border border-error-200/80 bg-white/90 px-3 py-2.5 transition hover:bg-white dark:border-error-800/40 dark:bg-[#0f1834] dark:hover:bg-[#152754]"
              >
                <span class="font-medium text-slate-800 dark:text-slate-100">{{ alert.patient_name }}</span>
                <span class="text-sm text-slate-600 dark:text-slate-300">{{ alert.message }}</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">{{ alertRelativeHint(alert) }} · abrir monitor</span>
              </RouterLink>
            </li>
          </ul>
        </div>

        <div
          v-if="openWarningAlerts.length > 0"
          class="rounded-xl border border-warning-200 bg-warning-50/60 p-4 dark:border-warning-800/40 dark:bg-warning-950/25"
        >
          <h2 class="text-base font-semibold text-warning-900 dark:text-warning-200"> Avisos ativos </h2>
          <ul class="mt-2 space-y-2">
            <li v-for="alert in openWarningAlerts" :key="alert.id">
              <RouterLink
                :to="`/app/surgeries/${alert.surgery_id}/monitor`"
                class="flex flex-col gap-0.5 rounded-lg border border-warning-200/80 bg-white/80 px-3 py-2 dark:border-warning-800/30 dark:bg-slate-900/80"
              >
                <span class="font-medium text-slate-800 dark:text-slate-100">{{ alert.patient_name }}</span>
                <span class="text-sm text-slate-600 dark:text-slate-300">{{ alert.message }}</span>
                <span class="text-xs text-slate-500">{{ alertRelativeHint(alert) }}</span>
              </RouterLink>
            </li>
          </ul>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
          <div class="border-b border-slate-200 px-4 py-4 dark:border-slate-700 sm:px-5">
            <h2 class="text-base font-semibold text-slate-800 dark:text-slate-100"> Procedimentos por horário </h2>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Horários previstos de início; status atual da equipe cirúrgica. Toque para abrir o monitor.
            </p>
          </div>

          <div v-if="sortedAgendaSurgeries.length === 0" class="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400 sm:px-5">
            Nenhum procedimento na lista para exibir na agenda.
          </div>

          <div v-else class="divide-y divide-slate-100 dark:divide-slate-800">
            <RouterLink
              v-for="surgery in sortedAgendaSurgeries"
              :key="surgery.id"
              :to="`/app/surgeries/${surgery.id}/monitor`"
              class="flex gap-3 px-4 py-4 transition hover:bg-slate-50 dark:hover:bg-slate-800/50 sm:gap-4 sm:px-5"
            >
              <div class="w-14 shrink-0 text-right sm:w-16">
                <p class="text-base font-semibold tabular-nums text-[#9e8500] dark:text-[#FFE14D]">
                  {{ formatAgendaTime(surgery.scheduled_at) }}
                </p>
                <p class="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Previsto
                </p>
              </div>
              <div
                class="relative min-w-0 flex-1 border-l-2 border-slate-200 pl-4 dark:border-slate-600"
              >
                <span
                  class="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-[#FFE14D] ring-4 ring-[#FFE14D]/20 dark:ring-[#FFE14D]/15"
                  aria-hidden="true"
                />
                <div class="flex flex-wrap items-start justify-between gap-2">
                  <div class="min-w-0">
                    <p class="font-semibold text-slate-800 dark:text-slate-100">
                      {{ surgery.patient_name }}
                    </p>
                    <p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                      {{ surgeryTypeLabelPt(surgery.type) }}
                    </p>
                  </div>
                  <span
                    class="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    :class="surgeryStatusPillClass(surgery.status)"
                  >
                    {{ surgeryStatusLabelPt(surgery.status) }}
                  </span>
                </div>
                <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Monitor em tempo real · risco {{ riskLabelPt(surgery.risk_level) }}
                </p>
              </div>
            </RouterLink>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
