const HOSTS = {localtest: 'localhost',test:'hospital-database-test', dev: 'hospital-database'}
const pgp = require('pg-promise')()
const dbConfig = {
    user: 'hospital',
    database: 'hospital',
    password: 'test123',
    host: HOSTS[process.env.NODE_ENV], 
    port: process.env.NODE_ENV === 'localtest'? 8081: 5432,
    allowExitOnIdle: true
}
const db = pgp(dbConfig)

module.exports = db