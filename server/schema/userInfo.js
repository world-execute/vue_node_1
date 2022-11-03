const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userInfoSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:String,
        require: true
    },
    sex:{
        type:String,
        require:true
    },
    brith:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    password:{
        type:String,
    },
    admin:{
        type:Boolean
    }
},{versionKey:false})

module.exports = userInfo = mongoose.model('userInfo',userInfoSchema)
