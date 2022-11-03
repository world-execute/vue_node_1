const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuDataSchema = new Schema({
    label:{
        type:String,
        require:true
    },
    path:{
        type:String,
    },
    name:{
        type:String,
    },
    icon:{
        type:String,
    },
    url:{
        type:String,
    },
    children:{
        type:Array,
    },
    admin:{
        type:Boolean
    }
},{versionKey:false})

module.exports = menuData = mongoose.model('menuData',menuDataSchema)
