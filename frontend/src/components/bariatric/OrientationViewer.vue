<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
    <h3 class="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
      Orientacoes ao Paciente
    </h3>

    <div v-if="categories.length === 0" class="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
      Nenhuma orientacao disponivel
    </div>

    <div v-else class="space-y-2">
      <div v-for="cat in categories" :key="cat.key">
        <button
          @click="toggle(cat.key)"
          class="flex w-full items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-800"
        >
          <div class="flex items-center gap-2">
            <span :class="categoryClasses(cat.key)" class="rounded-full px-2 py-0.5 text-xs font-medium">
              {{ ORIENTATION_CATEGORY_LABELS[cat.key] }}
            </span>
            <span class="text-xs text-gray-400">{{ cat.docs.length }} documento(s)</span>
          </div>
          <ChevronDown
            class="h-4 w-4 text-gray-400 transition-transform"
            :class="{ 'rotate-180': openCategories.has(cat.key) }"
          />
        </button>

        <div v-if="openCategories.has(cat.key)" class="mt-1 space-y-2 pl-2">
          <div
            v-for="doc in cat.docs"
            :key="doc.id"
            class="rounded-lg border border-gray-100 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/30"
          >
            <h4 class="mb-2 text-sm font-medium text-gray-800 dark:text-white/90">
              {{ doc.title }}
            </h4>
            <div class="space-y-2">
              <p
                v-for="(paragraph, i) in doc.content.split('\n').filter(Boolean)"
                :key="i"
                class="text-sm leading-relaxed text-gray-600 dark:text-gray-300"
                v-html="formatParagraph(paragraph)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import type { OrientationDocument, OrientationCategory } from '@/types/bariatric'
import { ORIENTATION_CATEGORY_LABELS } from '@/types/bariatric'

const props = defineProps<{
  documents: OrientationDocument[]
}>()

const openCategories = reactive(new Set<OrientationCategory>())

interface CategoryGroup {
  key: OrientationCategory
  docs: OrientationDocument[]
}

const categories = computed<CategoryGroup[]>(() => {
  const map = new Map<OrientationCategory, OrientationDocument[]>()
  for (const doc of props.documents) {
    const list = map.get(doc.category) ?? []
    list.push(doc)
    map.set(doc.category, list)
  }
  return Array.from(map.entries()).map(([key, docs]) => ({ key, docs }))
})

function toggle(category: OrientationCategory) {
  if (openCategories.has(category)) {
    openCategories.delete(category)
  } else {
    openCategories.add(category)
  }
}

function formatParagraph(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

function categoryClasses(category: OrientationCategory) {
  const map: Record<OrientationCategory, string> = {
    expectativas: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    dieta: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    geral: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
  }
  return map[category]
}
</script>
