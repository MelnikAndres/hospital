const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login/loginController')
const passHashingMiddleware = require('../middleware/passHashingMiddleware')

router.use(passHashingMiddleware)
router.post('/login', loginController.postLogin.bind(loginController))
router.post('/logout', loginController.postLogout.bind(loginController))

module.exports = router