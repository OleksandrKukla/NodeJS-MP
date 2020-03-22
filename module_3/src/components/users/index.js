import initSampleData from './init_sample_data';
import controller from './controller';
import createValidator from './validator';
import createModel from './model';
import Service from './service';
import config from './config';

const initController = (app, connection, authorization) => {
    const model = createModel(connection, config);
    const service = new Service(model, config);
    const validator = createValidator();

    controller(app, service, validator, authorization);

    return {
        model,
        service,
        validator,
    };
};

export {
    initController,
    initSampleData,
    createModel,
    controller,
    createValidator,
    Service,
    config,
};