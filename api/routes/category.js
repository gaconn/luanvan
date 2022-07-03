const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/categoryController')

router.get('/get-all', CategoryController.getAll)
router.post('/insert', CategoryController.insert)
router.put('/update', CategoryController.update)
router.delete('/delete/:id', CategoryController.delete)
router.get('/get-detail', CategoryController.getDetail)
router.get('/get-tree', CategoryController.getTree)


module.exports = router