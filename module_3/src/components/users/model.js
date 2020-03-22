import Sequelize from 'sequelize';

export default (connection, config) => {

    return connection.define(config.tableName, {
        [config.primaryKey]: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: '',
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};