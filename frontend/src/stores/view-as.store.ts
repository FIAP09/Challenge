import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { VIEW_AS_OPTIONS, type ViewAsOption } from '@/constants/view-as'
import type { UserRole } from '@/types/auth'

const SELECTED_CONTEXT_KEY = 'omni-vital:selected-context'
const ACTIVE_VIEW_AS_KEY = 'omni-vital:active-view-as'

const ADMIN_ROLES: UserRole[] = ['super_admin', 'hospital_admin']

export const canUseViewAs = (role?: UserRole | null) => Boolean(role && ADMIN_ROLES.includes(role))

export const resolveContextFromRole = (role?: UserRole | null) => {
  if (!role) return null
  if (role === 'medico' || role === 'enfermeiro') return 'equipe_cirurgia'
  return 'equipe_cirurgia'
}

export const useViewAsStore = defineStore('view-as', () => {
  const selectedContextId = ref<string | null>(localStorage.getItem(SELECTED_CONTEXT_KEY))
  const activeViewAsId = ref<string | null>(localStorage.getItem(ACTIVE_VIEW_AS_KEY))

  const selectedContext = computed<ViewAsOption | null>(() => {
    if (!selectedContextId.value) return null
    return VIEW_AS_OPTIONS.find((option) => option.id === selectedContextId.value) ?? null
  })

  const activeViewAs = computed<ViewAsOption | null>(() => {
    if (!activeViewAsId.value) return null
    return VIEW_AS_OPTIONS.find((option) => option.id === activeViewAsId.value) ?? null
  })

  const availableByContext = computed(() => {
    if (!selectedContext.value) return []
    return VIEW_AS_OPTIONS.filter((option) => option.context === selectedContext.value?.context)
  })

  const availableForAdmin = computed(() => VIEW_AS_OPTIONS)

  const setSelectedContext = (id: string) => {
    selectedContextId.value = id
    localStorage.setItem(SELECTED_CONTEXT_KEY, id)
    activeViewAsId.value = id
    localStorage.setItem(ACTIVE_VIEW_AS_KEY, id)
  }

  const setActiveViewAs = (id: string) => {
    activeViewAsId.value = id
    localStorage.setItem(ACTIVE_VIEW_AS_KEY, id)
  }

  const clearContext = () => {
    selectedContextId.value = null
    activeViewAsId.value = null
    localStorage.removeItem(SELECTED_CONTEXT_KEY)
    localStorage.removeItem(ACTIVE_VIEW_AS_KEY)
  }

  const initializeForRole = (role?: UserRole | null) => {
    if (!role) return

    // Preserva contexto escolhido no seletor (demo) para não sobrescrever no login.
    if (selectedContextId.value) {
      if (!activeViewAsId.value) {
        activeViewAsId.value = selectedContextId.value
        localStorage.setItem(ACTIVE_VIEW_AS_KEY, selectedContextId.value)
      }
      return
    }

    if (canUseViewAs(role)) {
      if (!selectedContextId.value) {
        const defaultAdminOption = VIEW_AS_OPTIONS.find((option) => option.context === 'equipe_cirurgia') ?? VIEW_AS_OPTIONS[0]
        if (defaultAdminOption) {
          setSelectedContext(defaultAdminOption.id)
        }
      }
      return
    }

    const targetContext = resolveContextFromRole(role)
    const fallbackOption = VIEW_AS_OPTIONS.find((option) => option.context === targetContext) ?? VIEW_AS_OPTIONS[0]

    if (fallbackOption) {
      setSelectedContext(fallbackOption.id)
    }
  }

  return {
    selectedContext,
    activeViewAs,
    availableByContext,
    availableForAdmin,
    setSelectedContext,
    setActiveViewAs,
    clearContext,
    initializeForRole,
  }
})
