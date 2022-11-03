<template>
  <div class="manage">
    <el-dialog
        :title="modeType === 0?'新增用户':'编辑用户'"
        :visible.sync="dialogVisible"
        width="640px"
        :before-close="handleClose"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
      <!--用户表单信息-->
      <el-form :inline="true" ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input style="width: 200px" v-model:label="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input style="width: 200px" v-model:label="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex" >
          <el-select  style="width: 200px" v-model="form.sex" placeholder="请选择性别">
            <el-option  label="男性" value="男"></el-option>
            <el-option label="女性" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="出生日期" prop="brith">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.brith"
                          style="width: 200px;">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input style="width: 400px" v-model:label="form.address" placeholder="请输入地址"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="addBtn" type="primary">
        + 新增
      </el-button>
      <!--搜索form-->
    </div>
    <div class="table">
      <el-table
          :border="true"
          :data="tableData"
          :stripe="true"
          height="90%"
          style="margin-top: 20px">
        <el-table-column
            type="index"
            :index="1"
            align="center">
        </el-table-column>
        <el-table-column
            align="center"
            prop="name"
            label="姓名"
            width="100">
        </el-table-column>

        <el-table-column
            align="center"
            prop="sex"
            label="性别"
            width="80">
        </el-table-column>

        <el-table-column
            align="center"
            prop="age"
            label="年龄"
            width="80">
        </el-table-column>

        <el-table-column
            prop="brith"
            label="出生日期"
            width="180">
        </el-table-column>

        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>

        <el-table-column
            label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)" type="info" style="margin-right:10px ">
              编辑
            </el-button>
            <el-popconfirm title="确认删除该用户信息吗" @confirm="handleDelete(scope.row)">
              <el-button slot="reference" size="mini"  type="danger">
                删除
              </el-button>
            </el-popconfirm>
          </template>

        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10,20,30,40]"
            :page-size.sync="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </div>



  </div>

</template>

<script>
import {submitUserinfo, getUserInfo, editUser, deleteUser} from "@/api/user";
import mockHttp from "@/utils/mockRequest";


export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form:{
        _id:'',
        name:'',
        age:'',
        sex:'',
        brith:'',
        address:''
      },
      rules: {
        name: [
          { required:true, message:'请输入姓名', trigger: 'blur' }
        ],
        age: [
          { required:true, message:'请输入年龄', trigger: 'blur' }
        ],
        sex: [
          { required:true, message:'请选择性别', trigger: 'change' }
        ],
        brith: [
          { required:true, message:'请输入出生日期', trigger: 'change' }
        ],
        address: [
          { required:true, message:'请输入地址', trigger: 'blur' }
        ],
      },
      tableData: [],
      modeType:0, // 0代表新增,1表示编辑
      // 当前的总条数
      total:0,
      currentPage:1,
      pageSize:10

    };
  },
  methods:{
    submit(){
      this.$refs.form.validate((valid)=>{
        if(valid){
          // 后续对表单数据的处理
          // console.log(this.form)
          if(this.modeType === 0){
            this.addUser()
          }
          else {
            this.oneditUser()
          }

        }
      })
    },
    addUser(){
      submitUserinfo(this.form).then(value => {
        // console.log(value)
        if(value.data.status ===0){
          this.$message({
            message:value.data.msg,
            type:'success'
          })

          // 清除表单数据
          this.$refs.form.resetFields()
          // 关闭弹窗
          this.dialogVisible =false

        }else {
          this.$message({
            message:value.data.msg,
            type:'error'
          })
        }
        this.getUserInfos()

      })
    },
    // 编辑用户
    oneditUser(){
      // console.log(this.form)
      const data={}
      editUser(this.form,this.form._id).then(value => {
        // console.log(value)
        if(value.data.status === 0){
          this.$message({
            message:value.data.msg,
            type:"success"
          })
        }else {
          this.$message({
            message:value.data.msg,
            type:"error"
          })
        }
        // 关闭弹窗
        this.dialogVisible =false
        // 刷新数据
        this.getUserInfos()

      }).catch(reason => {
        // console.log(reason)
        this.$message({
          message:reason,
          type:"error"
        })
      })
    },
    // 弹窗关闭之前执行...
    handleClose(){
      this.form={
        _id:'',
        name:'',
        age:'',
        sex:'',
        brith:'',
        address:''
      }
      this.$refs.form.resetFields()
      this.dialogVisible =false
    },
    addBtn(){
      this.modeType =0
      this.dialogVisible =true
    },
    handleEdit(scope){
      // console.log(scope)
      this.dialogVisible =true
      this.modeType =1

      this.form={
        _id: scope._id,
        name: scope.name,
        age: scope.age,
        brith: scope.brith,
        sex: scope.sex,
        address: scope.address
      }
    },
    getUserInfos(){
      const params = {
        pageSize:this.pageSize,  //一页多少条
        currentPage:this.currentPage   // 当前多少页
      }

      getUserInfo(params).then(({data})=>{
        // console.log(data)
        this.tableData = data.value
        this.total = data.total?data.total : 0
      })
    },
    handleDelete(scope){
      console.log(scope._id)
      // TODO
      // 调用删除的接口,传递id过去
      // 2022/10/25 23:20
      deleteUser(scope._id).then(({data}) => {
        if(data.status === 0){
          this.$message({
            message:data.msg,
            type:'success'
          })
        }else {
          this.$message({
            message:data.msg,
            type:'error'
          })
        }

        this.getUserInfos()

      })
    },
    // 选择页码的回调
    handleCurrentChange(val){
      this.currentPage = val
      this.getUserInfos()
    },
    // 改变页数的回调
    handleSizeChange(val){
      console.log(val)
      this.pageSize =val
      this.getUserInfos()
    }
  },
  created() {
    this.getUserInfos()
  }

}
</script>

<style lang="less" scoped>
body {
  margin: 0;
}
.manage{
  height: 100%;
}
.table{
  height: 90%;
}
.pagination{
  float: right;
  margin-top: 20px;
}
</style>
