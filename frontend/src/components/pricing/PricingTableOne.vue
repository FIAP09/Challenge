<template>
  <div>
    <div class="mx-auto w-full max-w-[385px]">
      <h2 class="font-bold text-center text-gray-800 mb-7 text-title-sm dark:text-white/90">
        Flexible Plans Tailored to Fit Your Unique Needs!
      </h2>
    </div>
    <div>
      <div class="mb-10 text-center">
        <div class="relative inline-flex p-1 mx-auto bg-gray-200 rounded-full z-1 dark:bg-gray-800">
          <span
            class="absolute top-1/2 -z-1 flex h-11 w-[120px] -translate-y-1/2 rounded-full bg-white shadow-theme-xs duration-200 ease-linear dark:bg-white/10"
            :class="isMonthly ? 'translate-x-0' : 'translate-x-full'"
          ></span>
          <button
            @click="isMonthly = true"
            :class="[
              'flex h-11 w-[120px] items-center justify-center text-base font-medium',
              isMonthly
                ? 'text-gray-800 dark:text-white/90'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-white/70 dark:text-gray-400',
            ]"
          >
            Monthly
          </button>
          <button
            @click="isMonthly = false"
            :class="[
              'flex h-11 w-[120px] items-center justify-center text-base font-medium',
              !isMonthly
                ? 'text-gray-800 dark:text-white/90'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-white/80 dark:text-gray-400',
            ]"
          >
            Annually
          </button>
        </div>
      </div>

      <div class="grid gap-5 gird-cols-1 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        <!-- Pricing item -->
        <div
          class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <span class="block mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
            Starter
          </span>

          <div class="flex items-center justify-between mb-1">
            <div class="flex items-end">
              <h2 class="font-bold text-gray-800 text-title-md dark:text-white/90">
                ${{ isMonthly ? '5.00' : '40.00' }}
              </h2>

              <span class="inline-block mb-1 text-sm text-gray-500 dark:text-gray-400">
                /month
              </span>
            </div>
            <span class="font-semibold text-gray-400 line-through text-theme-xl">
              ${{ isMonthly ? '12.00' : '150.00' }}
            </span>
          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400">For solo designers & freelancers</p>

          <div class="w-full h-px my-6 bg-gray-200 dark:bg-gray-800"></div>

          <ul class="mb-8 space-y-3">
            <li
              v-for="(item, index) in starterPack"
              :key="index"
              class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657"
                  stroke="#12B76A"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ item }}
            </li>
          </ul>

          <button
            class="flex w-full items-center justify-center rounded-lg bg-gray-800 p-3.5 text-sm font-medium text-white shadow-theme-xs transition-colors hover:bg-brand-500 dark:bg-white/10 dark:hover:bg-brand-600"
          >
            Choose Starter
          </button>
        </div>

        <!-- Pricing item -->
        <div
          class="p-6 bg-gray-800 border border-gray-800 rounded-2xl dark:border-white/10 dark:bg-white/10"
        >
          <span class="block mb-3 font-semibold text-white text-theme-xl"> Medium </span>

          <div class="flex items-center justify-between mb-1">
            <div class="flex items-end">
              <h2 class="font-bold text-white text-title-md">
                ${{ isMonthly ? '10.99' : '100.00' }}
              </h2>

              <span class="inline-block mb-1 text-sm text-white/70"> /month </span>
            </div>

            <span class="font-semibold text-gray-300 line-through text-theme-xl">
              ${{ isMonthly ? '30.00' : '250.00' }}
            </span>
          </div>

          <p class="text-sm text-white/70">For working on commercial projects</p>

          <div class="w-full h-px my-6 bg-white/20"></div>

          <ul class="mb-8 space-y-3">
            <li
              v-for="(item, index) in mediumPack"
              :key="index"
              class="flex items-center gap-3 text-sm text-white/80"
            >
              <CheckLineIcon class="text-success-500" />
              {{ item }}
            </li>
          </ul>
          <button
            class="flex w-full items-center justify-center rounded-lg bg-brand-500 p-3.5 text-sm font-medium text-white shadow-theme-xs transition-colors hover:bg-brand-600 dark:hover:bg-brand-600"
          >
            Choose Medium
          </button>
        </div>

        <!-- Pricing item -->
        <div
          class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <span class="block mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
            Large
          </span>

          <div class="flex items-center justify-between mb-1">
            <div class="flex items-end">
              <h2 class="font-bold text-gray-800 text-title-md dark:text-white/90">
                ${{ isMonthly ? '15.00' : '190.00' }}
              </h2>
              <span class="inline-block mb-1 text-sm text-gray-500 dark:text-gray-400">
                /month
              </span>
            </div>
            <span class="font-semibold text-gray-400 line-through text-theme-xl">
              ${{ isMonthly ? '59.00' : '350.00' }}
            </span>
          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400">For teams larger than 5 members</p>

          <div class="w-full h-px my-6 bg-gray-200 dark:bg-gray-800"></div>

          <ul class="mb-8 space-y-3">
            <li
              v-for="(item, index) in largePack"
              :key="index"
              class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4017 4.35986L6.12166 11.6399L2.59833 8.11657"
                  stroke="#12B76A"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ item }}
            </li>
          </ul>
          <button
            class="flex w-full items-center justify-center rounded-lg bg-gray-800 p-3.5 text-sm font-medium text-white shadow-theme-xs transition-colors hover:bg-brand-500 dark:bg-white/10 dark:hover:bg-brand-600"
          >
            Choose Large
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isMonthly = ref(true)

const starterPack = [
  '5 website',
  '500 MB Storage',
  'Unlimited Sub-Domain',
  '3 Custom Domain',
  'Free SSL Certificate',
  'Unlimited Traffic',
]

const mediumPack = [
  '10 website',
  '1 GB Storage',
  'Unlimited Sub-Domain',
  '5 Custom Domain',
  'Free SSL Certificate',
  'Unlimited Traffic',
]

const largePack = [
  '15 website',
  '10 GB Storage',
  'Unlimited Sub-Domain',
  '10 Custom Domain',
  'Free SSL Certificate',
  'Unlimited Traffic',
]
</script>
