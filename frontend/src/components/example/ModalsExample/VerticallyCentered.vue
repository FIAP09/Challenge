<template>
  <ComponentCard title="Vertically Centered Modal">
    <Button size="sm" @click="openRegularModal">Open Modal</Button>
    <Modal v-if="isRegularModalOpen" :fullScreenBackdrop="true" @close="closeRegularModal">
      <template #body>
        <div
          class="relative w-full max-w-[570px] rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10"
        >
          <div class="text-center">
            <h4
              class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 sm:text-title-sm"
            >
              All Done! Success Confirmed
            </h4>
            <p class="text-sm leading-6 text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod est quis
              mauris lacinia pharetra.
            </p>

            <div class="flex items-center justify-center w-full gap-3 mt-8">
              <Button size="sm" variant="outline" @click="closeRegularModal"> Close </Button>
              <Button size="sm" @click="closeRegularModal"> Save Changes </Button>
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </ComponentCard>
</template>

<script setup>
import { ref } from 'vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Button from '@/components/ui/Button.vue'
import Modal from '@/components/ui/Modal.vue'

const isRegularModalOpen = ref(false)

const openRegularModal = () => (isRegularModalOpen.value = true)
const closeRegularModal = () => (isRegularModalOpen.value = false)
</script>
