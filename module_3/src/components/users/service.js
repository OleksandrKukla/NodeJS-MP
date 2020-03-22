import Sequelize from 'sequelize';

class Service {

    constructor (model, config) {
        this.config = config;
        this.model = model;
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
            }
        });
    }

    update (id, data) {
        return this.model.update(data, {
            where: {
                [this.config.primaryKey]: id
            }
        });
    }

    getByLogin (login) {
        return this.model.findOne({
            where: { login }
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