import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 日期操作相关库
import moment from 'moment'
import './plugins/element.js'
// 基础全局样式
import './assets/css/base.css'
// 字体图标库
import './assets/fonts/iconfont.css'
// axios http库
import axios from 'axios'
// 基础请求路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 拦截器
axios.interceptors.request.use(config => {
  // 添加令牌
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})

// 挂载相关类库
Vue.prototype.$http = axios
Vue.prototype.$moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
