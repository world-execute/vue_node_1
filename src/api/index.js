import http from "@/utils/request";

// 定义一个请求首页数据的接口
export const getDate = ()=>{
   return  http.get('/api/home/getData')
}

// 请求用户信息
export const getUserData = ()=>{
   return http.get('/api/home/getUserData')
}

// 获取视频数据
export const getVideoData = ()=>{
   return http.get('/api/home/getVideoData')
}

export const getMenuData = (data)=>{
   return http.post('/api/menu',data)
}
