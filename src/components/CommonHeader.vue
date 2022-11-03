<template>
  <div class="header_container">
    <div class="l-content">
      <el-button style="margin-right: 10px" @click="changeIsCollapse" size="mini" icon="el-icon-menu"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tabsList" :key="item.label"
                            :to="{ path: item.path }">
          {{item.label}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
         <span class="el-dropdown-link">
          <img src="https://s1.ax1x.com/2022/10/22/xcx6rq.md.jpg"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="center">个人中心</el-dropdown-item>
          <el-dropdown-item command="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "CommonHeader",
  methods:{
    changeIsCollapse(){
      this.$store.dispatch('setIsCollapse')
    },
    handleClick(command){
      if(command === 'loginOut'){
        localStorage.removeItem('token')
        localStorage.removeItem('menu')
        this.$router.push('login')
      }
      // if(command === 'center'){
      //   this.$router.push('home')
      // }
    }
  },
  computed:{
    ...mapState(['tabsList'])
  }
}
</script>

<style lang="less" scoped>
.header_container{
  background-color: #333;
  height: 60px;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  div span{
    color: white;
    font-size: 14px;
    margin-left: 10px;
  }
}
.l-content{
  display: flex;
  align-items: center;
  /deep/.el-breadcrumb__item{
    .el-breadcrumb__inner{
      font-weight: normal;
      &.is-link{
        color:white;
      }
    }
  }

}
.r-content{
  span img{
    width: 45px;
    border-radius: 50%;
  }
}
</style>
