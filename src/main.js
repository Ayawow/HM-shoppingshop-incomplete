import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import user from './store/modules/user'

import '@/utils/Vant-ui'
import '@/styles/common.less'

// import Vant from 'vant'
// import 'vant/lib/index.css'
// //全局导入
// Vue.use(Vant)
import { Toast } from 'vant';

Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
  }
})