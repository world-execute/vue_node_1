const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoDataSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    value:{
        type:Number,
        require: true
    },
    color:{
        type:String,
        require:true
    }
},{versionKey:false})

module.exports = videoData = mongoose.model('videoData',videoDataSchema)
