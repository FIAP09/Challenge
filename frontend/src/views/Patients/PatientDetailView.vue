<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const patientId = computed(() => Number(route.params.id))
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold text-slate-700 dark:text-slate-100">Paciente #{{ patientId }}</h2>
    <div class="grid gap-4 lg:grid-cols-2">
      <div class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <h3 class="font-semibold text-slate-700 dark:text-slate-100">Checklist pre-operatorio</h3>
        <ul class="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li>IMC e comorbidades avaliados</li>
          <li>Exames laboratoriais anexados</li>
          <li>Autorizacao do convenio validada</li>
          <li>Jejum confirmado</li>
        </ul>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <h3 class="font-semibold text-slate-700 dark:text-slate-100">Ficha pos-operatoria</h3>
        <ul class="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li>Dor referida: leve</li>
          <li>Temperatura: 36.8 C</li>
          <li>Saturacao: 97%</li>
          <li>Mobilidade assistida iniciada</li>
        </ul>
      </div>
    </div>
  </section>
</template>
