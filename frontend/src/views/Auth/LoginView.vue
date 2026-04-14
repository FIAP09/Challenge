<script setup lang="ts">
import { computed } from 'vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import { useViewAsStore } from '@/stores/view-as.store'

const viewAs = useViewAsStore()
const contextLabel = computed(() => viewAs.selectedContext?.roleLabel ?? 'Não selecionado')
</script>

<template>
  <div>
    <h1 class="mb-2 text-2xl font-semibold text-slate-700 dark:text-[#FFE14D]">Omni Vital</h1>
    <p class="mb-1 text-sm text-slate-600 dark:text-slate-200">Acesso restrito para equipes hospitalares.</p>
    <p class="mb-6 text-xs text-slate-500 dark:text-slate-400">Contexto selecionado: {{ contextLabel }}</p>
    <LoginForm />
    <RouterLink to="/seletor" class="mt-4 inline-flex text-xs font-medium text-slate-600 hover:underline dark:text-[#FFE14D]">
      Alterar contexto em /seletor
    </RouterLink>
  </div>
</template>
