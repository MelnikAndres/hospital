const DoctorDto = require('../dtos/DoctorDto');
const DoctorRepository = require('../repositories/DoctorRepository')

class DoctorService {

    #userService;
    constructor(userService){
        this.#userService = userService
    }

    #doctorRepository = new DoctorRepository()

    async create(specialization, name, password, role) {
        const userId = await this.#userService.create(name, password, role);
        return await this.#doctorRepository.createDoctor(userId, specialization)
    }

    async updateDoctor(userId, specialization) {
        return await this.#doctorRepository.updateDoctor(userId, specialization)
    }

    async getDoctorByUserId(userId) {
        const doctor = await this.#doctorRepository.getDoctorByUserId(userId)
        if (!doctor) return null
        return new DoctorDto(doctor.id, doctor.name, doctor.specialization, doctor.role)
    }

}

module.exports = DoctorService