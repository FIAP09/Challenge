import { computed } from 'vue'
import {
  canAccessModule,
  canAccessSubmodule,
  userModuleGrants,
  type AppModule,
  type AppSubmodule,
} from '@/constants/access-control'
import { useAuthStore } from '@/stores/auth.store'
import { canUseViewAs, resolveContextFromRole, useViewAsStore } from '@/stores/view-as.store'

export function useViewAs() {
  const auth = useAuthStore()
  const viewAs = useViewAsStore()
  const isAdmin = computed(() => canUseViewAs(auth.user?.role))

  const currentContext = computed(() => {
    return viewAs.activeViewAs?.context ?? viewAs.selectedContext?.context ?? resolveContextFromRole(auth.user?.role)
  })

  const canModule = (moduleName: AppModule) => {
    if (!auth.user || !currentContext.value) return false
    return canAccessModule(auth.user.role, currentContext.value, moduleName, userModuleGrants(auth.user))
  }

  const canSubmodule = (submoduleName: AppSubmodule) => {
    if (!auth.user || !currentContext.value) return false
    return canAccessSubmodule(auth.user.role, currentContext.value, submoduleName, userModuleGrants(auth.user))
  }

  return {
    isAdmin,
    currentContext,
    activeViewAs: computed(() => (isAdmin.value ? viewAs.activeViewAs : viewAs.selectedContext)),
    options: computed(() => (isAdmin.value ? viewAs.availableForAdmin : [])),
    canModule,
    canSubmodule,
    setActiveViewAs: viewAs.setActiveViewAs,
  }
}
