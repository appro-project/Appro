const dbConfig = require('../config')['database'];

const options = {
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.password,
    port: dbConfig.port
};

const knex = require('knex')({
    client: 'pg',
    connection: options,
    pool: {min: 2, max: 10}
});

module.exports = knex;
