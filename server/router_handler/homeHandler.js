const olderData = require('../schema/orderData')
const userData = require('../schema/userData')
const videoData = require('../schema/videoData')

exports.getDate = (req,res)=>{
    olderData.find().then(value => {
        let xdatalist = []
        let olderlist = []
        for (let i=0; i<value.length;i++){
            xdatalist.push(value[i].xdata)
            olderlist.push(value[i].olderdata)
        }
        // console.log(xdatalist)
        // console.log(olderlist)
        res.status(200).json({"olderlist":olderlist,"xdatalist":xdatalist})
    }).catch(reason => {
        console.log(reason)
        res.status(401)
    })
}

exports.getUserData = (req,res)=>{
    userData.find().then(value => {
        let userDatalist = []
        value.forEach(item => {
            const userinfo ={}
            userinfo.date = item.date
            userinfo.new = item.new
            userinfo.active = item.active
            userDatalist.push(userinfo)
        })
        // console.log(userDatalist)
        res.status(200).json(userDatalist)
    })
}

exports.getVideoData = (req,res)=>{
    videoData.find().then(value => {
        res.status(200).json(value)
    })
}
