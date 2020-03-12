import { controller as userController } from './users';

const initialize = (app, connection) => {

    userController(app, connection);

    /* ...all importer components list init */
};

export {
    initialize
};