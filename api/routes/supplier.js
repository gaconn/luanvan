const express = require('express')
const router = express.Router()
const SupplierController = require('../controllers/supplierController')

router.get('/get-all', SupplierController.getAll)
router.post('/insert', SupplierController.insert)
router.put('/update', SupplierController.update)

module.exports = router