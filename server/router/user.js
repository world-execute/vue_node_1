const express =require('express')
const userRouter = express.Router()
const UserHandler = require('../router_handler/userHandler')
const {userSchemaRule} = require('../validation/user')
const expressJoi = require('@escook/express-joi')

// GET /api/user
userRouter.get('/',UserHandler.getUser)

// POST /api/user/login
userRouter.post('/login',expressJoi(userSchemaRule.loginUser),UserHandler.loginUser)

// POST /api/user/addUser
userRouter.post('/addUser',expressJoi(userSchemaRule.UserInfo),UserHandler.addUser)

// POST /api/user/editUser/:id
userRouter.post('/editUser/:id',expressJoi(userSchemaRule.UserInfo),UserHandler.editUser)

// DELETE /api/user/delete/:id
userRouter.delete('/delete/:id',UserHandler.deleteUser)

module.exports = userRouter
