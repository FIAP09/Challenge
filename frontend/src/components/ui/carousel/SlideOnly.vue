<template>
  <div class="border border-gray-200 rounded-lg carouselOne dark:border-gray-800">
    <swiper :modules="modules" :autoplay="autoplayOptions">
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
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

const modules = [Autoplay]

const autoplayOptions = {
  delay: 5000,
  disableOnInteraction: false,
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
