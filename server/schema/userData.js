const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userDataSchema = new Schema({
    date:{
        type:String,
        require:true
    },
    new:{
        type:Number,
        require:true
    },
    active:{
        type:Number,
        require:true
    },
},{versionKey:false})

module.exports = userData = mongoose.model('userData',userDataSchema)
