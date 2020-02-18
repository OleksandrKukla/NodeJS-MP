import config from '../config';
import sampleData from './sample.data';

const init = (db) => {

    const dropTable = db.query(`DROP TABLE ${config.tableName};`);

    const createTable = db.query(`CREATE TABLE ${config.tableName} (
        userid serial primary key,
        login varchar(255) NOT NULL,
        password varchar(255),
        age int
    );`);

    const getUsersValues = sampleData
        .map(user => `('${user.login}', '${user.password}', ${user.age})`)
        .join(',');

    const insertData = db.query(`INSERT INTO ${config.tableName} 
        (login, password, age) 
        VALUES ${getUsersValues}
    ;`);

    return Promise.allSettled([
        dropTable,
        createTable,
        insertData,
    ]).then(results => console.log('users initialize results: ', results));
};

export default init;