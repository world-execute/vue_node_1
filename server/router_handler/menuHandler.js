const userInfo = require('../schema/userInfo')
const menuData = require('../schema/menuData')

exports.addMenu = (req,res)=>{
    const data = req.body
    const newMenuData = new menuData({
        label:data.label,
        path:data.path,
        name:data.name,
        icon:data.icon,
        url:data.url,
        children:data.children
    })
    newMenuData.save().then(value => {
        res.send("ok")
    }).catch(reason => {
        res.send(reason)
    })
}

exports.getMenu = (req,res)=>{
    let options = {admin:false}
    if(req.body.admin)options={}
    menuData.find(options,{_id:0}).then(value => {
        res.send(value)
    }).catch(reason => {
        res.send(reason)
    })
}
