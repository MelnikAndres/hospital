const db = require('../../utils/DBconnection')

const {QueryFile} = require('pg-promise')
const {join: joinPath} = require('path')

// Helper for linking to external query files:
function sql(file) {
    const fullPath = joinPath(__dirname, file) // generating full path;
    return new QueryFile(fullPath, {minify: true})
}

module.exports ={
    reset: () => {
        return db.none(sql('clear_tables.sql')).then(() => {
            return db.none(sql('populate_tables.sql'))
        })  
    }
}