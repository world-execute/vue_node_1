import Vue from 'vue'
import VueRouter from 'vue-router'
// 创建导入路由组件
import Home from "@/views/Home";
import User from "@/views/User";
import NoFound from "@/views/NoFound";
import Main from "@/views/Main";
import Mall from "@/views/Mall";
import PageOne from "@/views/PageOne";
import PageTwo from "@/views/PageTwo";
import Login from "@/views/Login";

Vue.use(VueRouter)


const routes = [
    // 将路由和组件进行映射
  {
    path: '/',
    redirect:'/home',
    name:'Main',
    component: Main,
    children:[
      {
        // 首页
        path:'home',
        name:'home',
        component:Home
      },
      {
        // 用户管理
        path: 'user',
        name: 'user',
        component: User,
        meta:{
          userType:1
        }
      },
      {
        // 商品管理
        path: 'mall',
        name: 'mall',
        component: Mall,
        meta:{
          userType:1
        }
      },
      {
        // 页面1
        path: 'page1',
        name: 'page1',
        component: PageOne
      },
      {
        // 页面2
        path: 'page2',
        name: 'page2',
        component: PageTwo
      }

    ]
  },
  {
    path:'/login',
    name: 'login',
    component: Login
  },
  {
    path: '/*',
    name: 'NoFound',
    component: NoFound

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
