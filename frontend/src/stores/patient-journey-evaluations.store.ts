import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { GoalEntryRating } from '@/constants/patient-journey-content'

export type JourneyEvaluationPatch = {
  rating: GoalEntryRating
  notes: string
  evaluator: string
  evaluatedAt: string
}

function patchKey(patientProfileId: string, goalId: string, entryId: string) {
  return `${patientProfileId}::${goalId}::${entryId}`
}

export const usePatientJourneyEvaluationsStore = defineStore('patient-journey-evaluations', () => {
  const patches = ref<Record<string, JourneyEvaluationPatch>>({})

  function getPatch(patientProfileId: string, goalId: string, entryId: string): JourneyEvaluationPatch | undefined {
    return patches.value[patchKey(patientProfileId, goalId, entryId)]
  }

  function setPatch(
    patientProfileId: string,
    goalId: string,
    entryId: string,
    data: JourneyEvaluationPatch,
  ) {
    patches.value = {
      ...patches.value,
      [patchKey(patientProfileId, goalId, entryId)]: data,
    }
  }

  return { patches, getPatch, setPatch }
})
