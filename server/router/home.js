const express =require('express')
const homeRouter = express.Router()
const homeHandler = require('../router_handler/homeHandler')

// GET /api/home/getData
homeRouter.get('/getData',homeHandler.getDate)

// GET /api/home/getUserData
homeRouter.get('/getUserData',homeHandler.getUserData)

// GET /api/home/getVideoData
homeRouter.get('/getVideoData',homeHandler.getVideoData)

module.exports = homeRouter
