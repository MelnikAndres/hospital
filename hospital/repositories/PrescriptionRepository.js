const db = require('../utils/DBconnection')
const TABLE_NAME = '"Prescriptions"'
class PrescriptionRepository{
    createPrescription(appointment_id,patient_id,info,medicine){
        return db.none(`insert into ${TABLE_NAME} (appointment_id, patient_id, info, medicine)
        values ('${appointment_id}', '${patient_id}', '${info}', '${medicine}');`)
    }

    getPrescriptionsByPatientId(patient_id){
        return db.any(`SELECT * FROM ${TABLE_NAME} WHERE patient_id = '${patient_id}'`)
    }

    updatePrescription(id, info, medicine){
        let updateQuery = `update ${TABLE_NAME} set `
        if(info) updateQuery += `info = '${info}'`
        if(medicine) updateQuery += (info? ", ": "") +`medicine = '${medicine}'`
        updateQuery += ` where id=${id};`
        return db.none(updateQuery)
    }

    deletePrescription(id){
        return db.none(`delete from ${TABLE_NAME} where id=${id};`)
    }
}

module.exports = new PrescriptionRepository()