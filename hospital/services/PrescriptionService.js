const prescriptionRepository = require('../repositories/PrescriptionRepository')
const PrescriptionDto = require('../dtos/PrescriptionDto')

class PrescriptionService{

    async create(appointment_id,patient_id,info,medicine){
        await prescriptionRepository.createPrescription(appointment_id,patient_id,info,medicine)
    }

    async getPrescriptionsByPatientId(patientId){
        const prescriptions = await prescriptionRepository.getPrescriptionsByPatientId(patientId)
        return prescriptions.map(prescription => new PrescriptionDto(prescription.id, prescription.appointment_id, prescription.patient_id, prescription.info, prescription.medicine))
    }

    async updatePrescription(medicine, info, id){
        if(!medicine && !info) return;
        await prescriptionRepository.updatePrescription(id, info, medicine)
    }

    async deletePrescription(id){
        await prescriptionRepository.deletePrescription(id)
    }
}

module.exports = new PrescriptionService()