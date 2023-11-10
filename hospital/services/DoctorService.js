const DoctorDto = require('../dtos/DoctorDto');
const doctorRepository = require('../repositories/DoctorRepository')
const userService = require('./UserService')

class DoctorService {

    async create(specialization, name, password, role) {
        const userId = await userService.create(name, password, role);
        return await doctorRepository.createDoctor(userId, specialization)
    }

    async updateDoctor(userId, specialization) {
        return await doctorRepository.updateDoctor(userId, specialization)
    }

    async getDoctorByUserId(userId) {
        const doctor = await doctorRepository.getDoctorByUserId(userId)
        if (!doctor) return null
        return new DoctorDto(doctor.id, doctor.name, doctor.specialization, doctor.role)
    }

}

module.exports = new DoctorService()