class PrescriptionDto{
    constructor(id,appointment_id,patient_id,info,medicine){
        this.id = id
        this.appointment_id = appointment_id
        this.patient_id = patient_id
        this.info = info
        this.medicine = medicine
    }
}

module.exports = PrescriptionDto