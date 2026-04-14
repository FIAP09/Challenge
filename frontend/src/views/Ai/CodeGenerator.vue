<template>
  <AiAdminLayout>
    <AiBreadcrumb :pageTitle="currentPageTitle" />
    <AiLayout @submit="handleMessageSubmit" :onSubmit="handleMessageSubmit">
      <CodeContent />
    </AiLayout>
  </AiAdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AiAdminLayout from '@/components/layout/AiAdminLayout.vue'
import AiLayout from '@/components/ai/AiLayout.vue'
import AiBreadcrumb from '@/components/ai/AiBreadcrumb.vue'
import CodeContent from '@/components/ai/CodeContent.vue'

const currentPageTitle = ref('Code Generator')
</script>
