<template>
  <div class="main">
    <el-container style="height: 100%">
      <el-aside width="auto"  id="aside">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <common-tag></common-tag>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "@/components/CommonAside";
import CommonHeader from "@/components/CommonHeader";
import CommonTag from "@/components/CommonTag";

export default {
  name: "Main",
  components:{
    CommonAside,
    CommonHeader,
    CommonTag
  }
}
</script>

<style scoped>
.main{
  height: 100vh;
}
.el-header{
  padding: 0;
}
</style>
