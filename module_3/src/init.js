import dotenv from 'dotenv';
import { Client as Pg } from 'pg';
import { initSampleData as usersInit, config as usersConfig } from './components/users';
import { initSampleData as groupsInit, config as groupsConfig } from './components/groups';
import { initSampleData as groupUsersInit } from './components/groupUsers';

dotenv.config();

const pg = new Pg(process.env.DB_CONNECTION_URL);
pg.connect();

const closeConnection = () => pg.end();

Promise.allSettled([
    usersInit(pg),
    groupsInit(pg),
    groupUsersInit(pg, {
        usersTableName: usersConfig.tableName,
        usersPK: usersConfig.primaryKey,
        groupsTableName: groupsConfig.tableName,
        groupsPK: groupsConfig.primaryKey
    }),

    closeConnection,
])
    .then(results => console.log(results))
    .then(process.exit);