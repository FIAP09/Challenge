<script setup lang="ts">
import { Bell, Menu, PanelLeftClose, Sun, Moon, X } from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAlertsStore } from '@/stores/alerts.store'
import { useTheme } from '@/composables/useTheme'
import { useViewAs } from '@/composables/useViewAs'
import ViewAsControl from './ViewAsControl.vue'
import UserDropdown from './UserDropdown.vue'

defineProps<{
  sidebarCollapsed: boolean
  isMobileViewport?: boolean
  mobileNavOpen?: boolean
}>()
const emit = defineEmits<{ (event: 'toggle-sidebar'): void }>()
const { isDark, toggleTheme } = useTheme()
const { canModule, isAdmin } = useViewAs()
const alertsStore = useAlertsStore()
const router = useRouter()

const showAlerts = computed(() => canModule('alertas'))
const isAlertsOpen = ref(false)
const topAlerts = computed(() => alertsStore.items.slice(0, 3))

onMounted(() => {
  alertsStore.fetchAlerts()
})

const goToAlerts = () => {
  isAlertsOpen.value = false
  router.push('/app/alerts')
}
</script>

<template>
  <header
    class="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-[#f3e5a8] bg-[#fff9e8] pl-2 pr-3 pt-[env(safe-area-inset-top)] dark:border-[#1b2747] dark:bg-[#07122E] sm:h-20 sm:gap-3 sm:pl-3 sm:pr-4 lg:pl-4 lg:pr-8"
  >
    <div class="flex min-w-0 items-center">
      <button
        type="button"
        class="-ml-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-500 transition touch-manipulation hover:bg-slate-200/40 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-slate-700/40 dark:hover:text-white sm:h-10 sm:w-10"
        :title="
          isMobileViewport
            ? mobileNavOpen
              ? 'Fechar menu'
              : 'Abrir menu'
            : sidebarCollapsed
              ? 'Expandir menu'
              : 'Recolher menu'
        "
        @click="emit('toggle-sidebar')"
      >
        <X v-if="isMobileViewport && mobileNavOpen" :size="20" />
        <Menu v-else-if="isMobileViewport" :size="20" />
        <PanelLeftClose v-else-if="!sidebarCollapsed" :size="18" />
        <Menu v-else :size="18" />
      </button>
    </div>
    <div class="flex min-w-0 flex-1 items-center justify-end gap-1 sm:gap-2 md:gap-3">
      <ViewAsControl v-if="isAdmin" class="min-w-0 shrink" />
      <div v-if="showAlerts" class="relative shrink-0">
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-lg border-0 bg-transparent text-slate-600 transition touch-manipulation hover:bg-[#fff4c4] dark:text-slate-100 dark:hover:bg-slate-700/50 sm:h-10 sm:w-10"
          title="Alertas"
          @click="isAlertsOpen = !isAlertsOpen"
        >
          <Bell :size="16" />
        </button>
        <span
          v-if="alertsStore.criticalCount > 0"
          class="absolute -right-1 -top-1 z-10 flex min-h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full border-0 bg-[#FFE14D] px-1.5 py-0.5 text-[10px] font-semibold leading-none text-slate-800 shadow-none ring-0 outline-none"
        >
          {{ alertsStore.criticalCount }}
        </span>

        <div
          v-if="isAlertsOpen"
          class="fixed left-3 right-3 top-[calc(4rem+env(safe-area-inset-top))] z-50 max-h-[min(24rem,70vh)] overflow-y-auto rounded-xl border border-slate-700 bg-[#0f1834] p-3 shadow-xl sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:max-h-none sm:w-80 sm:overflow-visible"
        >
          <h3 class="mb-2 text-sm font-semibold text-slate-100">Alertas recentes</h3>
          <div v-if="topAlerts.length === 0" class="text-sm text-slate-400">Sem alertas no momento.</div>
          <div v-else class="space-y-2">
            <article v-for="alert in topAlerts" :key="alert.id" class="rounded-lg border border-slate-700 px-3 py-2">
              <p class="text-sm font-medium text-slate-100">{{ alert.patient_name }}</p>
              <p class="text-xs text-slate-400">{{ alert.message }}</p>
            </article>
          </div>
          <button
            type="button"
            class="mt-3 w-full rounded-lg border border-slate-600 px-3 py-2.5 text-sm font-semibold text-slate-100 touch-manipulation hover:bg-slate-700/50 sm:py-2"
            @click="goToAlerts"
          >
            Ver mais
          </button>
        </div>
      </div>
      <button
        type="button"
        class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-600 transition touch-manipulation hover:bg-[#fff4c4] dark:text-slate-100 dark:hover:bg-slate-700/50 sm:h-10 sm:w-10"
        :title="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
        @click="toggleTheme"
      >
        <Sun v-if="isDark" :size="16" />
        <Moon v-else :size="16" />
      </button>
      <UserDropdown class="min-w-0 shrink" />
    </div>
  </header>
</template>
