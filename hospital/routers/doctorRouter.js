const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctor/doctorController')
const passHashingMiddleware = require('../middleware/passHashingMiddleware')

router.use(passHashingMiddleware)

router.post('/', doctorController.createDoctor)
router.put('/:id', doctorController.updateDoctor)
router.get('/:id', doctorController.getDoctorByUserId)

module.exports = router