import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const types = {
  changeIsCollapse:'CHANGE_IS_COLLAPSE',
  changeTabsList:'CHANGE_TABS_LIST',
  changeMenuData:'CHANGE_MENU_DATA',
  deleteTabsList:'DELETE_TABS_LIST',
  changeRouter:'CHANGE_ROUTER'
}
Vue.prototype.$types = types

export default new Vuex.Store({
  state: {
    // 控制菜单的展开还是收起
    isCollapse:true,
    // 面包屑的数据
    tabsList:[
      {
        path: '/home',
        label: '首页'
      }
    ],
    // 侧边栏菜单项
    menuData:[]
  },
  getters: {
    isCollapse: state => state.isCollapse
  },
  mutations: {
    // 修改菜单展开还是收起的方法
    [types.changeIsCollapse](state){
      state.isCollapse = !state.isCollapse
    },
    // 更新面包屑数据
    [types.changeTabsList](state,item){
      // 判断添加的数据是否为首页
      if(item.label !== '首页'){
        const index = state.tabsList.findIndex(items => items.label === item.label)
        if(index === -1){
          // 如果不存在
          state.tabsList.push({
            path:item.path,
            label:item.label
          })
        }
      }

    },
    // 删除指定的面包屑数据
    [types.deleteTabsList](state,tag) {
      const index = state.tabsList.findIndex(item => item.label === tag.label)
      state.tabsList.splice(index, 1)
    },

    // 获取菜单数据
    [types.changeMenuData](state,data){
      state.menuData = data
      // 数据存入浏览器缓存中
      localStorage.setItem('menu',JSON.stringify(data))
    },

    // 动态注册路由
    [types.changeRouter](state,router){
      // 判断缓存是否有数据
      if(!localStorage.getItem('menu'))return
      const menu = JSON.parse(localStorage.getItem('menu'))
      // 组装动态路由
      const menuArray = []
      menu.forEach(item =>{
        if(item.children.length>0){
          item.children = item.children.map(item=>{
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        }else {
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      })
      // 动态添加
      // TODO 无法添加动态路由,添加后无法跳转,getRouter()返回显示已添加
      const routerArray = []
      console.log(menuArray)
      menuArray.forEach(item =>{
        router.addRoute('Main',item)
      })
      console.log(router)
    }
  },
  actions: {
    setIsCollapse:({commit})=>{
      commit(types.changeIsCollapse)
    }
  },
  modules: {
  }
})
