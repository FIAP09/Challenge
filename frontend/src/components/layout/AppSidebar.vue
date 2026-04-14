<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Bell, ChevronDown, ClipboardList, HeartPulse, Home, UserRound, Users } from 'lucide-vue-next'
import { useViewAs } from '@/composables/useViewAs'

const route = useRoute()
const { canModule } = useViewAs()
const props = defineProps<{
  collapsed?: boolean
  /** Abaixo de lg: menu em drawer */
  isMobileLayout?: boolean
  mobileOpen?: boolean
}>()
const expandedModule = ref<string | null>(null)

const iconMap = {
  Início: Home,
  Monitor: HeartPulse,
  Alertas: Bell,
  Pacientes: UserRound,
  Avaliações: ClipboardList,
  Equipe: Users,
} as const

type SidebarChild = {
  to: string
  label: string
  show: boolean
  exact?: boolean
  monitorRoute?: boolean
}

type SidebarItem = {
  label: keyof typeof iconMap
  to: string
  show: boolean
  exact?: boolean
  monitorRoute?: boolean
  children?: SidebarChild[]
}

const items = computed<SidebarItem[]>(() => [
  {
    label: 'Início',
    to: '/app/dashboard',
    show: canModule('dashboard'),
    exact: true,
  },
  {
    label: 'Monitor',
    to: '/app/surgeries/1/monitor',
    show: canModule('monitor'),
    monitorRoute: true,
  },
  {
    label: 'Alertas',
    to: '/app/alerts',
    show: canModule('alertas'),
  },
  {
    label: 'Pacientes',
    to: '/app/patients',
    show: canModule('pacientes'),
    exact: true,
  },
  {
    label: 'Avaliações',
    to: '/app/journey-evaluations',
    show: canModule('pacientes'),
    exact: true,
  },
  {
    label: 'Equipe',
    to: '/app/team',
    show: canModule('equipe'),
    exact: true,
  },
])

const visibleChildren = (item: SidebarItem) => (item.children ?? []).filter((child) => child.show)

const isChildActive = (to: string, child?: SidebarChild) => {
  if (child?.monitorRoute) return /^\/app\/surgeries\/\d+\/monitor$/.test(route.path)
  if (child?.exact) return route.path === to
  if (to === '/app/patients') return route.path === '/app/patients'
  return route.path === to || route.path.startsWith(`${to}/`)
}

const isModuleActive = (item: SidebarItem) => {
  if (item.monitorRoute) return /^\/app\/surgeries\/\d+\/monitor$/.test(route.path)
  if (item.exact) return route.path === item.to
  return route.path === item.to || route.path.startsWith(`${item.to}/`)
}

const showLabels = computed(() => (props.isMobileLayout ? true : !props.collapsed))

watch(
  [items, () => route.path, () => props.collapsed, () => props.isMobileLayout],
  () => {
    if (props.collapsed && !props.isMobileLayout) return
    const activeItem = items.value.find((item) => item.show && visibleChildren(item).length > 0 && isModuleActive(item))
    if (activeItem) {
      expandedModule.value = activeItem.label
      return
    }
    if (!expandedModule.value) {
      const firstVisible = items.value.find((item) => item.show)
      expandedModule.value = firstVisible?.label ?? null
    }
  },
  { immediate: true },
)

const toggleModule = (label: string) => {
  expandedModule.value = expandedModule.value === label ? null : label
}
</script>

<template>
  <aside
    :class="[
      'flex h-full shrink-0 flex-col border-r border-[#f3e5a8] bg-[#fff9e8] transition-transform duration-200 ease-out dark:border-[#1b2747] dark:bg-[#07122E]',
      'w-72 max-lg:w-[min(18rem,calc(100vw-1rem))]',
      'max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-[100] max-lg:max-w-[85vw] max-lg:pt-[env(safe-area-inset-top)]',
      'lg:relative lg:z-auto lg:translate-x-0',
      isMobileLayout && !mobileOpen ? 'max-lg:pointer-events-none max-lg:-translate-x-full' : 'translate-x-0',
    ]"
    :aria-hidden="isMobileLayout ? (!mobileOpen ? 'true' : 'false') : 'false'"
  >
    <div
      class="flex h-16 shrink-0 items-center border-b border-[#f3e5a8] px-4 sm:h-20 sm:px-5 dark:border-[#1b2747]"
    >
      <p v-if="showLabels" class="text-base font-semibold tracking-wide text-[#0f2743] dark:text-white">Omni Vital</p>
      <p v-else class="mx-auto text-base font-semibold tracking-wide text-[#0f2743] dark:text-white">OV</p>
    </div>
    <nav class="flex-1 overflow-y-auto overscroll-contain px-3 py-4 sm:px-4 sm:py-5">
      <p
        v-if="showLabels"
        class="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-[#9e8500] dark:text-slate-500"
      >
        Menu
      </p>
      <section v-for="item in items" v-show="item.show" :key="item.label" class="mb-1">
        <div class="flex items-center gap-1">
          <RouterLink
            :to="item.to"
            class="flex min-h-11 min-w-0 items-center rounded-lg px-3 py-2.5 text-base transition touch-manipulation active:opacity-90"
            :class="[
              !showLabels ? 'w-full justify-center gap-0' : 'flex-1 gap-2',
              isModuleActive(item)
                ? 'bg-[#FFE14D]/45 font-semibold text-[#0f2743] dark:bg-[#152754] dark:font-normal dark:text-white'
                : 'text-slate-600 hover:bg-[#fff4c4]/90 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#101F45] dark:hover:text-white',
            ]"
            :title="!showLabels ? item.label : ''"
          >
            <component :is="iconMap[item.label as keyof typeof iconMap]" :size="18" class="shrink-0" />
            <span v-if="showLabels" class="truncate">{{ item.label }}</span>
          </RouterLink>
          <button
            v-if="showLabels && visibleChildren(item).length > 0"
            type="button"
            class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-slate-500 transition touch-manipulation hover:bg-[#fff4c4]/90 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-[#101F45] dark:hover:text-white"
            @click="toggleModule(item.label)"
          >
            <ChevronDown :size="16" :class="expandedModule === item.label ? 'rotate-180' : ''" class="transition-transform" />
          </button>
        </div>

        <div v-if="showLabels && visibleChildren(item).length > 0 && expandedModule === item.label" class="mt-1 space-y-1 pl-2">
          <RouterLink
            v-for="child in visibleChildren(item)"
            :key="child.to"
            :to="child.to"
            class="flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm transition touch-manipulation active:opacity-90"
            :class="[
              isChildActive(child.to, child)
                ? 'bg-[#FFE14D]/45 font-semibold text-[#0f2743] dark:bg-[#152754] dark:font-normal dark:text-white'
                : 'text-slate-600 hover:bg-[#fff4c4]/90 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#101F45] dark:hover:text-white',
            ]"
          >
            <component :is="iconMap[item.label as keyof typeof iconMap]" :size="16" class="shrink-0" />
            <span class="truncate">{{ child.label }}</span>
          </RouterLink>
        </div>
      </section>
    </nav>
  </aside>
</template>
