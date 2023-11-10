const PatientDto = require('../dtos/PatientDto');
const patientRepository = require('../repositories/PatientRepository')
const userService = require('./UserService')

class PatientService {
    async create(name, password, role, email, phone){
        const userId = await userService.create(name, password, role);
        await patientRepository.createPatient(userId, email,phone)
    }

    async update(email,phone,id){
        if(!email && !phone) return;
        await patientRepository.updatePatient(id, email,phone)
    }

    async getPatientById(id) {
        const patient = await patientRepository.getPatientById(id)
        if (!patient) return null
        return new PatientDto(patient.id, patient.name, patient.email, patient.phone, patient.role)
    }

}


module.exports = new PatientService()
