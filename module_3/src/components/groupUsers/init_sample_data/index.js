import componentConfig from '../config';
import sampleData from './sample.data';

const init = (db, _config) => {
    const config = { ..._config, ...componentConfig };

    const dropTable = db.query(`DROP TABLE IF EXISTS ${ config.tableName } CASCADE;`);

    const createTable = db.query(`CREATE TABLE ${ config.tableName } (
        ${ config.primaryKey } SERIAL PRIMARY KEY,
        groupid INT,
        userid INT,
        FOREIGN KEY (groupid) REFERENCES ${ config.groupsTableName } (${ config.groupsPK }) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (userid) REFERENCES ${ config.usersTableName }  (${ config.usersPK } ) ON DELETE CASCADE ON UPDATE CASCADE
    );`);

    const getGroupValues = sampleData
        .map(row => `('${ row.groupid }', '${ row.userid }')`)
        .join(',');

    const insertData = db.query(`INSERT INTO ${ config.tableName } 
        (groupid, userid) 
        VALUES ${ getGroupValues }
    ;`);

    return Promise.allSettled([
        dropTable,
        createTable,
        insertData,
    ]).then(results => console.log(`${ config.tableName } initialize results: `, results));
};

export default init;