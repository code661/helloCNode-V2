import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import 'iview/dist/styles/iview.css'
import service from '@/service'
import {Message} from 'iview'

Vue.config.productionTip = false
Vue.prototype.$api = service
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
