const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const homeRouter = require('./router/home')
const mongodbURl = 'mongodb://127.0.0.1:27017/test'
const mongoose = require('mongoose')
const userRouter = require('./router/user')
const menuRouter = require('./router/menu')
const joi = require('joi')

mongoose.connect(mongodbURl)
    .then(()=>{
        console.log('Mongodb is connected')
    }).catch((err)=>{
    console.log(err)
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
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
    console.log(`server running at http://localhost:${port}`)
})
