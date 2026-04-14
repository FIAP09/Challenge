<script setup lang="ts">
import { ChevronDown, Eye } from 'lucide-vue-next'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useViewAs } from '@/composables/useViewAs'

const { isAdmin, options, activeViewAs, setActiveViewAs } = useViewAs()

const isOpen = ref(false)
const query = ref('')
const containerRef = ref<HTMLElement | null>(null)

const filteredOptions = computed(() => {
  const term = query.value.trim().toLowerCase()
  if (!term) return options.value
  return options.value.filter((option) => {
    const composed = `${option.name} ${option.roleLabel} ${option.institution} ${option.details}`.toLowerCase()
    return composed.includes(term)
  })
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const selectOption = (id: string) => {
  setActiveViewAs(id)
  query.value = ''
  close()
}

const onDocumentClick = (event: MouseEvent) => {
  const target = event.target as Node
  if (!containerRef.value?.contains(target)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<template>
  <div v-if="isAdmin" ref="containerRef" class="relative">
    <button
      type="button"
      class="inline-flex h-10 max-w-full items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2 text-sm text-slate-600 transition touch-manipulation hover:bg-slate-100 sm:h-9 sm:gap-2 sm:px-3 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      @click.stop="toggle"
    >
      <Eye :size="15" class="shrink-0" />
      <span class="min-w-0 truncate sm:max-w-[12rem] md:max-w-[16rem]">{{
        activeViewAs ? `Ver como: ${activeViewAs.name}` : 'Ver como...'
      }}</span>
      <ChevronDown :size="15" class="shrink-0 transition-transform" :class="isOpen ? 'rotate-180' : ''" />
    </button>

    <div
      v-if="isOpen"
      class="fixed inset-x-3 top-[calc(4.5rem+env(safe-area-inset-top))] z-50 max-h-[min(24rem,70vh)] overflow-hidden rounded-2xl border border-slate-700 bg-[#0f1834] p-3 shadow-xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:max-h-[min(20rem,60vh)] sm:w-[min(20rem,calc(100vw-2rem))]"
    >
      <input
        v-model="query"
        type="text"
        placeholder="Buscar visualização..."
        class="mb-2 h-10 w-full rounded-lg border border-slate-700 bg-[#091228] px-3 text-sm text-slate-100 placeholder:text-slate-400"
      />

      <div class="max-h-[min(12rem,40vh)] overflow-y-auto overscroll-contain rounded-lg border border-slate-700 bg-[#0b1430] sm:max-h-64">
        <button
          v-for="option in filteredOptions"
          :key="option.id"
          class="block w-full border-b border-slate-700 px-3 py-2 text-left last:border-b-0 hover:bg-slate-700/40"
          @click="selectOption(option.id)"
        >
          <p class="text-sm font-semibold text-slate-100">{{ option.name }}</p>
          <p class="text-xs text-slate-400">{{ option.roleLabel }} · {{ option.institution }}</p>
        </button>

        <p v-if="filteredOptions.length === 0" class="px-3 py-4 text-sm text-slate-400">
          Nenhum resultado encontrado.
        </p>
      </div>
    </div>
  </div>
</template>
