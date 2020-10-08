import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 日期操作相关库
// import moment from 'moment'
// import './plugins/element.js'
// 基础全局样式
import './assets/css/base.css'
// 字体图标库
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
/* import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css' */

// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

// axios http库
import axios from 'axios'
// 基础请求路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 在 request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  // console.log(config)
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

// 挂载相关类库
Vue.prototype.$http = axios
// Vue.prototype.$moment = moment

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

// 注册全局消息确认框
Vue.prototype.$confirmResult = async function (value) {
  // 返回处理后的值
  // 弹框提示用户是否要删除
  const confirmResult = await this.$confirm(
    '此操作将永久删除该文件, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).catch(err => err)
  return confirmResult
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
