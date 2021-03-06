import config from '../config';
import sampleData from './sample.data';

const init = (db) => {

    const dropTable = db.query(`DROP TABLE IF EXISTS ${ config.tableName } CASCADE;`);

    const createTable = db.query(`CREATE TABLE ${ config.tableName } (
        ${ config.primaryKey } SERIAL PRIMARY KEY,
        login VARCHAR(255) NOT NULL,
        password VARCHAR(255),
        age INT
    );`);

    const getUsersValues = sampleData
        .map(user => `('${ user.login }', '${ user.password }', ${ user.age })`)
        .join(',');

    const insertData = db.query(`INSERT INTO ${ config.tableName } 
        (login, password, age) 
        VALUES ${ getUsersValues }
    ;`);

    return Promise.allSettled([
        dropTable,
        createTable,
        insertData,
    ]).then(results => console.log(`${ config.tableName } initialize results: `, results));
};

export default init;