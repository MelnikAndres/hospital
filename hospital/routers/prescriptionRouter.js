const express = require('express')
const router = express.Router()
const prescriptionController = require('../controllers/prescription/prescriptionController')

router.post('/', prescriptionController.createPrescription)
router.get('/:id', prescriptionController.getPrescriptionsByPatientId)
router.put('/:id', prescriptionController.updatePrescription)
router.delete('/:id', prescriptionController.deletePrescription)

module.exports = router