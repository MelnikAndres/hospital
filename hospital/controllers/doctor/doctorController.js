const {isAdmin, isDoctor, isSameUser} = require('../../utils/Authorization')
const DoctorService = require('../../services/DoctorService')
const UserService = require('../../services/UserService')
class DoctorController{

    #doctorService = new DoctorService(new UserService())

    async createDoctor(req, res){
        if(!isAdmin(req.role)) return res.sendStatus(403)

        const createDoctorSchema = require('./schemas/createDoctorSchema')
        const errors = createDoctorSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        try{
            await this.#doctorService.create(req.body.specialization, req.body.name, req.body.password, req.body.role)
            return res.sendStatus(200)
        }catch(err){
            console.log(err)
            return res.status(500).json({ errors: [err] })
        }        
    }

    async updateDoctor(req, res){
        const userId = +req.params.id
        const isAuthorized = isAdmin(req.role) || (isDoctor(req.role) && isSameUser(userId,req.uid))
        if(!isAuthorized) return res.sendStatus(403)
        const updateDoctorSchema = require('./schemas/updateDoctorSchema.js')
        const errors = updateDoctorSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        try{
            await this.#doctorService.updateDoctor(userId, req.body.specialization)
            res.sendStatus(200)
        }catch(err){
            res.status(500).json({ errors: [err] })
        }
    }

    async getDoctorByUserId(req, res){
        const userId = +req.params.id
        const isAuthorized = isAdmin(req.role) || (isDoctor(req.role) && isSameUser(userId,req.uid))
        if(!isAuthorized) return res.sendStatus(403)
        try{
            const doctor = await this.#doctorService.getDoctorByUserId(userId)
            if(!doctor) return res.sendStatus(404)
            res.status(200).json(doctor)
        }catch(err){
            console.log(err)
            res.status(500).json({ errors: [err] })
        }
    }


}

module.exports = new DoctorController()