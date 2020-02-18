import Sequelize from 'sequelize';

class Service {

    constructor (connection, config) {
        this.model = connection.define(config.tableName, {
            userid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            login: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: ''
            },
            age: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
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
                userid: id
            }
        });
    }

    update (id, data) {
        return this.model.update(data, {
            where: {
                userid: id
            }
        });
    }

    getAutoSuggested (loginSubstring, limit) {
        return this.model.findAll({
            where: {
                login: {
                    [Sequelize.Op.substring]: loginSubstring
                }
            },
            limit
        })
    }
}

export default Service;