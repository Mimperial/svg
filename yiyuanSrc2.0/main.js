// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/reset.css'
import '@/mock/index.js'
import api from './api/index.js'
import axios from 'axios'
import echarts from 'echarts'
import 'echarts-liquidfill'
import exportExcel from './utils/exportExcel.js' // 导出方法
import $ from 'jquery'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)


Vue.use(api)
Vue.prototype.$echarts = echarts
Vue.prototype.$export = exportExcel
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8080'
Vue.prototype.$http = axios
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
