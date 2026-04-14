<template>
  <nav>
    <ol :class="['flex flex-wrap items-center', variant === 'dotted' ? 'gap-2' : 'gap-1.5']">
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-1.5">
        <span v-if="index > 0" class="text-gray-500 dark:text-gray-400">
          <component :is="renderSeparator" />
        </span>
        <component
          :is="item.href ? 'router-link' : 'span'"
          :to="item.href"
          :class="[
            'flex items-center gap-1 text-sm',
            item.href
              ? 'text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400'
              : 'text-gray-800 dark:text-white/90',
          ]"
        >
          <span v-if="index === 0 && variant === 'withIcon'">
            <HomeIcon />
          </span>
          {{ item.label }}
        </component>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { HomeIcon, ChevronRightIcon } from '@/icons'
import { computed, h } from 'vue'

type BreadcrumbItem = {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  variant?: 'default' | 'withIcon' | 'dotted' | 'chevron'
}

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  variant: 'default',
})

const renderSeparator = computed(() => {
  switch (props.variant) {
    case 'withIcon':
    case 'default':
      return () => h('span', ' / ')
    case 'dotted':
      return () => h('span', { class: 'block w-1 h-1 bg-gray-400 rounded-full' })
    case 'chevron':
      return ChevronRightIcon
    default:
      return () => null
  }
})
</script>
