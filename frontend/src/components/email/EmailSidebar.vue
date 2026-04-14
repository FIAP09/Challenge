<template>
  <div
    class="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="pb-5">
      <button
        class="flex items-center justify-center w-full gap-2 p-3 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
      >
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.0911 3.03206C16.2124 2.15338 14.7878 2.15338 13.9091 3.03206L5.6074 11.3337C5.29899 11.6421 5.08687 12.0335 4.99684 12.4603L4.26177 15.945C4.20943 16.1931 4.286 16.4508 4.46529 16.6301C4.64458 16.8094 4.90232 16.8859 5.15042 16.8336L8.63507 16.0985C9.06184 16.0085 9.45324 15.7964 9.76165 15.488L18.0633 7.18631C18.942 6.30763 18.942 4.88301 18.0633 4.00433L17.0911 3.03206ZM14.9697 4.09272C15.2626 3.79982 15.7375 3.79982 16.0304 4.09272L17.0027 5.06499C17.2956 5.35788 17.2956 5.83276 17.0027 6.12565L16.1043 7.02402L14.0714 4.99109L14.9697 4.09272ZM13.0107 6.05175L6.66806 12.3944C6.56526 12.4972 6.49455 12.6277 6.46454 12.7699L5.96704 15.1283L8.32547 14.6308C8.46772 14.6008 8.59819 14.5301 8.70099 14.4273L15.0436 8.08468L13.0107 6.05175Z"
            fill="currentColor"
          />
        </svg>
        Compose
      </button>
    </div>
    <Simplebar class="max-h-[550px] 2xl:max-h-[640px]">
      <div class="py-6 overflow-auto no-scrollbar">
        <nav class="space-y-5">
          <!-- Mailbox Group -->
          <div>
            <h3
              class="mb-3 text-xs font-medium uppercase leading-[18px] text-gray-700 dark:text-gray-400"
            >
              MAILBOX
            </h3>
            <ul class="flex flex-col gap-1">
              <li v-for="item in mailboxItems" :key="item.name">
                <a
                  :href="item.href"
                  class="group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400"
                  :class="{
                    'text-brand-500 bg-brand-50 dark:text-brand-400 dark:bg-brand-500/[0.12]':
                      isActive === item.name,
                    'text-gray-500 dark:text-gray-400': isActive !== item.name,
                  }"
                >
                  <span class="flex items-center gap-3">
                    <component :is="item.icon" class="fill-current" />
                    {{ item.label }}
                  </span>
                  <span
                    v-if="item.count"
                    :class="{
                      'text-brand-500 dark:text-brand-400': isActive === item.name,
                      'text-gray-700 dark:text-gray-300 group-hover:text-brand-500 dark:group-hover:text-brand-400':
                        isActive !== item.name,
                    }"
                  >
                    {{ item.count }}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Filter Group -->
          <div>
            <h3
              class="mb-3 text-xs font-medium uppercase leading-[18px] text-gray-700 dark:text-gray-400"
            >
              FILTER
            </h3>
            <ul class="flex flex-col gap-1">
              <li v-for="item in filterItems" :key="item.name">
                <a
                  :href="item.href"
                  class="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400"
                  :class="{
                    'text-brand-500 bg-brand-50 dark:text-brand-400 dark:bg-brand-500/[0.12]':
                      isActive === item.name,
                    'text-gray-500 dark:text-gray-400': isActive !== item.name,
                  }"
                >
                  <span class="flex items-center gap-3">
                    <component :is="item.icon" class="fill-current" />
                    {{ item.label }}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Label Group -->
          <div>
            <h3
              class="mb-3 text-xs font-medium uppercase leading-[18px] text-gray-700 dark:text-gray-400"
            >
              LABEL
            </h3>
            <ul class="flex flex-col gap-1">
              <li v-for="item in labelItems" :key="item.name">
                <a
                  :href="item.href"
                  class="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400"
                  :class="{
                    'text-brand-500 bg-brand-50 dark:text-brand-400 dark:bg-brand-500/[0.12]':
                      isActive === item.name,
                    'text-gray-500 dark:text-gray-400': isActive !== item.name,
                  }"
                >
                  <span class="flex items-center gap-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.7567 3.89683C11.6331 3.72282 11.4696 3.58089 11.28 3.48289C11.0904 3.3849 10.8801 3.33367 10.6667 3.3335L3.33333 3.34016C2.59667 3.34016 2 3.93016 2 4.66683V11.3335C2 12.0702 2.59667 12.6602 3.33333 12.6602L10.6667 12.6668C11.1167 12.6668 11.5133 12.4435 11.7567 12.1035L14.6667 8.00016L11.7567 3.89683Z"
                        :fill="item.color"
                      />
                    </svg>
                    {{ item.label }}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </Simplebar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MailBox, SendIcon, DraftIcon, TrashIcon, ArchiveIcon, StaredIcon, FlagIcon } from '@/icons'
import Simplebar from 'simplebar-vue'

const isActive = ref('inbox')

const mailboxItems = [
  { name: 'inbox', label: 'Inbox', icon: MailBox, href: '#', count: 3 },
  { name: 'sent', label: 'Sent', icon: SendIcon, href: '#' },
  { name: 'drafts', label: 'Drafts', icon: DraftIcon, href: '#' },
  { name: 'spam', label: 'Spam', icon: MailBox, href: '#', count: 2 },
  { name: 'trash', label: 'Trash', icon: TrashIcon, href: '#' },
  { name: 'archive', label: 'Archive', icon: ArchiveIcon, href: '#' },
]

const filterItems = [
  { name: 'starred', label: 'Starred', icon: StaredIcon, href: '#' },
  { name: 'important', label: 'Important', icon: FlagIcon, href: '#' },
]

const labelItems = [
  { name: 'personal', label: 'Personal', color: '#12B76A', href: '#' },
  { name: 'work', label: 'Work', color: '#F04438', href: '#' },
  { name: 'payments', label: 'Payments', color: '#FD853A', href: '#' },
  { name: 'invoices', label: 'Invoices', color: '#36BFFA', href: '#' },
  { name: 'blank', label: 'Blank', color: '#6172F3', href: '#' },
]
</script>
