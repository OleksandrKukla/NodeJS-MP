import { controller as authorizationController } from './authorization';
import * as users from './users';
import { controller as groupsController, config as groupsConfig } from './groups';
import { controller as groupUsersController } from './groupUsers';

const initialize = (app, connection) => {

    authorizationController(app, connection, users);
    users.controller(app, connection);
    groupsController(app, connection);
    groupUsersController(app, connection, {
        usersTableName: users.config.tableName,
        usersPK: users.config.primaryKey,
        groupsTableName: groupsConfig.tableName,
        groupsPK: groupsConfig.primaryKey
    });

    /* ...all imported components list init */
};

export {
    initialize
};