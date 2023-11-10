const pgp = require('pg-promise')()
const dbConfig = {
    user: 'hospital',
    database: 'hospital',
    password: 'test123',
    host: process.env.NODE_ENV === 'test'? 'localhost':'hospital-database', 
    port: process.env.NODE_ENV === 'test'? 8081: 5432,
    allowExitOnIdle: true
}
const db = pgp(dbConfig)

module.exports = db