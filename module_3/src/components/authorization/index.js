import createValidatlor from './validator';
import controller from './controller';
import middleware from './middleware';
import config from './config';

const initController = (app, service) => {
    const validator = createValidatlor();

    controller(app, service, validator, config);

    return {
        validator,
    };
};

export {
    createValidatlor,
    initController,
    controller,
    middleware,
    config,
};