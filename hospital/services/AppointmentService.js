const AppointmentDto = require('../dtos/AppointmentDto')
const AppointmentRepository = require('../repositories/AppointmentRepository')
const { ID, DOCTOR_ID, PATIENT_ID, STATUS } = require('../utils/CommonProps')
const FILTERS = [ID, DOCTOR_ID, PATIENT_ID, STATUS]

class AppointmentService {

    #appointmentRepository = new AppointmentRepository()

    async create(specialization, patient_id, symptoms) {
        const data = await this.#appointmentRepository.getLastAppointmentOfDoctorsfromSpecialization(specialization)
        let closestDate = new Date(8640000000000000)
        let closestDoctor = 0
        for (let i = 0; i < data.length; i++) {
            const date = new Date(data[i].last_appointment_date || Date.now())
            const duration = data[i].duration_min || 60
            const nextDate = new Date(date.getTime() + (duration * 60 * 1000))
            if (nextDate < closestDate) {
                closestDate = nextDate
                closestDoctor = data[i].doctor_id
            }
        }
        const appointment = {
            doctor_id: closestDoctor,
            patient_id: patient_id,
            date: closestDate.getTime(),
            duration_min: 60,
            symptoms: symptoms,
            status: 'assigned'
        }

        return await this.#appointmentRepository.createAppointment(appointment)

    }

    async update(id, status) {
        return await this.#appointmentRepository.updateAppointment(id, status)
    }

    async getAppointments(query) {
        for (let i = 0; i < FILTERS.length; i++) {
            if (query[FILTERS[i]]) {
                this.#appointmentRepository.addFilterByName(FILTERS[i], query[FILTERS[i]])
            }
        }
        if (query.from || query.to) {
            this.#appointmentRepository.addFromToFilter(query.from, query.to)
        }
        const appointments = await this.#appointmentRepository.consumeQuery()
        return appointments.map(appointment => new AppointmentDto(appointment.id, appointment.doctor_id, appointment.patient_id, appointment.duration_min, appointment.date, appointment.status, appointment.symptoms))
    }

    async deleteAppointment(id) {
        return await this.#appointmentRepository.deleteAppointment(id)
    }


}

module.exports = AppointmentService