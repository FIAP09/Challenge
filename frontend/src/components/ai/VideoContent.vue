<template>
  <div
    class="custom-scrollbar relative z-20 mx-auto max-h-[50vh] max-w-[720px] flex-1 space-y-7 overflow-y-auto"
  >
    <!-- User Message -->
    <div class="flex justify-end">
      <div
        class="shadow-theme-xs bg-brand-100 dark:bg-brand-500/20 max-w-[480px] rounded-xl rounded-tr-xs px-4 py-3"
      >
        <p class="text-left text-sm font-normal text-gray-800 dark:text-white/90">
          Generate a video building image with glass
        </p>
      </div>
    </div>
    <!-- AI Response -->
    <div class="mb-6 flex justify-start">
      <div class="max-w-[720px]">
        <div class="relative rounded-xl">
          <img src="/images/ai/video-thumb.png" class="w-full rounded-xl" alt="" />
          <a
            href="https://www.youtube.com/watch?v=_iHmNaQBtKk"
            class="video-popup absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/40 backdrop-blur-[10px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M7.4375 6.47291L7.4375 21.527C7.4375 22.6999 8.72295 23.419 9.7224 22.8053L21.9808 15.2782C22.9342 14.6928 22.9342 13.3072 21.9808 12.7217L9.72239 5.19465C8.72295 4.58095 7.4375 5.30008 7.4375 6.47291Z"
                fill="#344054"
              />
            </svg>
          </a>
        </div>
        <div class="mt-3">
          <button
            class="flex h-8 items-center gap-1 rounded-full border border-gray-100 bg-white px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M16.6671 13.3333V15.4166C16.6671 16.107 16.1074 16.6666 15.4171 16.6666H4.58301C3.89265 16.6666 3.33301 16.107 3.33301 15.4166V13.3333M10.0013 13.3333L10.0013 3.33331M6.14553 9.47948L9.99958 13.3311L13.8539 9.47948"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Download
          </button>
          <p class="mt-3 text-sm leading-5 text-gray-500 dark:text-gray-400">
            Here is the tall building with a sleek glass facade, as described. The structure
            features modern elements with reflective glass panels that shimmer beautifully under the
            sunlight.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
