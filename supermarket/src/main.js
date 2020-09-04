import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 样式重叠
import "./assets/reset.css"
// import '../src/assets/stylus/index.styl'

// vant引入
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')