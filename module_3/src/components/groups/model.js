import Sequelize from 'sequelize';

export default (connection, config) => {
    return connection.define(
        config.tableName,
        {
            [config.primaryKey]: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            permissions: {
                type: Sequelize.ARRAY(Sequelize.TEXT),
                allowNull: true,
                defaultValue: [],
            }
        },
        {
            timestamps: false
        }
    )
};