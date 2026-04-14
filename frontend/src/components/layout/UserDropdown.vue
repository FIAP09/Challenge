<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePatientPersona } from '@/composables/usePatientPersona'
import { useAuthStore } from '@/stores/auth.store'
import { ChevronDown, LogOut, User } from 'lucide-vue-next'

const auth = useAuthStore()
const router = useRouter()
const { displayName, displaySubtitle } = usePatientPersona()
const userName = computed(() => displayName.value)
const subtitle = computed(() => displaySubtitle.value)
const menuRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const onDocumentClick = (event: MouseEvent) => {
  const target = event.target as Node
  if (!menuRef.value?.contains(target)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})

const handleLogout = () => {
  closeMenu()
  auth.logout()
  router.push('/')
}

const goToAccount = () => {
  closeMenu()
  router.push('/app/patients/1')
}
</script>

<template>
  <div ref="menuRef" class="relative">
    <button
      type="button"
      class="flex max-w-[min(100%,11rem)] items-center gap-2 rounded-xl bg-transparent px-1 py-2 text-left touch-manipulation hover:bg-slate-200/50 sm:max-w-none sm:gap-3 sm:px-2 dark:hover:bg-slate-800/70"
      @click.stop="toggleMenu"
    >
      <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2f6adf] text-sm font-semibold text-white sm:h-8 sm:w-8">
        {{ userName.charAt(0).toUpperCase() }}
      </div>
      <div class="min-w-0 flex-1 sm:min-w-[120px]">
        <p class="truncate text-sm font-medium text-slate-700 dark:text-slate-100">{{ userName }}</p>
        <p class="hidden truncate text-xs text-slate-500 sm:block dark:text-slate-400">{{ subtitle }}</p>
      </div>
      <ChevronDown :size="16" class="shrink-0 text-slate-500 transition-transform dark:text-slate-300" :class="isOpen ? 'rotate-180' : ''" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 z-50 mt-2 w-[min(calc(100vw-1.5rem),16rem)] overflow-hidden rounded-2xl border border-slate-700 bg-[#0f1834] shadow-xl sm:min-w-[220px] sm:w-full"
    >
      <button class="flex w-full items-center gap-2 border-b border-slate-700 px-4 py-3 text-sm text-slate-200 hover:bg-slate-800/80" @click="goToAccount">
        <User :size="16" />
        Minha Conta
      </button>
      <button class="flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-red-400 hover:bg-slate-800/80" @click="handleLogout">
        <LogOut :size="16" />
        Sair
      </button>
    </div>
  </div>
</template>
