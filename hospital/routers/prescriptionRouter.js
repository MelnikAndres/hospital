const express = require('express')
const router = express.Router()
const prescriptionController = require('../controllers/prescription/prescriptionController')

router.post('/', prescriptionController.createPrescription.bind(prescriptionController))
router.get('/:id', prescriptionController.getPrescriptionsByPatientId.bind(prescriptionController))
router.put('/:id', prescriptionController.updatePrescription.bind(prescriptionController))
router.delete('/:id', prescriptionController.deletePrescription.bind(prescriptionController))

module.exports = router