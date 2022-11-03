import http from "@/utils/request";

// 定义一个请求首页数据的接口
export const getDate = ()=>{
   return  http.get('/api/home/getData')
}
export const getUserData = ()=>{
   return http.get('/api/home/getUserData')
}

export const getVideoData = ()=>{
   return http.get('/api/home/getVideoData')
}

export const getMenuData = (data)=>{
   return http.post('/api/menu',data)
}
