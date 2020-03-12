import Sequelize from 'sequelize';

class Service {

    constructor (connection, config) {
        this.config = config;
        this.model = connection.define(config.tableName, {
            [config.primaryKey]: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            permissions: {
                type: Sequelize.ARRAY(Sequelize.TEXT),
                allowNull: true,
                defaultValue: []
            }
        }, {
            timestamps: false
        });
    }

    get (id) {
        return this.model.findByPk(id);
    }

    add (data) {
        return this.model.create(data);
    }

    delete (id) {
        return this.model.destroy({
            where: {
                [this.config.primaryKey]: id
            },
            force: true
        });
    }

    update (id, data) {
        return this.model.update(data, {
            where: {
                [this.config.primaryKey]: id
            }
        });
    }

    getAll () {
        return this.model.findAll()
    }
}

export default Service;