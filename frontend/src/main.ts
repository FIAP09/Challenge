import './assets/main.css'

import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueApexCharts from 'vue3-apexcharts'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueApexCharts)
app.use(Toast)
app.mount('#app')
