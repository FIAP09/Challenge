<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <stocks-metrics />
      </div>

      <div class="col-span-12 space-y-6 xl:col-span-8">
        <portfolio-performance-chart />
        <trending-stocks />
      </div>

      <div class="col-span-12 space-y-6 xl:col-span-4">
        <dividend-chart />
        <my-watch-list />
      </div>

      <div class="col-span-12">
        <stocks-table />
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import AdminLayout from '../components/layout/AdminLayout.vue'
import StocksMetrics from '../components/stocks/StocksMetrics.vue'
import PortfolioPerformanceChart from '../components/stocks/PortfolioPerformanceChart.vue'
import DividendChart from '../components/stocks/DividendChart.vue'
import MyWatchList from '../components/stocks/Watchlist/MyWatchlist.vue'
import TrendingStocks from '../components/stocks/TrendingStocks.vue'
import StocksTable from '../components/stocks/StocksTable.vue'
</script>
