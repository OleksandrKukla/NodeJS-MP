import Sequelize from 'sequelize';

export default (connection, config) => {

    const model = connection.define(
        config.tableName,
        {
            [config.primaryKey]: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: config.usersTableName,
                    key: config.usersPK,
                }
            },
            groupid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: config.groupsTableName,
                    key: config.groupsPK,
                }
            }
        },
        {
            timestamps: false
        }
    );

    model.associate = (models) => {
        models[config.usersTableName].belongsToMany(models[config.groupsTableName], {
            through: config.tableName,
            as: config.groupsTableName,
            foreignKey: config.usersPK,
        });

        models[config.groupsTableName].belongsToMany(models[config.usersTableName], {
            through: config.tableName,
            as: config.usersTableName,
            foreignKey: config.groupsPK,
        });
    };

    return model;
}