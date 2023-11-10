const appointmentService = require('../../services/AppointmentService');
const patientService = require('../../services/PatientService');
const {isAdmin,isSameUser} = require('../../utils/Authorization')


class AppointmentController{

    async createAppointment(req, res){
        const patient = await patientService.getPatientById(req.body.patient_id)
        if(!isAdmin(req.role) && !isSameUser(req.uid,patient.user_id)) return res.sendStatus(403)

        const createappointmentSchema = require('./schemas/createappointmentSchema')
        const errors = createappointmentSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })
        try{
            await appointmentService.create(req.body.specialization || 'general', req.body.patient_id, req.body.symptoms)
            res.sendStatus(200)
        }catch(err){
            res.status(500).json({ errors: [err] })
        }
    }

    async updateAppointment(req, res){
        if(!isAdmin(req.role)) return res.status(403)

        if(!req.body.status) return res.sendStatus(200)
        try{
            await appointmentService.update(req.params.id, req.body.status)
            return res.sendStatus(200)
        }catch(err){
            return res.status(500).json({ errors: [err] })
        }
    }

    async getAppointments(req, res){
        const patient = await patientService.getPatientById(req.body.patient_id)
        if(!isAdmin(req.role) && !isSameUser(req.uid,patient.user_id)) return res.sendStatus(403)
        try{
            const appointments = await appointmentService.getAppointments(req.query)
            return res.status(200).json(appointments)
        }catch(err){
            return res.status(500).json({ errors: [err] })
        }
    }

    async deleteAppointment(req, res){
        if(!isAdmin(req.role)) return res.status(403)
        try{
            await appointmentService.deleteAppointment(req.params.id)
            return res.sendStatus(200)
        }catch(err){
            return res.status(500).json({ errors: [err] })
        }
    }

}

module.exports = new AppointmentController()
