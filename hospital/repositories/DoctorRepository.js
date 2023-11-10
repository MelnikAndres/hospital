const db = require('../utils/DBconnection')
const TABLE_NAME = '"Doctors"'
class DoctorRepository{
    createDoctor(user_id, specialization){
        return db.none(`insert into ${TABLE_NAME} (user_id, specialization)
        values ('${user_id}', '${specialization}');`)
    }

    updateDoctor(id, specialization){
        let updateQuery = `update ${TABLE_NAME} set specialization = '${specialization}' where user_id=${id};`
        return db.none(updateQuery)
    }

    getDoctorByUserId(id){
        return db.oneOrNone(`select * from ${TABLE_NAME} where user_id='${id}';`)
    }
}

module.exports = new DoctorRepository()