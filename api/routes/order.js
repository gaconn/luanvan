const express = require('express')

const router = express.Router()
const OrderController = require('../controllers/orderController')

router.get('/get-orders', OrderController.getOrder)
router.post('/checkout-v1', OrderController.checkoutV1)
router.post('/checkout-v2', OrderController.checkoutV2)
router.post('/checkout-v3', OrderController.checkoutV3)
router.post('/checkout', OrderController.checkout)

module.exports = router