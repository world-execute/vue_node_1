<template>
  <el-row>
    <el-col :span="8" style="padding-right: 20px">
      <div class="grid-content bg-purple">
        <el-card>
          <div class="user">
            <img src="https://s1.ax1x.com/2022/10/22/xcx6rq.md.jpg">
            <div class="user-info">
              <p>Admin</p>
              <p>超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录的时间:<span>2021.7.19</span></p>
            <p>上次登录的地点:<span>武汉</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 10px">
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column v-for="(val,key) in tableLabel"
                :prop="key"
                :label="val"
                :key="val"
                width="80">
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>

    <el-col :span="16">
      <div class="grid-content bg-purple-light">
        <div class="num">
          <el-card v-for="(item) in countData" :key="item.id" :body-style="{display:'flex',padding:0}">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
            <div>
              <p>{{"¥ "+item.value}}</p>
              <p>{{item.name}}</p>
            </div>
          </el-card>
        </div>
      </div>

      <el-card style="height: 280px">
        <!--折线图区域-->
        <div ref="echars1" style="height:280px">

        </div>
      </el-card>
      <div class="graph">
        <el-card style="height: 280px;width: 49%">
          <!--柱状图区域-->
          <div ref="echars2" style="height:280px">

          </div>
        </el-card>
        <el-card style="height: 280px;width: 49%">
          <!--饼状状图区域-->
          <div ref="echars3" style="height:280px">

          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {getDate, getUserData,getVideoData} from "@/api";
import * as echarts from "echarts";

export default {
  name: "Home",
  data() {
    return {
      tableData: [
        {
          name:'oppo',
          todayBuy:10,
          monthBuy:300,
          totalBuy:800
        },
        {
          name:'xiaomi',
          todayBuy:50,
          monthBuy:400,
          totalBuy:1200
        },
        {
          name:'huawei',
          todayBuy:50,
          monthBuy:400,
          totalBuy:1000
        },
        {
          name:'apple',
          todayBuy:90,
          monthBuy:600,
          totalBuy:1300
        },
      ],
      tableLabel:
        {
          name:'课程',
          todayBuy:'今日购买',
          monthBuy:'本月购买',
          totalBuy:'总购买'
        },
      countData:[
        {
          id:1,
          name:"今日支付订单",
          value:134,
          icon:"success",
          color:"#2ec7c9"
        },
        {
          id:2,
          name:"今日收藏订单",
          value:2522,
          icon:"star-on",
          color:"#ffb980"
        },
        {
          id:3,
          name:"今日未支付名单",
          value:1254,
          icon:"s-goods",
          color:"#5ab1ef"
        },
        {
          id:4,
          name:"本月支付订单",
          value:134,
          icon:"success",
          color:"#2ec7c9"
        },
        {
          id:5,
          name:"本月收藏订单",
          value:2014,
          icon:"star-on",
          color:"#ffb980"
        },
        {
          id:6,
          name:"本月未支付名单",
          value:1204,
          icon:"s-goods",
          color:"#5ab1ef"
        }

      ]
    }
  },
  mounted() {
    getDate().then(({data})=>{
      // 基于准备好的dom,初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echars1)
      // 指定图标的配置项和数据
      let echarts1Option= {}
      // 处理数据xAxis
      const xAxis = Object.keys(data.olderlist[0])
      echarts1Option.xAxis = {
        data:data.xdatalist
      }
      echarts1Option.yAxis = {}
      echarts1Option.legend = {
        data:xAxis
      }
      echarts1Option.series = []
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name:key,
          data:data.olderlist.map(item => item[key]),
          type:'line'
        })
        // console.log(data.olderlist.map(item => item[key]))
      })
      // console.log(echarts1Option)

      echarts1.setOption(echarts1Option)
    })
    getUserData().then(({data})=>{
      const echarts2 = echarts.init(this.$refs.echars2)
      const echarts2Options = {
        legend:{
          textStyle:{
            color:'#333'
          }
        },
        grid:{
          left:"20%"
        },
        // 提示框
        tooltip:{
          trigger:'axis'
        },
        xAxis:{
          // 类目轴
          type:'category',
          data:data.map(item => item.date),
          axisLine:{
            lineStyle:{
              color:'#17b3a3'
            }
          },
          axisLabel:{
            interval:0,
            color:'#333'
          }
        },
        yAxis:[
          {
            type:'value',
            axisLine:{
              lineStyle:{
                color:'#17b3a3'
              }
            }
          }
        ],
        series:[
          {
            name:'新增用户',
            data:data.map(item => item.new),
            type:'bar'
          },
          {
            name:'活跃用户',
            data:data.map(item => item.active),
            type:'bar'
          }
        ],
        color:['#2ec7c9','#b6a2de']
      }
      echarts2.setOption(echarts2Options)
    })
    getVideoData().then(({data})=>{
      const echarts3 = echarts.init(this.$refs.echars3)
      const echarts3Options = {
        tooltip: {
          trigger: 'item'
        },
        color:data.map(item => item.color)
        ,
        series:[
          {
            data:data,
            type:'pie'
          }
        ]
      }
      echarts3.setOption(echarts3Options)
    })
  }

}
</script>

<style lang="less" scoped>

.user{
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 20px;
  margin-bottom: 20px;
  img{
    width: 150px;
    border-radius: 50%;
    margin-right: 50px;
  }
}
.user-info p:nth-of-type(1){
  font-size: 32px;
  margin-bottom: 10px;
}
.user-info p:nth-of-type(2){
  color: #8f8f8f;
}
.login-info{
  p{
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span{
      color:#666;
      margin-left: 40px;
    }
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon{
    width:  60px;
    height: 60px;
    font-size: 30px;
    color: white;
    line-height: 60px;
    text-align: center;
  }
  div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    p:nth-of-type(1){
      margin-left: 15px;
      font-size: 25px;
      font-weight: bolder;
      line-height: 30px;
      margin-bottom: 5px;
    }
    p:nth-of-type(2){
      margin-left: 15px;
      font-size: 14px;
      color: #9a9a9a;
      text-align: center;
    }
  }
  .el-card{
    height: 60px;
    width: 31%;
    margin-bottom: 10px;
  }
}
.graph{
  padding-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
