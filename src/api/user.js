import http from "@/utils/request";

// 新增用户信息
export const submitUserinfo = (data)=>{
    return http.post('/api/user/addUser',data)
}
export const getUserInfo = (params)=>{
    return http.get('/api/user',{
        params
    })
}

export const editUser =(data,params)=>{
    return http.post(`/api/user/editUser/${params}`,data)
}

export const deleteUser = (id)=>{
    return http.delete(`/api/user/delete/${id}`)
}

export const loginUser = (data)=>{
    return http.post('/api/user/login',data)
}
