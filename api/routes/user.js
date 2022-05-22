const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController")
    router.post("/logon", UserController.logon)
    router.get("/get-detail", UserController.getDetail)
    router.post('/login', UserController.login)

module.exports = router