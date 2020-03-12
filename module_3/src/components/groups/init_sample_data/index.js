import config from '../config';
import sampleData from './sample.data';

const init = (db) => {

    const dropTable = db.query(`DROP TABLE IF EXISTS ${ config.tableName } CASCADE;`);

    const createTable = db.query(`CREATE TABLE ${ config.tableName } (
        ${ config.primaryKey } SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        permissions TEXT[]
    );`);

    const getGroupValues = sampleData
        .map(group => `('${ group.name }', '${ group.permissions }')`)
        .join(',');

    const insertData = db.query(`INSERT INTO ${ config.tableName } 
        (name, permissions) 
        VALUES ${ getGroupValues }
    ;`);

    return Promise.allSettled([
        dropTable,
        createTable,
        insertData,
    ]).then(results => console.log(`${ config.tableName } initialize results: `, results));
};

export default init;