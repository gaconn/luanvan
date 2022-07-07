const express = require("express")
const router = express.Router()

//controller
const ProductController = require("../controllers/productController")
const upload = require("../middlewares/Files")
router.get("/get-all", ProductController.getAll)
router.post("/insert", upload.array('files', 20), ProductController.insert)
router.get('/get-detail', ProductController.getDetail)
router.delete('/delete', ProductController.delete)
router.put('/update',upload.array('files', 20), ProductController.update)
router.get('/get-product-checkout-list', ProductController.getCheckoutList)

module.exports = router