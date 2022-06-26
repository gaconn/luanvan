const express = require('express')

const router = express.Router()
const OrderController = require('../controllers/orderController')

router.get('/get-orders', OrderController.getOrder)
router.post('/checkout-v1', OrderController.checkoutV1)

module.exports = router