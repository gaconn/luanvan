const express = require("express")
const router = express.Router()
const DiscountController = require("../controllers/discountController")
const { CheckToken } = require("../middlewares/User")
router.get("/get-list", DiscountController.getList)
router.post("/insert", CheckToken, DiscountController.insert)
router.put("/update", CheckToken, DiscountController.update)
router.delete("/delete", CheckToken, DiscountController.delete)

module.exports = router
