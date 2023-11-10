const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctor/doctorController')
const passHashingMiddleware = require('../middleware/passHashingMiddleware')

router.use(passHashingMiddleware)

router.post('/', doctorController.createDoctor.bind(doctorController))
router.put('/:id', doctorController.updateDoctor.bind(doctorController))
router.get('/:id', doctorController.getDoctorByUserId.bind(doctorController))

module.exports = router