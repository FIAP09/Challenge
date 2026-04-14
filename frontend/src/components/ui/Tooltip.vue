<template>
  <span ref="referenceRef" class="inline-flex">
    <slot></slot>
  </span>
  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="floatingRef"
      :style="floatingStyles"
      :class="[
        'z-99999 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-medium shadow-md',
        variantClasses,
      ]"
    >
      <slot name="content">{{ content }}</slot>
      <div
        ref="arrowRef"
        :style="arrowStyles"
        :class="[arrowBg, arrowBorderSides, arrowBorderClasses]"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted, withDefaults, defineProps } from 'vue'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  type Placement,
} from '@floating-ui/vue'

type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left'
type TooltipVariant = 'default' | 'dark'

interface Props {
  content?: string
  placement?: TooltipPlacement
  variant?: TooltipVariant
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top',
  variant: 'default',
})

const isOpen = ref(false)
const referenceRef = ref<HTMLElement | null>(null)
const floatingRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

let hoverTimeout: ReturnType<typeof setTimeout> | null = null

const {
  floatingStyles,
  middlewareData,
  placement: actualPlacement,
} = useFloating(referenceRef, floatingRef, {
  placement: props.placement as Placement,
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(10),
    flip({
      fallbackAxisSideDirection: 'start',
    }),
    shift({ padding: 8 }),
    arrow({
      element: arrowRef,
      padding: 8,
    }),
  ],
})

const variantClasses = computed(() => {
  return props.variant === 'dark'
    ? 'bg-gray-950 text-white border border-gray-800 dark:bg-gray-800 dark:border-gray-700'
    : 'bg-white text-gray-700 border border-gray-200 dark:bg-[#1E2634] dark:text-white dark:border-gray-700'
})

const arrowBg = computed(() => {
  return props.variant === 'dark' ? 'bg-gray-950 dark:bg-gray-800' : 'bg-white dark:bg-[#1E2634]'
})

const arrowBorderClasses = computed(() => {
  return props.variant === 'dark'
    ? 'border-gray-800 dark:border-gray-700'
    : 'border-gray-200 dark:border-gray-700'
})

const side = computed(() => actualPlacement.value.split('-')[0])

const arrowStyles = computed(() => {
  const arrowX = middlewareData.value.arrow?.x
  const arrowY = middlewareData.value.arrow?.y

  const baseStyle: Record<string, string> = {
    position: 'absolute',
    width: '12px',
    height: '12px',
    transform: 'rotate(45deg)',
  }

  switch (side.value) {
    case 'top':
      return {
        ...baseStyle,
        bottom: '-6px',
        left: arrowX != null ? `${arrowX}px` : '50%',
      }
    case 'bottom':
      return {
        ...baseStyle,
        top: '-6px',
        left: arrowX != null ? `${arrowX}px` : '50%',
      }
    case 'left':
      return {
        ...baseStyle,
        right: '-6px',
        top: arrowY != null ? `${arrowY}px` : '50%',
      }
    case 'right':
      return {
        ...baseStyle,
        left: '-6px',
        top: arrowY != null ? `${arrowY}px` : '50%',
      }
    default:
      return baseStyle
  }
})

const arrowBorderSides = computed(() => {
  switch (side.value) {
    case 'top':
      return 'border-r border-b'
    case 'bottom':
      return 'border-l border-t'
    case 'left':
      return 'border-r border-t'
    case 'right':
      return 'border-l border-b'
    default:
      return ''
  }
})

const handleMouseEnter = () => {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
  }
  hoverTimeout = setTimeout(() => {
    isOpen.value = true
  }, 100)
}

const handleMouseLeave = () => {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
  }
  isOpen.value = false
}

const handleFocus = () => {
  isOpen.value = true
}

const handleBlur = () => {
  isOpen.value = false
}

watch(
  referenceRef,
  (newRef: HTMLElement | null | undefined, oldRef: HTMLElement | null | undefined) => {
    if (oldRef) {
      oldRef.removeEventListener('mouseenter', handleMouseEnter)
      oldRef.removeEventListener('mouseleave', handleMouseLeave)
      oldRef.removeEventListener('focus', handleFocus)
      oldRef.removeEventListener('blur', handleBlur)
    }

    if (newRef) {
      newRef.addEventListener('mouseenter', handleMouseEnter)
      newRef.addEventListener('mouseleave', handleMouseLeave)
      newRef.addEventListener('focus', handleFocus)
      newRef.addEventListener('blur', handleBlur)
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
  }
  if (referenceRef.value) {
    referenceRef.value.removeEventListener('mouseenter', handleMouseEnter)
    referenceRef.value.removeEventListener('mouseleave', handleMouseLeave)
    referenceRef.value.removeEventListener('focus', handleFocus)
    referenceRef.value.removeEventListener('blur', handleBlur)
  }
})
</script>
