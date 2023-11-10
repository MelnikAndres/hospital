const PrescriptionService = require('../../services/PrescriptionService')
const PatientService = require('../../services/PatientService')
const UserService = require('../../services/UserService')
const { isAdmin,isDoctor, isPatient, isSameUser } = require('../../utils/Authorization')

class PrescriptionController{

    #prescriptionService = new PrescriptionService()

    createPrescription(req, res){
        if(!isDoctor(req.role)) return res.sendStatus(403)

        const prescriptionSchema = require('./schemas/prescriptionSchema')
        const errors = prescriptionSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        try{
            this.#prescriptionService.create(req.body.appointment_id,req.body.patient_id, req.body.info,req.body.medicine)
            return res.sendStatus(200)
        }catch(err){
            return res.status(500).json({ errors: [err] })
        }
    }

    async getPrescriptionsByPatientId(req, res){
        const patientService = new PatientService(new UserService())
        const patient = await patientService.getPatientById(req.params.id)
        const isAuthorized = !isAdmin(req.role) || (isPatient(req.role) && isSameUser(patient.user_id,req.uid))
        if(!isAuthorized) return res.sendStatus(403)

        try{
            const prescriptions = await this.#prescriptionService.getPrescriptionsByPatientId(req.params.id)
            return res.status(200).json(prescriptions)
        }catch(err){
            return res.status(500).json({ errors: [err] })
        }
    }

    async updatePrescription(req, res){
        if(req.role !== 'doctor') return res.sendStatus(403)

        const updatePrescriptionSchema = require('./schemas/updatePrescriptionSchema')
        const errors = updatePrescriptionSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        try{
            await this.#prescriptionService.updatePrescription(req.body.medicine, req.body.info, req.params.id)
            return res.sendStatus(200)
        }catch(err){
            return res.status(500).json({ errors: [err] })
        }
    }

    async deletePrescription(req, res){
        if(req.role !== 'doctor') return res.sendStatus(403)
        try{
            await this.#prescriptionService.deletePrescription(req.params.id)
            return res.sendStatus(200)
        }catch (err){
            return res.status(500).json({ errors: [err] })
        }
    }

}

module.exports = new PrescriptionController()
