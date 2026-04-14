<template>
  <AiAdminLayout>
    <AiBreadcrumb :pageTitle="currentPageTitle" />
    <AiLayout @submit="handleMessageSubmit" :onSubmit="handleMessageSubmit">
      <VideoContent />
    </AiLayout>
  </AiAdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AiAdminLayout from '@/components/layout/AiAdminLayout.vue'
import AiLayout from '@/components/ai/AiLayout.vue'
import AiBreadcrumb from '@/components/ai/AiBreadcrumb.vue'
import VideoContent from '@/components/ai/VideoContent.vue'

const currentPageTitle = ref('Video Generator')
</script>
