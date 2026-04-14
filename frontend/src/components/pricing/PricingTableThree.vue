<template>
  <div class="grid gap-5 gird-cols-1 sm:grid-cols-2 xl:grid-cols-3 xl:gap-3 2xl:grid-cols-4">
    <!-- Pricing item: Personal -->
    <div>
      <div class="rounded-2xl bg-white p-6 dark:bg-white/[0.03]">
        <span class="block font-semibold text-gray-800 text-theme-xl dark:text-white/90">
          Personal
        </span>

        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Perfect plan for Starters</p>

        <h2 class="mb-0.5 mt-4 text-title-sm font-bold text-gray-800 dark:text-white/90">Free</h2>

        <span class="inline-block mb-6 text-sm text-gray-500 dark:text-gray-400">
          For a Lifetime
        </span>

        <button
          disabled
          class="flex h-11 w-full disabled:pointer-events-none items-center justify-center rounded-lg border border-gray-300 bg-white p-3.5 text-sm font-medium text-gray-400 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          Current Plan
        </button>

        <ul class="mt-6 space-y-3">
          <li
            v-for="(item, index) in personalPack"
            :key="index"
            class="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-400"
          >
            <svg
              class="text-success-500"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Pricing item: Professional -->
    <div>
      <div class="rounded-2xl bg-white p-6 dark:bg-white/[0.03]">
        <span class="block font-semibold text-gray-800 text-theme-xl dark:text-white/90">
          Professional
        </span>

        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">For users who want to do more</p>

        <h2 class="mb-0.5 mt-4 text-title-sm font-bold text-gray-800 dark:text-white/90">$99.00</h2>

        <span class="inline-block mb-6 text-sm text-gray-500 dark:text-gray-400"> /year </span>

        <button
          class="flex h-11 w-full items-center justify-center rounded-lg bg-brand-500 p-3.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
        >
          Try for Free
        </button>

        <ul class="mt-6 space-y-3">
          <li
            v-for="(item, index) in professionalPack"
            :key="index"
            class="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-400"
          >
            <svg
              class="text-success-500"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Pricing item: Team -->
    <div>
      <div class="relative p-6 z-1 rounded-2xl bg-brand-500">
        <div
          class="absolute px-3 py-1 font-medium text-white rounded-lg right-4 top-4 -z-1 bg-white/10 text-theme-xs"
        >
          Recommended
        </div>
        <span class="block font-semibold text-white text-theme-xl"> Team </span>

        <p class="mt-1 text-sm text-white/90">Your entire team in one place</p>

        <h2 class="mb-0.5 mt-4 text-title-sm font-bold text-white">$299</h2>

        <span class="inline-block mb-6 text-sm text-white/90"> /year </span>

        <button
          class="flex h-11 w-full items-center justify-center rounded-lg bg-white p-3.5 text-sm font-medium text-gray-800 shadow-theme-xs hover:bg-gray-50"
        >
          Try for Free
        </button>

        <ul class="mt-6 space-y-3">
          <li
            v-for="(item, index) in teamPack"
            :key="index"
            class="flex items-center gap-3 text-sm text-white"
          >
            <svg
              class="text-white"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Pricing item: Enterprise -->
    <div>
      <div class="rounded-2xl bg-white p-6 dark:bg-white/[0.03]">
        <span class="block font-semibold text-gray-800 text-theme-xl dark:text-white/90">
          Enterprise
        </span>

        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Run your company on your terms</p>

        <h2 class="mb-0.5 mt-4 text-title-sm font-bold text-gray-800 dark:text-white/90">Custom</h2>

        <span class="inline-block mb-6 text-sm text-gray-500 dark:text-gray-400">
          Reach out for a quote
        </span>

        <button
          class="flex h-11 w-full items-center justify-center rounded-lg bg-brand-500 p-3.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
        >
          Try for Free
        </button>

        <ul class="mt-6 space-y-3">
          <li
            v-for="(item, index) in enterprisePack"
            :key="index"
            class="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-400"
          >
            <svg
              class="text-success-500"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const personalPack = ['Unlimited Projects', 'Share with 5 team members', 'Sync across devices']

const professionalPack = [
  'Unlimited Projects',
  'Share with 5 team members',
  'Sync across devices',
  '30 days version history',
]

const teamPack = [
  'Unlimited Projects',
  'Share with 5 team members',
  'Sync across devices',
  'Sharing permissions',
  'Admin tools',
]

const enterprisePack = [
  'Unlimited Projects',
  'Share with 5 team members',
  'Sync across devices',
  'Sharing permissions',
  'User provisioning (SCIM)',
  'Advanced security',
]
</script>
