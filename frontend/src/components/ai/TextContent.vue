<template>
  <div class="custom-scrollbar relative z-20 max-h-[50vh] flex-1 space-y-7 overflow-y-auto pb-7">
    <div
      v-for="message in messages"
      :key="message.id"
      :class="message.isUser ? 'flex justify-end' : 'flex justify-start'"
    >
      <div>
        <div
          :class="[
            'shadow-theme-xs max-w-[480px] rounded-xl',
            message.isUser
              ? 'bg-brand-100 dark:bg-brand-500/20 rounded-tr-xs'
              : 'bg-gray-100 dark:bg-white/5 rounded-tl-xs',
            'px-4 py-3',
          ]"
        >
          <p
            v-for="(paragraph, index) in message.text"
            :key="index"
            class="mb-5 text-sm leading-5 text-gray-800 dark:text-white/90"
          >
            {{ paragraph }}
          </p>
        </div>
        <div v-if="!message.isUser" class="mt-3">
          <button
            class="flex h-8 items-center gap-1 rounded-full border border-gray-100 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-500 dark:border-white/5 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-white/90"
            @click="copyMessage(message)"
          >
            <svg
              v-if="!copiedMessages.includes(message.id)"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M14.1567 14.1628H7.08803C6.39768 14.1628 5.83803 13.6031 5.83803 12.9128V5.8441M14.1567 14.1628L14.1567 15.416C14.1567 16.1064 13.5971 16.666 12.9067 16.666H4.58478C3.89442 16.666 3.33478 16.1064 3.33478 15.416V7.0941C3.33478 6.40374 3.89442 5.8441 4.58478 5.8441H5.83803M14.1567 14.1628H15.4152C16.1056 14.1628 16.6652 13.6031 16.6652 12.9128L16.6652 4.58392C16.6652 3.89357 16.1056 3.33392 15.4152 3.33392H7.08803C6.39768 3.33392 5.83803 3.89357 5.83803 4.58392V5.8441"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              v-if="copiedMessages.includes(message.id)"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M16.6663 5L7.49967 14.1667L3.33301 10"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>{{ copiedMessages.includes(message.id) ? 'Copied' : 'Copy' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Reactive data
const messages = ref([
  {
    id: 1,
    isUser: true,
    text: [
      "Can you generate some random, creative, and engaging placeholder text for me? It doesn't need to follow any specific structure—just something fun or interesting to fill space temporarily.",
    ],
  },
  {
    id: 2,
    isUser: false,
    text: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et varius tortor. Aenean dui magna, vehicula in lacinia non, euismod sed odio. Aliquam erat volutpat.',
      'Integer iaculis eu tellus vel tincidunt. Sed sed dictum orci, in pretium erat. Proin ut mi a arcu mollis hendrerit. Ut id est finibus, egestas tellus ac, pharetra ante.',
    ],
  },
  {
    id: 3,
    isUser: true,
    text: [
      "I'm looking for a block of random, imaginative text—something quirky or unexpected to use as placeholder content.",
    ],
  },
  {
    id: 4,
    isUser: false,
    text: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et varius tortor. Aenean dui magna, vehicula in lacinia non, euismod sed odio. Aliquam erat volutpat. Integer iaculis eu tellus vel tincidunt. Sed sed dictum orci, in pretium erat.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et varius tortor.',
    ],
  },
])

const copiedMessages = ref([])

// Methods
const copyMessage = async (message) => {
  try {
    // Join all paragraphs with double line breaks
    const fullText = message.text.join('\n\n')
    await navigator.clipboard.writeText(fullText)
    copiedMessages.value.push(message.id)
    setTimeout(() => {
      copiedMessages.value = copiedMessages.value.filter((id) => id !== message.id)
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

// Keep the old method for backward compatibility
const copyText = async (paragraph) => {
  try {
    await navigator.clipboard.writeText(paragraph)
    console.log('Text copied to clipboard')
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

// Expose methods to parent components if needed
defineExpose({
  messages,
  copyMessage,
  copyText,
})
</script>
