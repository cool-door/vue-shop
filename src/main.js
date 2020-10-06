import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 基础全局样式
import './assets/css/base.css'
// 字体图标库
import './assets/fonts/iconfont.css'
// axios http库
import axios from 'axios'
// 基础请求路径
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
// 挂在axios
Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
