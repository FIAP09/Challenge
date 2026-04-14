<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6"
  >
    <div class="flex justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Trending Stocks</h3>

      <div class="stocks-slider-outer relative flex items-center gap-1.5">
        <div class="swiper-button-prev">
          <svg
            class="stroke-current"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.1667 4L6 8.16667L10.1667 12.3333"
              stroke=""
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div class="swiper-button-next">
          <svg
            class="stroke-current"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.83333 12.6667L10 8.50002L5.83333 4.33335"
              stroke=""
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>

    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="20"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :breakpoints="{
        768: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 2.3,
        },
        1536: {
          slidesPerView: 2.3,
        },
      }"
      class="stocksSlider"
    >
      <SwiperSlide v-for="stock in stocks" :key="stock.symbol">
        <div class="rounded-2xl bg-gray-100 p-5 dark:bg-white/[0.03]">
          <div
            class="flex items-center justify-between pb-5 mb-5 border-b border-gray-200 dark:border-gray-800"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10">
                <img :src="stock.logo" :alt="stock.name" />
              </div>

              <div>
                <h3 class="text-base font-semibold text-gray-800 dark:text-white/90">
                  {{ stock.symbol }}
                </h3>
                <span class="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {{ stock.name }}
                </span>
              </div>
            </div>

            <div>
              <div>
                <h4
                  class="mb-1 font-medium text-right text-gray-700 text-theme-sm dark:text-gray-400"
                >
                  {{ stock.price }}
                </h4>
              </div>

              <span
                class="flex items-center justify-end gap-1 font-medium text-theme-xs"
                :class="
                  stock.change >= 0
                    ? 'text-success-600 dark:text-success-500'
                    : 'text-error-600 dark:text-error-500'
                "
              >
                <svg
                  v-if="stock.change >= 0"
                  class="fill-current"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.56462 1.62394C5.70193 1.47073 5.90135 1.37433 6.12329 1.37433C6.1236 1.37433 6.12391 1.37433 6.12422 1.37433C6.31631 1.37416 6.50845 1.44732 6.65505 1.59381L9.65514 4.59181C9.94814 4.8846 9.94831 5.35947 9.65552 5.65247C9.36273 5.94546 8.88785 5.94563 8.59486 5.65284L6.87329 3.93248L6.87329 10.125C6.87329 10.5392 6.53751 10.875 6.12329 10.875C5.70908 10.875 5.37329 10.5392 5.37329 10.125L5.37329 3.93579L3.65516 5.65282C3.36218 5.94562 2.8873 5.94547 2.5945 5.65249C2.3017 5.3595 2.30185 4.88463 2.59484 4.59183L5.56462 1.62394Z"
                    fill=""
                  />
                </svg>
                <svg
                  v-else
                  class="fill-current"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.43538 10.3761C6.29807 10.5293 6.09865 10.6257 5.87671 10.6257C5.8764 10.6257 5.87609 10.6257 5.87578 10.6257C5.68369 10.6258 5.49155 10.5527 5.34495 10.4062L2.34486 7.40819C2.05186 7.1154 2.05169 6.64053 2.34448 6.34753C2.63727 6.05454 3.11215 6.05437 3.40514 6.34716L5.12671 8.06752L5.12671 1.875C5.12671 1.46079 5.46249 1.125 5.87671 1.125C6.29092 1.125 6.62671 1.46079 6.62671 1.875L6.62671 8.06421L8.34484 6.34718C8.63782 6.05438 9.1127 6.05453 9.4055 6.34751C9.6983 6.6405 9.69815 7.11537 9.40516 7.40817L6.43538 10.3761Z"
                    fill=""
                  />
                </svg>

                {{ Math.abs(stock.change).toFixed(2) }}%
              </span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button
              class="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white p-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
              @click="shortStock(stock)"
            >
              Short Stock
            </button>

            <button
              class="flex items-center justify-center w-full p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm shadow-theme-xs hover:bg-brand-600"
              @click="buyStock(stock)"
            >
              Buy Stock
            </button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

const modules = [Navigation]

const stocks = ref([
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc',
    logo: '/images/brand/brand-09.svg',
    price: '$192.53',
    change: 1.01,
  },
  {
    symbol: 'AAPL',
    name: 'Apple, Inc',
    logo: '/images/brand/brand-07.svg',
    price: '$192.53',
    change: 3.59,
  },
  {
    symbol: 'SPOT',
    name: 'Spotify, Inc',
    logo: '/images/brand/brand-11.svg',
    price: '$192.53',
    change: 1.01,
  },
  {
    symbol: 'PYPL',
    name: 'Paypal, Inc',
    logo: '/images/brand/brand-08.svg',
    price: '$192.53',
    change: 1.01,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon, Inc',
    logo: '/images/brand/brand-10.svg',
    price: '$192.53',
    change: 1.01,
  },
])

const shortStock = (stock) => {
  console.log(`Shorting ${stock.symbol}`)
  // Implement short stock logic here
}

const buyStock = (stock) => {
  console.log(`Buying ${stock.symbol}`)
  // Implement buy stock logic here
}
</script>
