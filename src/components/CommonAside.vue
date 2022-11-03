<template>
  <div class="aside">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
              router>
      <h3 v-if="isCollapse">后台</h3>
      <h3 v-if="!isCollapse">后台管理系统</h3>
      <el-menu-item @click="clickMenu(item)" :route="item.path" v-for="item in noChildren" :key="item.name" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>

      <el-submenu v-for="item in hadChildren" :key="item.label" :index="item.label">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="subitem in item.children" :key="subitem.name">
          <el-menu-item  @click="clickMenu(subitem)" :route="subitem.path" :index="subitem.name">{{subitem.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 点击菜单
    clickMenu(item){
      // console.log(item)
      // 当页面的路由与跳转的路由不一致的时候才允许跳转
      // if(this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')){
      //   this.$router.push(item.path)
      // }
      this.$store.commit(this.$types.changeTabsList,item)


    }
  },
  computed:{
    // 没有子菜单
    noChildren(){
      return this.menuData.filter(item => item.children.length === 0)
    },
    // 有子菜单
    hadChildren(){
      return this.menuData.filter(item => item.children.length !== 0)
    },
    isCollapse(){
      return this.$store.state.isCollapse
    },
    menuData(){
      return JSON.parse(localStorage.getItem('menu')) || this.$store.state.menuData
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse){
  width: 200px;
  min-height: 400px;
}
.aside{
  height: 100%;
}
.el-menu{
  height: 100%;
  border: 0;
  h3{
    font-size: 16px;
    line-height: 50px;
    max-height: 50px;
    font-weight: normal;
    text-align: center;
    color: #fff;
  }
}
</style>
