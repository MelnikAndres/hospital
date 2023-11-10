const express = require('express')
const router = express.Router()
const userController = require('../controllers/user/userController')
const passHashingMiddleware = require('../middleware/passHashingMiddleware')

router.use(passHashingMiddleware)

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser)
router.post('/admin', userController.createAdminUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)



module.exports = router