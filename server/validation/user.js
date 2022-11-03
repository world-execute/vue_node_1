const joi = require('joi')
const getErrMessage = require('./joiErrMsg')

const name = joi.string().required().messages(getErrMessage('姓名'))
const age = joi.string().required().messages(getErrMessage('年龄'))
const sex = joi.string().required().messages(getErrMessage('性别'))
const brith = joi.string().required().messages(getErrMessage('出生日期'))
const address = joi.string().required().messages(getErrMessage('地址'))
const password = joi.string().required().messages(getErrMessage('密码'))

exports.userSchemaRule = {
    UserInfo:{
        body:{
            name,age,sex,brith,address
        }
    },
    loginUser:{
        body:{
            name,password
        }
    }

}
