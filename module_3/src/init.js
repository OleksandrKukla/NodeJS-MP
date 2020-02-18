import { Client as Pg } from 'pg';
import dbConfig from './config/db.config';
import { initSampleData as usersInit } from './components/users';

const pg = new Pg(dbConfig.connectionUrl);
pg.connect();

const closeConnection = () => pg.end();

Promise.allSettled([
    usersInit(pg),
    closeConnection,
])
    .then(results => console.log(results))
    .then(process.exit);