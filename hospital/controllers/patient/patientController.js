const patientService = require('../../services/PatientService');
const { isAdmin, isPatient } = require('../../utils/Authorization');

class PatientController{

    async createPatient(req, res){
        if(!isAdmin(req.role)) return res.status(403)

        const createPatientSchema = require('./schemas/createPatientSchema')
        const errors = createPatientSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        try{
            await patientService.create(req.body.name, req.body.password, req.body.role, req.body.email, req.body.phone)
            return res.sendStatus(200)
        }catch(err){
            return res.status(500).json({ errors: [err] })
        }
    }

    async updatePatient(req, res){
        const userId = +req.params.id
        const isAuthorized = isAdmin(req.role) || (isPatient(req.role) && isSameUser(userId,req.uid))
        if(!isAuthorized) return res.status(403)
        const updatePatientSchema = require('./schemas/updatePatientSchema')
        const errors = updatePatientSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })
        try{
            await patientService.update(req.body.email, req.body.phone, userId)
            return res.sendStatus(200)
        }catch(err){
            return res.status(500).json({ errors: [err] })
        }
    }

    async getPatientByUserId(req, res){
        const userId = +req.params.id
        const isAuthorized = isAdmin(req.role) || (isPatient(req.role) && isSameUser(userId,req.uid))
        if(!isAuthorized) return res.status(403)

        try{
            const patient = await patientService.getPatientById(userId)
            if(!patient) return res.sendStatus(404)
            res.status(200).json(patient)
        }catch(err){
            res.status(500).json({ errors: [err] })
        }
    }

}

module.exports = new PatientController()
