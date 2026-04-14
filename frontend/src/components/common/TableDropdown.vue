<template>
  <div>
    <div @click="toggle()" ref="button">
      <slot name="dropdown-button"></slot>
    </div>
    <div class="z-10" ref="content">
      <div
        v-show="isOpen"
        class="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-dark w-40"
      >
        <div
          class="space-y-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <slot name="dropdown-content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'

export default {
  data() {
    return {
      isOpen: false,
      popperInstance: null,
    }
  },
  methods: {
    close(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false
      }
    },
    toggle() {
      this.isOpen = !this.isOpen
      this.popperInstance.update()
    },
  },
  mounted() {
    document.addEventListener('click', this.close)

    this.popperInstance = createPopper(this.$refs['button'], this.$refs['content'], {
      placement: 'bottom-end',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
    })
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close)

    if (this.popperInstance) {
      this.popperInstance.destroy()
      this.popperInstance = null
    }
  },
}
</script>

<style></style>
