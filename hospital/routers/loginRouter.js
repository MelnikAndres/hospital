const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login/loginController')
const passHashingMiddleware = require('../middleware/passHashingMiddleware')

router.use(passHashingMiddleware)
router.post('/login', loginController.postLogin)
router.post('/logout', loginController.postLogout)

module.exports = router