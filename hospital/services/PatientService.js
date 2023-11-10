const PatientDto = require('../dtos/PatientDto')
const PatientRepository = require('../repositories/PatientRepository')

class PatientService {

    #patientRepository = new PatientRepository()
    #userService

    constructor(userService){
        this.#userService = userService
    }

    async create(name, password, role, email, phone){
        const userId = await this.#userService.create(name, password, role)
        return await this.#patientRepository.createPatient(userId, email,phone)
    }

    async update(email,phone,id){
        if(!email && !phone) return
        return await this.#patientRepository.updatePatient(id, email,phone)
    }

    async getPatientById(id) {
        const patient = await this.#patientRepository.getPatientById(id)
        if (!patient) return null
        return new PatientDto(patient.id, patient.name, patient.email, patient.phone, patient.role)
    }

}


module.exports = PatientService
