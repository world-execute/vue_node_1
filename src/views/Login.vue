<template>
  <div id="login">
    <el-card class="login_form">
      <el-form label-width="80px" :model="form" :rules="rule" :inline="true" ref="form" >
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
          <el-input v-model:form="form.username"  placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="password">
          <el-input v-model:form="form.password"  placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  @click="submit('form')" type="primary" style="margin-left: 124px">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {loginUser} from "@/api/user";
import {getMenuData} from "@/api";

export default {
  name: "Login",
  data() {
    return {
      form:{
        username:'',
        password:''
      },
      rule:{
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    // 登录
    submit(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          const data = {
            name:this.form.username,
            password:this.form.password
          }
          loginUser(data).then(({data}) => {
            if(data.status === 0){
              this.$message({
                message:data.msg,
                type:'success'
              })
              localStorage.setItem('token',data.token)

              // 获取菜单数据存入vuex
              getMenuData({admin:data.admin}).then(({data})=>{
                this.$store.commit(this.$types.changeMenuData,data)
                // TODO 动态路由添加失败
                // this.$store.commit(this.$types.changeRouter,this.$router)
              })
              this.$router.push('home')
            }else {
              this.$message({
                message:data.msg,
                type:'error'
              })
            }
          }).catch(reason => {
            console.log(reason)
          })
        }else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  padding: 0px;
}
#login > div > div{
  padding: 0px;
}
.login_form{
  width: 380px;
  margin: 180px auto;
  border-radius: 15px;
  padding: 35px 15px 15px 15px;
  box-sizing: border-box;
  .el-input{
    width: 180px;
  }
  .login_title{
    text-align: center;
    margin-bottom: 40px;
    color:#505458
  }
}

</style>
