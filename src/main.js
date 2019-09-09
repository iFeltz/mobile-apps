import '@/styles/main.scss'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import SvgIcon from 'vue-svgicon'

// Default tag name is 'svgicon'
Vue.use(SvgIcon, {
  tagName: 'svgicon'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
