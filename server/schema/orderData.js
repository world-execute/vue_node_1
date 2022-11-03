const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderDataSchema = new Schema({
    olderdata:{
        type:Object,
        require:true
        },
    xdata:{
        type:String,
        require:true
    }
},{versionKey:false})

module.exports = orderData = mongoose.model('orderData',orderDataSchema)
