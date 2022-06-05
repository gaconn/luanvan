const express = require('express')
const router = express.Router()
const SupplierController = require('../controllers/supplierController')

router.get('/get-all', SupplierController.getAll)
router.post('/insert', SupplierController.insert)
router.put('/update', SupplierController.update)
router.delete('/delete/:id', SupplierController.delete)
router.get('/get-detail', SupplierController.getDetail)

module.exports = router