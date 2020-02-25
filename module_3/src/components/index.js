import { controller as usersController, config as usersConfig } from './users';
import { controller as groupsController, config as groupsConfig } from './groups';
import { controller as groupUsersController } from './groupUsers';

const initialize = (app, connection) => {

    usersController(app, connection);
    groupsController(app, connection);
    groupUsersController(app, connection, {
        usersTableName: usersConfig.tableName,
        usersPK: usersConfig.primaryKey,
        groupsTableName: groupsConfig.tableName,
        groupsPK: groupsConfig.primaryKey
    });

    /* ...all imported components list init */
};

export {
    initialize
};