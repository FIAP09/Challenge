import { useAuthStore } from '@/stores/auth.store'
import type { UserRole } from '@/types/auth'
import { useViewAs } from './useViewAs'

type Permission = 'view:dashboard' | 'view:surgeries' | 'view:monitor' | 'view:alerts' | 'view:patients'

const rolePermissions: Record<UserRole, Permission[]> = {
  super_admin: ['view:dashboard', 'view:surgeries', 'view:monitor', 'view:alerts', 'view:patients'],
  hospital_admin: ['view:dashboard', 'view:surgeries', 'view:monitor', 'view:alerts', 'view:patients'],
  medico: ['view:dashboard', 'view:surgeries', 'view:monitor', 'view:alerts', 'view:patients'],
  enfermeiro: ['view:dashboard', 'view:surgeries', 'view:monitor', 'view:alerts'],
}

const permissionToModule = {
  'view:dashboard': 'dashboard',
  'view:surgeries': 'cirurgias',
  'view:monitor': 'monitor',
  'view:alerts': 'alertas',
  'view:patients': 'pacientes',
} as const

export function usePermission() {
  const auth = useAuthStore()
  const { canModule } = useViewAs()

  const can = (permission: Permission) => {
    const role = auth.user?.role
    if (!role) return false
    if (!rolePermissions[role].includes(permission)) return false
    return canModule(permissionToModule[permission])
  }

  return { can }
}
