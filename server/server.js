const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const homeRouter = require('./router/home')
const {mongoose} = require('mongoose')
const userRouter = require('./router/user')
const menuRouter = require('./router/menu')
const joi = require('joi')
const db_info = {
    host:'127.0.0.1',
    port:'27017',
    db:'demo1'
}
const db_config = {
    // poolSize:5,
    auth:{
        username:'admin',
        password:'622821'
    }
}
// mongoose.Promise = global.Promise
const url = `mongodb://${db_info.host}:${db_info.port}/${db_info.db}`
mongoose.connect(url,db_config).then(() => {
    console.log('mongodb is connection')
}).catch((err) => {
    console.log(err)
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

// 路由
app.use('/api/home',homeRouter)
app.use('/api/user',userRouter)
app.use('/api/menu',menuRouter)

// 错误级别的中间件
app.use((err,req, res, next) =>{
    if(err){
        if(err.message === 'No authorization token was found'){
            return res.status(401).json({msg:'无效的Token或Token已过期'})
        }
        if(err instanceof joi.ValidationError){
            return res.json({status:-1,msg:err.message})
        }
        return res.status(500).json({msg:'服务器未知错误',err:err.message})
    }
} )

app.listen(port,()=>{
    console.log(`ApiServer running, Basis url: http://localhost:${port}`)
})
