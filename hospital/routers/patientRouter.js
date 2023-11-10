const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patient/patientController')
const passHashingMiddleware = require('../middleware/passHashingMiddleware')

router.use(passHashingMiddleware)
router.post('/', patientController.createPatient.bind(patientController))
router.put('/:id', patientController.updatePatient.bind(patientController))
router.get('/:id', patientController.getPatientByUserId.bind(patientController))

module.exports = router