<template>
  <span ref="referenceRef">
    <slot name="trigger"></slot>
  </span>
  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="floatingRef"
      :style="floatingStyles"
      class="w-[300px] z-99999 bg-white border border-gray-200 rounded-xl dark:bg-[#1E2634] dark:border-gray-700"
    >
      <slot></slot>
      <div
        ref="arrowRef"
        :style="arrowStyles"
        :class="[
          'bg-white dark:bg-[#1E2634]',
          arrowBorderSides,
          'border-gray-200 dark:border-gray-700',
        ]"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  type Placement,
} from '@floating-ui/vue'

type Position = 'top' | 'right' | 'bottom' | 'left'

const props = defineProps<{
  position: Position
}>()

const isOpen = ref(false)
const referenceRef = ref<HTMLElement | null>(null)
const floatingRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

// Map position to Floating UI placement
const placementMap: Record<Position, Placement> = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
}

// Different offset based on placement - more space for top/bottom
const getOffset = () => {
  return props.position === 'top' || props.position === 'bottom' ? 20 : 10
}

const {
  floatingStyles,
  middlewareData,
  placement: actualPlacement,
} = useFloating(referenceRef, floatingRef, {
  placement: placementMap[props.position],
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(getOffset()),
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

const side = computed(() => actualPlacement.value.split('-')[0])

// Get arrow position from context
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

// Get border side classes based on placement
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

// Click handler
const handleClick = () => {
  isOpen.value = !isOpen.value
}

// Click outside handler
const handleClickOutside = (event: MouseEvent) => {
  if (
    isOpen.value &&
    floatingRef.value &&
    referenceRef.value &&
    !floatingRef.value.contains(event.target as Node) &&
    !referenceRef.value.contains(event.target as Node)
  ) {
    isOpen.value = false
  }
}

// Setup event listeners
watch(
  referenceRef,
  (newRef: HTMLElement | null | undefined, oldRef: HTMLElement | null | undefined) => {
    if (oldRef) {
      oldRef.removeEventListener('click', handleClick)
    }

    if (newRef) {
      newRef.addEventListener('click', handleClick)
    }
  },
  { immediate: true },
)

// Add document click listener for dismissing
watch(isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (referenceRef.value) {
    referenceRef.value.removeEventListener('click', handleClick)
  }
  document.removeEventListener('click', handleClickOutside)
})
</script>
