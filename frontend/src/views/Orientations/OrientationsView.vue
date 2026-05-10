<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { bariatricService } from '@/services/bariatric.service'
import type { OrientationDocument } from '@/types/bariatric'
import OrientationViewer from '@/components/bariatric/OrientationViewer.vue'

const documents = ref<OrientationDocument[]>([])
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  try {
    documents.value = await bariatricService.orientations()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="space-y-5">
    <div>
      <h2 class="text-2xl font-semibold text-slate-700 dark:text-slate-100">Orientações ao paciente</h2>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Documentos informativos sobre complicações, expectativas de perda de peso, dieta e cuidados gerais para pacientes bariátricos.
      </p>
    </div>

    <div v-if="loading" class="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
      Carregando orientações...
    </div>

    <OrientationViewer v-else :documents="documents" />
  </section>
</template>
