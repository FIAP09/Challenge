<template>
  <div class="relative border border-gray-200 rounded-lg carouselThree dark:border-gray-800">
    <swiper :modules="modules" :autoplay="autoplayOptions" :pagination="paginationOptions">
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
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'

const modules = [Pagination, Autoplay]

const autoplayOptions = {
  delay: 5000,
  disableOnInteraction: false,
}

const paginationOptions = {
  el: '.swiper-pagination',
  clickable: true,
}

const carouselData = ref([
  {
    thumbnail: '/images/carousel/carousel-01.png',
  },
  {
    thumbnail: '/images/carousel/carousel-03.png',
  },
  {
    thumbnail: '/images/carousel/carousel-02.png',
  },
  {
    thumbnail: '/images/carousel/carousel-04.png',
  },
])
</script>
