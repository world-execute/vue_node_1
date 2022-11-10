const userInfo = require('../schema/userInfo')
const jwt = require('jsonwebtoken')
const config = require('../config')

// POST api/user/loginUser
exports.loginUser = (req,res)=>{
    const name = req.body.name
    userInfo.findOne({name}).then(value => {
        if(!value){
            return res.send({status:-1,msg:'用户不存在'})
        }
        if(value.password === req.body.password){

            // console.log(value)
            const payload = {
                name:value.name,
                age:value.age,
                sex:value.sex,
                brith: value.brith
            }
            jwt.sign(payload,config.jwtSecret,config.option,(err,token)=>{
                if(err){
                    console.log(err)
                    return res.send({status:-1,mag:'Token生成出错'})
                }
                return res.send({status:0,msg:'登陆成功',token:'Bearar '+token,admin:value.admin})
            })
        }else {
            res.send({status:-1,msg:'密码错误'})
        }

    })
}

exports.addUser = (req,res) =>{
    const data = req.body
    const brith = data.brith.slice(0,10)
    userInfo.findOne({name:data.name}).then(value => {
        if(value){
            return res.send({msg:'用户名已存在',status:-1})
        }else {
            const newUserInfo = new userInfo({
                name:data.name,
                age:data.age,
                sex:data.sex,
                brith,
                address:data.address
            })
            newUserInfo.save().then((val)=>{
                return res.send({msg:'用户新增成功',status:0})
            }).catch(reason => {
                return res.send({msg:'用户新增失败',status:-1,err:reason})
            })
        }

    })
}

exports.getUser = (req,res)=>{
    // console.log(req.query)
    const pageSize = req.query.pageSize
    const currentPage = req.query.currentPage
    let total = 0

    // 数据总量
    // countDocuments()：符合查询条件的数目长度
    // estimatedDocumentCount()：忽略查询条件，返回所有数据的数目长度
    userInfo.estimatedDocumentCount().then(value => {
        total = value
    }).catch(()=>{
        res.send({status:-1,msg:'查询数据总量出错'})
    })

    //跳过的数量
    const skipNum = (currentPage -1) * pageSize
    userInfo.find().skip(skipNum).limit(pageSize).then(value => {
        res.send({status:0,value,total})
    }).catch(reason => {
        res.send({status:-1,reason})
    })
}

exports.editUser = (req,res) =>{
    const data = req.body
    const brith = data.brith.slice(0,10)
    const userinfo = {
        name:data.name,
        age:data.age,
        sex:data.sex,
        brith,
        address:data.address
    }
    console.log(req.params)

    userInfo.findOneAndUpdate(
        {_id:req.params.id},
        {$set:userinfo},
        {new:true}
    ).then(value => {
        // console.log(value)
        res.send({msg:'用户编辑成功',status:0})
    }).catch(err =>{
        res.send({msg:'用户编辑失败',status:-1,err})
    })
}

exports.deleteUser = (req,res)=>{
    // console.log(req.params.id)
    userInfo.findOneAndRemove(
        {_id:req.params.id}
    ).then(value =>{
        res.send({msg:'删除成功',status:0})
    }).catch(reason => {
        res.send({msg:'删除失败',status:-1,err:reason})
    })
}

exports
