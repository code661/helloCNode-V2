import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import 'iview/dist/styles/iview.css'
import service from '@/service'

Vue.config.productionTip = false
Vue.prototype.$api = service

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
