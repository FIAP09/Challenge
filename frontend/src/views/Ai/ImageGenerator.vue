<template>
  <AiAdminLayout>
    <AiBreadcrumb :pageTitle="currentPageTitle" />
    <AiLayout @submit="handleMessageSubmit" :onSubmit="handleMessageSubmit">
      <ImageContent />
    </AiLayout>
  </AiAdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AiAdminLayout from '@/components/layout/AiAdminLayout.vue'
import AiLayout from '@/components/ai/AiLayout.vue'
import AiBreadcrumb from '@/components/ai/AiBreadcrumb.vue'
import ImageContent from '@/components/ai/ImageContent.vue'

const currentPageTitle = ref('Image Generator')
</script>
