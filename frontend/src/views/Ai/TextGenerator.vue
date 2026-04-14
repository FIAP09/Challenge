<template>
  <AiAdminLayout>
    <AiBreadcrumb :pageTitle="currentPageTitle" />
    <AiLayout @submit="handleMessageSubmit" :onSubmit="handleMessageSubmit">
      <TextContent ref="textContentRef" />
    </AiLayout>
  </AiAdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AiAdminLayout from '@/components/layout/AiAdminLayout.vue'
import AiLayout from '@/components/ai/AiLayout.vue'
import AiBreadcrumb from '@/components/ai/AiBreadcrumb.vue'
import TextContent from '@/components/ai/TextContent.vue'

const currentPageTitle = ref('Text Generator')

// Reactive state
const textContentRef = ref(null)
const isGenerating = ref(false)

// Sample responses for demo purposes
const sampleResponses = [
  "I'd be happy to help you with that! Here's a well-structured response that addresses your needs...",
  "Great idea! Let me generate some creative content for you. Here's what I came up with...",
  "I understand what you're looking for. Here's a comprehensive text that covers all the key points...",
  "Excellent request! I'll create something engaging and informative for you...",
  'Perfect! Let me craft some high-quality content that meets your requirements...',
]

// Methods
const handleMessageSubmit = async (message) => {
  if (!message.trim() || isGenerating.value) return

  // Add user message to TextContent
  if (textContentRef.value) {
    const userMessage = {
      id: Date.now(),
      isUser: true,
      text: [message],
    }

    textContentRef.value.messages.push(userMessage)
  }

  isGenerating.value = true

  // Simulate AI response
  setTimeout(() => {
    if (textContentRef.value) {
      const assistantMessage = {
        id: Date.now() + 1,
        isUser: false,
        text: [
          sampleResponses[Math.floor(Math.random() * sampleResponses.length)],
          `Based on your request: "${message}", here's a detailed response that provides valuable insights and comprehensive information.`,
        ],
      }

      textContentRef.value.messages.push(assistantMessage)
    }
    isGenerating.value = false
  }, 1500)
}

// Expose methods for debugging
defineExpose({
  handleMessageSubmit,
  isGenerating,
  textContentRef,
})
</script>
