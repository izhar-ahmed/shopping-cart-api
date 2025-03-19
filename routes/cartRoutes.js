const express = require('express')
const { createCart, getCart, deleteCart } = require('../controllers/cartController')


const router = express.Router()

router.post('/', createCart);
router.get('/:userId', getCart);
router.delete('/:userId', deleteCart);

module.exports = router