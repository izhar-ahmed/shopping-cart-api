const express = require('express')
const { createProduct, getAllProducts, findProductById, updateProductById, deleteProductById } = require('../controllers/productController')


const router = express.Router()

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', findProductById)
router.put('/:id', updateProductById)
router.delete('/:id', deleteProductById)

module.exports = router