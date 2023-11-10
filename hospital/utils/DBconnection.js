const pgp = require("pg-promise")();
const dbConfig = {
    user: 'hospital',
    database: 'hospital-flow',
    password: 'test123',
    host: 'hospital-database', 
    port: 5432,
    allowExitOnIdle: true
};
const db = pgp(dbConfig);

module.exports = db;