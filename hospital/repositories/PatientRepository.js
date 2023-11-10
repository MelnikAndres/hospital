const db = require('../utils/DBconnection')
const TABLE_NAME = '"Patients"'
class PatientRepository{
    createPatient(user_id,email,phone){
        const emailOrNull = email? `'${email}'`: null
        const phoneOrNull = phone? `'${phone}'`: null
        return db.none(`insert into ${TABLE_NAME} (user_id, email, phone)
        values ('${user_id}',${emailOrNull}, ${phoneOrNull});`)
    }

    updatePatient(id, email,phone){
        let updateQuery = `update ${TABLE_NAME} set `
        if(email) updateQuery += `email = '${email}'`
        if(phone) updateQuery += (email? ', ': '') +`phone = '${phone}'`
        updateQuery += ` where id=${id};`
        return db.none(updateQuery)
    }

    getPatientByUserId(id){
        return db.oneOrNone(`select * from ${TABLE_NAME} where user_id=${id};`)
    }

    getPatientById(id){
        return db.oneOrNone(`select * from ${TABLE_NAME} where id=${id};`)
    }
}

module.exports = PatientRepository