<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const route = useRoute()
const isSidebarCollapsed = ref(false)
const isMobileViewport = ref(false)
const mobileNavOpen = ref(false)

const MOBILE_QUERY = '(max-width: 1023px)'

const updateViewport = () => {
  isMobileViewport.value = window.matchMedia(MOBILE_QUERY).matches
  if (!isMobileViewport.value) {
    mobileNavOpen.value = false
  }
}

const toggleSidebar = () => {
  if (isMobileViewport.value) {
    mobileNavOpen.value = !mobileNavOpen.value
  } else {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }
}

const closeMobileNav = () => {
  mobileNavOpen.value = false
}

onMounted(() => {
  updateViewport()
  window.addEventListener('resize', updateViewport)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewport)
})

watch(
  () => route.path,
  () => {
    if (isMobileViewport.value) {
      mobileNavOpen.value = false
    }
  },
)
</script>

<template>
  <div
    class="h-screen overflow-hidden bg-[#FFFDF5] text-slate-700 dark:bg-[#0b1533] dark:text-slate-100"
    :class="isMobileViewport && mobileNavOpen ? 'max-lg:overflow-hidden' : ''"
  >
    <div
      v-show="isMobileViewport && mobileNavOpen"
      class="fixed inset-0 z-[90] bg-black/45 backdrop-blur-[1px] lg:hidden"
      aria-hidden="true"
      @click="closeMobileNav"
    />

    <div class="flex h-full min-h-0">
      <AppSidebar
        :collapsed="!isMobileViewport && isSidebarCollapsed"
        :is-mobile-layout="isMobileViewport"
        :mobile-open="mobileNavOpen"
      />
      <div class="flex min-w-0 flex-1 flex-col">
        <AppHeader
          :is-mobile-viewport="isMobileViewport"
          :mobile-nav-open="mobileNavOpen"
          :sidebar-collapsed="isSidebarCollapsed"
          @toggle-sidebar="toggleSidebar"
        />
        <main
          class="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pt-6 md:px-8 md:py-8 lg:px-12 lg:py-10 xl:px-14 xl:py-12"
        >
          <div class="mx-auto w-full min-w-0 max-w-[1480px]">
            <RouterView />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
