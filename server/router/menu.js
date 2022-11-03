const express =require('express')
const menuRouter = express.Router()
const menuHandler = require('../router_handler/menuHandler')

// POST api/menu/addMenu
menuRouter.post('/addMenu',menuHandler.addMenu)

// POST api/menu
menuRouter.post('/',menuHandler.getMenu)

module.exports = menuRouter
