// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/mock/index.js'
import axios from 'axios'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
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
