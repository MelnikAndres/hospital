const express = require('express')
const router = express.Router()
const userController = require('../controllers/user/userController')
const passHashingMiddleware = require('../middleware/passHashingMiddleware')

router.use(passHashingMiddleware)

router.get('/', userController.getAllUsers.bind(userController))
router.get('/:id', userController.getUser.bind(userController))
router.post('/admin', userController.createAdminUser.bind(userController))
router.put('/:id', userController.updateUser.bind(userController))
router.delete('/:id', userController.deleteUser.bind(userController))



module.exports = router