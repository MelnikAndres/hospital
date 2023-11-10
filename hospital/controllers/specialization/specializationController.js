const specializationRepository = require('../../repositories/SpecializationRepository')

class specializationController{

    async getAllSpecializations(req, res){
        try{
            const specializations = await specializationRepository.getAll()
            return res.status(200).json(specializations)
        }catch(err){
            return res.status(500).json({ errors: [err] })
        }
    }
}

module.exports = new specializationController()