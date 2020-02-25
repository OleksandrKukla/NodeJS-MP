import { Client as Pg } from 'pg';
import dbConfig from './config/db.config';
import { initSampleData as usersInit, config as usersConfig } from './components/users';
import { initSampleData as groupsInit, config as groupsConfig } from './components/groups';
import { initSampleData as groupUsersInit } from './components/groupUsers';

const pg = new Pg(dbConfig.connectionUrl);
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