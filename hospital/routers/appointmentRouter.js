const express = require('express')
const router = express.Router()

const AppointmentController = require('../controllers/appointment/appointmentController')

router.post('/', AppointmentController.createAppointment)
router.get('/', AppointmentController.getAppointments)
router.put('/:id', AppointmentController.updateAppointment)
router.delete('/:id', AppointmentController.deleteAppointment)

module.exports = router