<template>
  <div class="grid grid-cols-1 gap-x-8 xl:grid-cols-2">
    <div class="space-y-3">
      <FaqItem
        v-for="(item, index) in faqItems.slice(0, 3)"
        :key="index"
        :question="item.question"
        :answer="item.answer"
        :initialOpen="index === 0"
      />
    </div>
    <div class="space-y-3">
      <FaqItem
        v-for="(item, index) in faqItems.slice(3)"
        :key="index + 3"
        :question="item.question"
        :answer="item.answer"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FaqItem from './FaqItem.vue'

const faqItems = ref([
  {
    question: 'Do I get free updates?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum orem ipsum dolor sit amet, consectetur adipiscing elit nam fermentum, leo et lacinia accumsan.',
  },
  {
    question: 'Which license type is suitable for me?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum orem ipsum dolor sit amet, consectetur adipiscing elit nam fermentum, leo et lacinia accumsan.',
  },
  {
    question: 'What are the "Seats" mentioned on pricing plans?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum orem ipsum dolor sit amet, consectetur adipiscing elit nam fermentum, leo et lacinia accumsan.',
  },
  {
    question: 'Can I Customize TailAdmin to suit my needs?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum orem ipsum dolor sit amet, consectetur adipiscing elit nam fermentum, leo et lacinia accumsan.',
  },
  {
    question: 'What does "Unlimited Projects" mean?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum orem ipsum dolor sit amet, consectetur adipiscing elit nam fermentum, leo et lacinia accumsan.',
  },
  {
    question: 'Can I upgrade to a higher plan?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum orem ipsum dolor sit amet, consectetur adipiscing elit nam fermentum, leo et lacinia accumsan.',
  },
  {
    question: 'Are there dark and light mode options?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum orem ipsum dolor sit amet, consectetur adipiscing elit nam fermentum, leo et lacinia accumsan.',
  },
])
</script>

<style scoped>
/* Add any additional styles here */
</style>
