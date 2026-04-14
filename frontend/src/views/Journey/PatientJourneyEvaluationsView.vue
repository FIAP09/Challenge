<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  getJourneyLabel,
  getPatientDashboardMock,
  goalEntryRatingBadgeClass,
  goalEntryRatingLabel,
  goalEntryRatingRowClass,
  type GoalEntryRating,
  type GoalItem,
  type GoalProgressEntry,
} from '@/constants/patient-journey-content'
import { VIEW_AS_OPTIONS, type ViewAsOption } from '@/constants/view-as'
import { usePatientJourneyEvaluationsStore } from '@/stores/patient-journey-evaluations.store'
import { useToast } from 'vue-toastification'

const toast = useToast()
const evalStore = usePatientJourneyEvaluationsStore()

const patientOptions = computed(() => VIEW_AS_OPTIONS.filter((o) => o.context === 'paciente'))

const selectedId = ref(patientOptions.value[0]?.id ?? '')
const selectedOption = computed<ViewAsOption | null>(
  () => patientOptions.value.find((o) => o.id === selectedId.value) ?? null,
)

const dashboardMock = computed(() => getPatientDashboardMock(selectedOption.value))

const mergedGoal = (goal: GoalItem): GoalItem => {
  const pid = selectedOption.value?.id
  if (!pid || !goal.entries) return goal
  return {
    ...goal,
    entries: goal.entries.map((e) => {
      const p = evalStore.getPatch(pid, goal.id, e.id)
      if (!p) return e
      return {
        ...e,
        rating: p.rating,
        notes: p.notes,
        evaluator: p.evaluator,
        date: p.evaluatedAt.length >= 10 ? p.evaluatedAt.slice(0, 10) : e.date,
      }
    }),
  }
}

const draftRating = ref<GoalEntryRating>('adequado')
const draftNotes = ref('')
const draftEvaluator = ref('Dr. Lucas Lima')
const editingKey = ref<string | null>(null)

function startEdit(goalId: string, entry: GoalProgressEntry) {
  editingKey.value = `${goalId}::${entry.id}`
  const pid = selectedOption.value?.id
  const patched = pid ? evalStore.getPatch(pid, goalId, entry.id) : undefined
  draftRating.value = patched?.rating ?? entry.rating
  draftNotes.value = patched?.notes ?? entry.notes
  draftEvaluator.value = patched?.evaluator ?? entry.evaluator
}

function cancelEdit() {
  editingKey.value = null
}

function saveEvaluation(goalId: string, entryId: string) {
  const pid = selectedOption.value?.id
  if (!pid) return
  evalStore.setPatch(pid, goalId, entryId, {
    rating: draftRating.value,
    notes: draftNotes.value.trim() || '—',
    evaluator: draftEvaluator.value.trim() || '—',
    evaluatedAt: new Date().toISOString().slice(0, 10),
  })
  toast.success('Avaliação registrada (demo).')
  editingKey.value = null
}

const ratingOptions: GoalEntryRating[] = ['adequado', 'com_ressalvas', 'pendente_avaliacao']
</script>

<template>
  <section class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold text-slate-700 dark:text-slate-100">Avaliações da jornada</h1>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Registre ou atualize avaliações por sessão, dia ou item. As alterações aparecem no painel do paciente e do
        acompanhante (demo em memória).
      </p>
    </div>

    <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <label class="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Paciente</label>
      <select
        v-model="selectedId"
        class="w-full max-w-md rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      >
        <option v-for="opt in patientOptions" :key="opt.id" :value="opt.id">
          {{ opt.name }} — {{ getJourneyLabel(opt.patientJourney ?? null) }}
        </option>
      </select>
      <p v-if="selectedOption" class="mt-2 text-xs text-slate-500 dark:text-slate-400">
        {{ selectedOption.institution }} · {{ selectedOption.details }}
      </p>
    </div>

    <div v-if="!dashboardMock" class="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400">
      Não há jornada mockada para este perfil.
    </div>

    <template v-else>
      <div v-for="goal in dashboardMock.goals" :key="goal.id" class="rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <div class="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
          <h2 class="font-semibold text-slate-800 dark:text-slate-100">{{ goal.title }}</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">Referência: {{ goal.professional }}</p>
        </div>
        <div v-if="!goal.entries?.length" class="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
          Sem itens detalhados para avaliação nesta meta (demo).
        </div>
        <ul v-else class="divide-y divide-slate-200 dark:divide-slate-700">
          <li
            v-for="entry in mergedGoal(goal).entries"
            :key="entry.id"
            class="py-4 pl-4 pr-4"
            :class="goalEntryRatingRowClass(entry.rating)"
          >
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="font-medium text-slate-800 dark:text-slate-100">{{ entry.title }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ entry.date }} · {{ entry.evaluator }}</p>
                <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ entry.notes }}</p>
                <span
                  class="mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                  :class="goalEntryRatingBadgeClass(entry.rating)"
                >
                  {{ goalEntryRatingLabel(entry.rating) }}
                </span>
              </div>
              <button
                type="button"
                class="shrink-0 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                @click="startEdit(goal.id, entry)"
              >
                Avaliar / editar
              </button>
            </div>

            <div
              v-if="editingKey === `${goal.id}::${entry.id}`"
              class="mt-4 space-y-3 rounded-lg border border-[#f3e5a8] bg-[#fffdf5] p-4 dark:border-[#FFE14D]/30 dark:bg-[#0f1834]"
            >
              <div>
                <label class="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">Classificação</label>
                <select
                  v-model="draftRating"
                  class="w-full rounded-lg border px-3 py-2 text-sm font-medium"
                  :class="{
                    'border-emerald-300 bg-emerald-50/80 text-emerald-950 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-100':
                      draftRating === 'adequado',
                    'border-amber-300 bg-amber-50/80 text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100':
                      draftRating === 'com_ressalvas',
                    'border-sky-300 bg-sky-50/80 text-sky-950 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-100':
                      draftRating === 'pendente_avaliacao',
                  }"
                >
                  <option v-for="r in ratingOptions" :key="r" :value="r">{{ goalEntryRatingLabel(r) }}</option>
                </select>
              </div>
              <div>
                <label class="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">Profissional</label>
                <input
                  v-model="draftEvaluator"
                  type="text"
                  class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label class="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">Notas clínicas / orientação</label>
                <textarea
                  v-model="draftNotes"
                  rows="3"
                  class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div class="flex flex-wrap gap-2">
                <button
                  type="button"
                  class="rounded-lg bg-[#FFE14D] px-4 py-2 text-sm font-semibold text-slate-800 hover:brightness-95"
                  @click="saveEvaluation(goal.id, entry.id)"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 dark:border-slate-600 dark:text-slate-300"
                  @click="cancelEdit"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </section>
</template>
