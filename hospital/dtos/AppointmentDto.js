class AppointmentDto{
    constructor(id,doctor_id,patient_id,duration_min,date,status,symptoms){
        this.id = id
        this.doctor_id = doctor_id
        this.patient_id = patient_id
        this.duration_min = duration_min
        this.date = date
        this.status = status
        this.symptoms = symptoms
    }
}

module.exports = AppointmentDto