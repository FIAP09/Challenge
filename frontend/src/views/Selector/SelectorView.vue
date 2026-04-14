<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { getJourneyLabel } from '@/constants/patient-journey-content'
import { VIEW_AS_OPTIONS, VIEW_CONTEXT_LABELS, type ViewAsOption, type ViewContextType } from '@/constants/view-as'
import { useAuthStore } from '@/stores/auth.store'
import { useViewAsStore } from '@/stores/view-as.store'

const router = useRouter()
const auth = useAuthStore()
const viewAs = useViewAsStore()
const { isDark, toggleTheme } = useTheme()
const isAuthenticated = computed(() => Boolean(auth.token))

const groupedOptions = computed(() => {
  const groups: Record<ViewContextType, typeof VIEW_AS_OPTIONS> = {
    acompanhante: [],
    paciente: [],
    equipe_cirurgia: [],
  }

  VIEW_AS_OPTIONS.forEach((option) => {
    groups[option.context].push(option)
  })

  return groups
})

const selectContext = (id: string) => {
  viewAs.setSelectedContext(id)
  router.push(isAuthenticated.value ? '/app/dashboard' : '/login')
}

const journeyLine = (option: ViewAsOption) => {
  if (option.context === 'paciente' && option.patientJourney) {
    return getJourneyLabel(option.patientJourney)
  }
  if (option.context === 'acompanhante' && option.linkedPatientJourney) {
    return `Paciente: ${getJourneyLabel(option.linkedPatientJourney)}`
  }
  return null
}
</script>

<template>
  <main class="min-h-screen transition-colors duration-200" :class="isDark ? 'bg-[#030B23] text-slate-100' : 'bg-[#FFFDF5] text-slate-700'">
    <header
      class="sticky top-0 z-50 backdrop-blur transition-colors duration-200"
      :class="isDark ? 'border-b border-[#1b2747] bg-[#07122E]/95' : 'border-b border-[#f3e5a8] bg-[#fff9e8]/95'"
    >
      <div
        class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-2 px-4 pt-[env(safe-area-inset-top)] sm:px-6 lg:px-8"
      >
        <RouterLink to="/" class="shrink-0 text-sm font-semibold tracking-wide" :class="isDark ? 'text-white' : 'text-slate-700'">
          Omni Vital
        </RouterLink>

        <nav
          class="hidden min-w-0 items-center gap-3 overflow-x-auto text-sm sm:flex md:gap-6"
          :class="isDark ? 'text-slate-300' : 'text-slate-500'"
        >
          <a href="#" class="shrink-0 hover:text-[#FFE14D]">Início</a>
          <a href="#" class="shrink-0 hover:text-[#FFE14D]">Solução</a>
          <a href="#" class="shrink-0 hover:text-[#FFE14D]">Fluxo clínico</a>
          <a href="#" class="shrink-0 hover:text-[#FFE14D]">Segurança</a>
        </nav>

        <div class="flex shrink-0 flex-wrap items-center justify-end gap-1.5 sm:gap-2">
          <RouterLink
            to="/login"
            class="inline-flex h-10 touch-manipulation items-center rounded-lg px-3 text-xs font-semibold transition sm:h-9"
            :class="isDark ? 'text-zinc-100 hover:bg-zinc-800' : 'text-slate-700 hover:bg-[#fff4c4]'"
          >
            Entrar
          </RouterLink>
          <span
            class="inline-flex h-10 items-center rounded-lg px-2.5 text-[10px] font-semibold sm:h-9 sm:px-3 sm:text-xs"
            :class="isDark ? 'bg-white text-[#0a1636]' : 'bg-[#0a1636] text-white'"
            title="Acesso por convite"
          >
            <span class="sm:hidden">Convite</span>
            <span class="hidden sm:inline">Acesso por convite</span>
          </span>
          <button
            type="button"
            class="inline-flex h-10 w-10 touch-manipulation items-center justify-center rounded-lg transition sm:h-9 sm:w-9"
            :class="isDark ? 'text-zinc-300 hover:bg-zinc-800' : 'text-slate-600 hover:bg-[#fff4c4]'"
            :title="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
            @click="toggleTheme"
          >
            <Sun v-if="isDark" :size="16" />
            <Moon v-else :size="16" />
          </button>
        </div>
      </div>
    </header>

    <section class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header class="mb-8">
        <h1 class="text-2xl font-semibold" :class="isDark ? 'text-white' : 'text-slate-700'">Seleção de perfil (demo)</h1>
        <p class="mt-1 text-sm" :class="isDark ? 'text-zinc-400' : 'text-slate-500'">
          Escolha um perfil para ver a experiência mockada no painel (paciente, acompanhante ou equipe). Administradores também usam esta tela para o fluxo de apresentação.
        </p>
      </header>

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="([context, options]) in Object.entries(groupedOptions)"
          :key="context"
          class="rounded-2xl border p-4 transition-colors duration-200"
          :class="isDark ? 'border-[#FFE14D]/20 bg-[#0E173A]' : 'border-[#f3e5a8] bg-[#fff9e8]'"
        >
          <h2 class="mb-4 text-lg font-semibold" :class="isDark ? 'text-[#FFE14D]' : 'text-[#0f2743]'">
            {{ VIEW_CONTEXT_LABELS[context as ViewContextType] }}
          </h2>
          <div class="space-y-2">
            <button
              v-for="option in options"
              :key="option.id"
              class="w-full rounded-lg border px-3 py-2 text-left transition"
              :class="
                isDark
                  ? 'border-zinc-700 hover:border-[#FFE14D]/50 hover:bg-zinc-800/60'
                  : 'border-[#f3e5a8] hover:border-[#d6c36f] hover:bg-[#fff4c4]'
              "
              @click="selectContext(option.id)"
            >
              <p class="text-sm font-medium" :class="isDark ? 'text-zinc-100' : 'text-slate-700'">{{ option.name }}</p>
              <p
                v-if="journeyLine(option)"
                class="mt-0.5 text-[11px] font-semibold uppercase tracking-wide"
                :class="isDark ? 'text-[#FFE14D]' : 'text-[#9e8500]'"
              >
                {{ journeyLine(option) }}
              </p>
              <p class="text-xs" :class="isDark ? 'text-zinc-400' : 'text-slate-500'">{{ option.institution }} · {{ option.details }}</p>
            </button>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
