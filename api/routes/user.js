const express = require("express")
const router = express.Router()
const checkToken =require('../middlewares/User')
const UserController = require("../controllers/userController")
const { CheckToken } = require("../middlewares/User")
    router.post("/logon", UserController.logon)
    router.get("/get-detail", UserController.getDetail)
    router.post('/login',UserController.login)
    router.post("/register", UserController.Register)
    router.post('/send-mail', UserController.sendResetLinkEmail)
    router.get('/get-list', UserController.getList)
    router.delete('/delete',CheckToken, UserController.delete)
    router.put('/update', UserController.update)
module.exports = router