import {
    initController as initAuthorizationController,
    middleware as authorizationValidator
} from './authorization';

import {
    initController as initUsersController,
    config as usersConfig
} from './users';

import {
    initController as initGroupsController,
    config as groupsConfig
} from './groups';

import { initController as initGroupUsersController } from './groupUsers';

const initialize = (app, connection) => {

    const { service } = initUsersController(app, connection, authorizationValidator);
    initAuthorizationController(app, service);
    initGroupsController(app, connection, authorizationValidator);
    initGroupUsersController(app, connection, usersConfig, groupsConfig, authorizationValidator);
};

export {
    initialize
};