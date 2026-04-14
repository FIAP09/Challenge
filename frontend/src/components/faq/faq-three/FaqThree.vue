<template>
  <div class="grid grid-cols-1 gap-x-8 xl:grid-cols-2">
    <div class="space-y-3 sm:space-y-5">
      <FaqItem v-for="item in leftColumnItems" :key="item.id" :item="item" />
    </div>
    <div class="space-y-3 sm:space-y-5">
      <FaqItem v-for="item in rightColumnItems" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FaqItem from './FaqItem.vue'

const faqItems = ref([
  {
    id: 1,
    question: 'Do I get free updates?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et nunc ut risus imperdiet lacinia.<br><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    question: 'Which license type is suitable for me?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    question: 'What are the "Seats" mentioned on pricing plans?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et nunc ut risus imperdiet lacinia.',
  },
  {
    id: 4,
    question: 'Can I Customize TailAdmin to suit my needs?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et nunc ut risus imperdiet lacinia.<br><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 5,
    question: 'What does "Unlimited Projects" mean?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum, leo et lacinia accumsan, ligula ante hendrerit nisi, eget vulputate ante justo et justo.',
  },
])

const leftColumnItems = faqItems.value.slice(0, 3)
const rightColumnItems = faqItems.value.slice(3)
</script>
