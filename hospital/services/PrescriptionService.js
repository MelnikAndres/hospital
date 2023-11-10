const PrescriptionRepository = require('../repositories/PrescriptionRepository')
const PrescriptionDto = require('../dtos/PrescriptionDto')

class PrescriptionService{

    #prescriptionRepository = new PrescriptionRepository()

    async create(appointment_id,patient_id,info,medicine){
        await this.#prescriptionRepository.createPrescription(appointment_id,patient_id,info,medicine)
    }

    async getPrescriptionsByPatientId(patientId){
        const prescriptions = await this.#prescriptionRepository.getPrescriptionsByPatientId(patientId)
        return prescriptions.map(prescription => new PrescriptionDto(prescription.id, prescription.appointment_id, prescription.patient_id, prescription.info, prescription.medicine))
    }

    async updatePrescription(medicine, info, id){
        if(!medicine && !info) return;
        await this.#prescriptionRepository.updatePrescription(id, info, medicine)
    }

    async deletePrescription(id){
        await this.#prescriptionRepository.deletePrescription(id)
    }
}

module.exports = PrescriptionService