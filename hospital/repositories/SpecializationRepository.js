const db = require('../utils/DBconnection')

class SpecializationRepository{
    getAll(){
        return db.any('SELECT enum_range(NULL::specialization_type)')
    }
}

module.exports = SpecializationRepository