const express = require("express")
const router = express.Router()

//controller
const ProductController = require("../controllers/productController")
router.get("/", ProductController.getAll)

module.exports = router