import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from 'axios'
import '@/assets/scss/reset.scss' //全局样式

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http

if(process.env.NODE_ENV === 'development') require('@/api/mock')
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
		Vue.prototype.$bus = this
	},
}).$mount('#app')
