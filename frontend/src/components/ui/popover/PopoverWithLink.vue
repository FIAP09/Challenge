<template>
  <div class="max-w-full overflow-auto custom-scrollbar sm:overflow-visible">
    <div class="min-w-[750px]">
      <div class="flex flex-col flex-wrap items-center gap-4 sm:flex-row sm:gap-5">
        <Popover position="top">
          <template #trigger>
            <Button size="sm"> Top Popover </Button>
          </template>
          <!-- Popover Header -->
          <div
            class="relative rounded-t-xl border-b border-gray-200 px-5 py-3 dark:border-white/[0.03]"
          >
            <h4 class="text-base font-semibold text-gray-800 dark:text-white/90">Popover Title</h4>
          </div>
          <!-- Popover Body -->
          <div class="p-5">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consect adipiscing elit. Mauris facilisis congue exclamate
              justo nec facilisis.
            </p>
            <a
              href="#"
              class="flex items-center gap-1 mt-5 text-sm font-medium text-brand-500 hover:text-brand-600"
            >
              Learn More

              <svg
                class="fill-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.0855 7.99888C14.0858 8.19107 14.0126 8.38334 13.8661 8.53001L9.86873 12.5301C9.57594 12.8231 9.10107 12.8233 8.80807 12.5305C8.51508 12.2377 8.51491 11.7629 8.8077 11.4699L11.5279 8.74772L2.66797 8.74772C2.25375 8.74772 1.91797 8.41194 1.91797 7.99772C1.91797 7.58351 2.25375 7.24772 2.66797 7.24772L11.5235 7.24772L8.80772 4.53016C8.51492 4.23718 8.51507 3.7623 8.80805 3.4695C9.10104 3.1767 9.57591 3.17685 9.86871 3.46984L13.8311 7.43478C13.9871 7.57222 14.0855 7.77348 14.0855 7.99772C14.0855 7.99811 14.0855 7.9985 14.0855 7.99888Z"
                  fill=""
                />
              </svg>
            </a>
          </div>
        </Popover>

        <Popover position="right">
          <template #trigger>
            <Button size="sm"> Right Popover </Button>
          </template>
          <!-- Popover Header -->
          <div
            class="relative rounded-t-xl border-b border-gray-200 px-5 py-3 dark:border-white/[0.03]"
          >
            <h4 class="text-base font-semibold text-gray-800 dark:text-white/90">Popover Title</h4>
          </div>
          <!-- Popover Body -->
          <div class="p-5">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consect adipiscing elit. Mauris facilisis congue exclamate
              justo nec facilisis.
            </p>
            <a
              href="#"
              class="flex items-center gap-1 mt-5 text-sm font-medium text-brand-500 hover:text-brand-600"
            >
              Learn More

              <svg
                class="fill-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.0855 7.99888C14.0858 8.19107 14.0126 8.38334 13.8661 8.53001L9.86873 12.5301C9.57594 12.8231 9.10107 12.8233 8.80807 12.5305C8.51508 12.2377 8.51491 11.7629 8.8077 11.4699L11.5279 8.74772L2.66797 8.74772C2.25375 8.74772 1.91797 8.41194 1.91797 7.99772C1.91797 7.58351 2.25375 7.24772 2.66797 7.24772L11.5235 7.24772L8.80772 4.53016C8.51492 4.23718 8.51507 3.7623 8.80805 3.4695C9.10104 3.1767 9.57591 3.17685 9.86871 3.46984L13.8311 7.43478C13.9871 7.57222 14.0855 7.77348 14.0855 7.99772C14.0855 7.99811 14.0855 7.9985 14.0855 7.99888Z"
                  fill=""
                />
              </svg>
            </a>
          </div>
        </Popover>

        <Popover position="bottom">
          <template #trigger>
            <Button size="sm"> Bottom Popover </Button>
          </template>
          <!-- Popover Header -->
          <div
            class="relative rounded-t-xl border-b border-gray-200 px-5 py-3 dark:border-white/[0.03]"
          >
            <h4 class="text-base font-semibold text-gray-800 dark:text-white/90">Popover Title</h4>
          </div>
          <!-- Popover Body -->
          <div class="p-5">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consect adipiscing elit. Mauris facilisis congue exclamate
              justo nec facilisis.
            </p>
            <a
              href="#"
              class="flex items-center gap-1 mt-5 text-sm font-medium text-brand-500 hover:text-brand-600"
            >
              Learn More

              <svg
                class="fill-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.0855 7.99888C14.0858 8.19107 14.0126 8.38334 13.8661 8.53001L9.86873 12.5301C9.57594 12.8231 9.10107 12.8233 8.80807 12.5305C8.51508 12.2377 8.51491 11.7629 8.8077 11.4699L11.5279 8.74772L2.66797 8.74772C2.25375 8.74772 1.91797 8.41194 1.91797 7.99772C1.91797 7.58351 2.25375 7.24772 2.66797 7.24772L11.5235 7.24772L8.80772 4.53016C8.51492 4.23718 8.51507 3.7623 8.80805 3.4695C9.10104 3.1767 9.57591 3.17685 9.86871 3.46984L13.8311 7.43478C13.9871 7.57222 14.0855 7.77348 14.0855 7.99772C14.0855 7.99811 14.0855 7.9985 14.0855 7.99888Z"
                  fill=""
                />
              </svg>
            </a>
          </div>
        </Popover>

        <Popover position="left">
          <template #trigger>
            <Button size="sm"> Left Popover </Button>
          </template>
          <!-- Popover Header -->
          <div
            class="relative rounded-t-xl border-b border-gray-200 px-5 py-3 dark:border-white/[0.03]"
          >
            <h4 class="text-base font-semibold text-gray-800 dark:text-white/90">Popover Title</h4>
          </div>
          <!-- Popover Body -->
          <div class="p-5">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consect adipiscing elit. Mauris facilisis congue exclamate
              justo nec facilisis.
            </p>
          </div>
        </Popover>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '../Button.vue'
import Popover from './Popover.vue'
</script>
