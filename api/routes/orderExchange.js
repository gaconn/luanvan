const express = require('express')
const router = express.Router()
const OrderExchangeController = require('../controllers/orderExchangeController')
const { CheckToken } = require('../middlewares/User')
router.get('/get-list',CheckToken, OrderExchangeController.getList)
router.post('/insert',CheckToken, OrderExchangeController.insert)
router.put('/update',CheckToken, OrderExchangeController.update)
router.delete('/delete',CheckToken, OrderExchangeController.delete)

module.exports = router
