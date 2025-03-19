const express = require('express')
const { signUpUser, loginUser, getUsers } = require('../controllers/userController')

const router = express.Router()

router.post('/register', signUpUser);
router.post('/login', loginUser);
router.get('/', getUsers)

module.exports = router
