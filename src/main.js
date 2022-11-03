import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../public/css/index.css'
import {Axios} from "axios";
// 按需引入
// import {Button} from 'element-ui'


Vue.config.productionTip = false
Vue.use(elementUI)
// Vue.use(Button)

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  // 判断token是否存在
  const token = localStorage.getItem('token')
  console.log(to.meta)
  if(!token && to.name !== 'login'){
    // token不存在,其并不是访问登录页面
    next({name:'login'})
  }else if(token && to.name === 'login') {
    // token存在,再次访问登录时跳转到首页
    next({name:'home'})
  }else{
    // 处理其他情况
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
