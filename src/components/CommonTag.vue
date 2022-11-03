<template>
  <div class="tabs">
    <el-tag
        v-for="(tag,index) in tabsList"
        :key="tag.label"
        type="info"
        :effect="$route.path === tag.path? 'dark':'plain'"
        :closable="tag.label!=='首页'"
        @close="closeTag(tag,index)"
        @click="clickTag(tag)">
      {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import {mapState,mapMutations} from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {
    };
  },
  computed:{
    ...mapState(['tabsList'])
  },
  methods:{
    // 点击tag路由跳转的功能
    clickTag(tag){
      // console.log(tag)
      if(this.$route.path !== tag.path && !(this.$route.path === '/home' && tag.path === '/')){
        this.$router.push(tag.path)
      }
    },
    // 点击tag删除的功能
    closeTag(tag,index){
      // console.log(this.$route)
      // console.log(tag)
      const length = this.tabsList.length -1
      this.$store.commit(this.$types.deleteTabsList,tag)
      // 删除之后的跳转
      // 非激活删除不跳转
      if(tag.path !== this.$route.path){
        return
      }
      // 表示删除的是最后一项
      if(index === length){
        this.$router.push({
          path:this.tabsList[index -1].path
        })
      }else {
        this.$router.push({
          path:this.tabsList[index].path
        })
      }
    },
  }
}
</script>

<style lang="less" scoped>
  .tabs{
    padding: 10px 10px 0 20px;
    .el-tag{
      margin-right: 15px;
      cursor: pointer;
    }
  }
</style>
