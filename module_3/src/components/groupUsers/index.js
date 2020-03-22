import initSampleData from './init_sample_data';
import controller from './controller';
import createModel from './model';
import config from './config';
import Service from './service';

const initController = (app, connection, usersConfig, groupsConfig, authorization) => {
    const _config = {
        usersTableName: usersConfig.tableName,
        usersPK: usersConfig.primaryKey,
        groupsTableName: groupsConfig.tableName,
        groupsPK: groupsConfig.primaryKey,
        ...config,
    };

    const model = createModel(connection, _config);
    const service = new Service(model, connection);

    controller(app, service, authorization);

    return {
        model,
        service,
    };
};

export {
    initController,
    initSampleData,
    createModel,
    controller,
    Service,
    config,
};