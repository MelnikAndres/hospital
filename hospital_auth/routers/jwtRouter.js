const express = require('express')
const router = express.Router()
const jwtController = require('../controllers/JWTController')

router.get('/', jwtController.getStatus)

router.post('/sign', jwtController.postSign)
router.post('/verify', jwtController.postVerify)

module.exports = router