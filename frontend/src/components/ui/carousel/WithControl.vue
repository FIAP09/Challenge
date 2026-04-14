<template>
  <div class="relative border border-gray-200 rounded-lg carouselTwo dark:border-gray-800">
    <swiper :modules="modules" :autoplay="autoplayOptions" :navigation="navigationOptions">
      <swiper-slide v-for="(item, index) in carouselData" :key="index">
        <div class="overflow-hidden rounded-lg">
          <img
            :src="item.thumbnail"
            :width="487"
            :height="297"
            class="w-full rounded-lg"
            alt="carousel"
          />
        </div>
      </swiper-slide>

      <!-- Navigation buttons -->
      <div class="swiper-button-prev">
        <svg
          class="w-auto h-auto stroke-current"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.25 6L9 12.25L15.25 18.5"
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
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.75 19L15 12.75L8.75 6.5"
            stroke=""
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'

const modules = [Navigation, Autoplay]

const autoplayOptions = {
  delay: 5000,
  disableOnInteraction: false,
}

const navigationOptions = {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
}

const carouselData = ref([
  {
    thumbnail: '/images/carousel/carousel-01.png',
  },
  {
    thumbnail: '/images/carousel/carousel-02.png',
  },
  {
    thumbnail: '/images/carousel/carousel-03.png',
  },
  {
    thumbnail: '/images/carousel/carousel-04.png',
  },
])
</script>
