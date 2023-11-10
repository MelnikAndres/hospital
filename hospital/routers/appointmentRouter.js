const express = require('express')
const router = express.Router()

const AppointmentController = require('../controllers/appointment/appointmentController')

router.post('/', AppointmentController.createAppointment.bind(AppointmentController))
router.get('/', AppointmentController.getAppointments.bind(AppointmentController))
router.put('/:id', AppointmentController.updateAppointment.bind(AppointmentController))
router.delete('/:id', AppointmentController.deleteAppointment.bind(AppointmentController))

module.exports = router