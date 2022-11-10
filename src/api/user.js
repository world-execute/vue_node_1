import http from "@/utils/request";

// 新增用户信息
export const submitUserinfo = (data)=>{
    return http.post('/api/user/addUser',data)
}

// 获取用户信息
export const getUserInfo = (params)=>{
    return http.get('/api/user',{
        params
    })
}

// 修改用户信息
export const editUser =(data,id)=>{
    return http.post(`/api/user/editUser/${id}`,data)
}

// 删除用户
export const deleteUser = (id)=>{
    return http.delete(`/api/user/delete/${id}`)
}

// 注册用户
export const loginUser = (data)=>{
    return http.post('/api/user/login',data)
}
