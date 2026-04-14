import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useViewAs } from '@/composables/useViewAs'
import { getJourneyLabel, resolvePatientJourneyType } from '@/constants/patient-journey-content'
import type { PatientJourneyType } from '@/types/patient-journey'

const roleLabels: Record<string, string> = {
  super_admin: 'Super administrador',
  hospital_admin: 'Administrador hospitalar',
  medico: 'Médico',
  enfermeiro: 'Enfermeiro',
}

export function usePatientPersona() {
  const auth = useAuthStore()
  const { currentContext, activeViewAs } = useViewAs()

  const isPatientContext = computed(() => currentContext.value === 'paciente')
  const isCompanionContext = computed(() => currentContext.value === 'acompanhante')

  const journeyType = computed<PatientJourneyType | null>(() => resolvePatientJourneyType(activeViewAs.value))

  const displayName = computed(() => {
    if (isPatientContext.value || isCompanionContext.value) {
      return activeViewAs.value?.name ?? 'Usuário'
    }
    return auth.user?.name ?? 'Usuário'
  })

  const displaySubtitle = computed(() => {
    if (isPatientContext.value) {
      const j = journeyType.value
      if (j) return `Paciente · ${getJourneyLabel(j)}`
      return 'Paciente'
    }
    if (isCompanionContext.value) {
      return 'Acompanhante'
    }
    const role = auth.user?.role
    return role ? roleLabels[role] ?? role : ''
  })

  return {
    isPatientContext,
    isCompanionContext,
    journeyType,
    displayName,
    displaySubtitle,
  }
}
