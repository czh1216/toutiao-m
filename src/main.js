import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'amfe-flexible'//引入加载执行amfe-flexible
import '@/assets/download/iconfont.css' //引入字体图标css
import router from '@/router'
import 'vant/lib/index'//加载Vant全局样式

import Vant from 'vant' //引入 vant 导入所有组件
import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
