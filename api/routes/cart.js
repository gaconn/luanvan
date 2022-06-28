const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cartController')

router.get('/get-cart', CartController.getCart)
router.post('/add-to-cart', CartController.addToCart)
router.put('/update-cart', CartController.upadteCart)
router.delete('remove-cart-item', CartController.removeCartItem)

module.exports = router