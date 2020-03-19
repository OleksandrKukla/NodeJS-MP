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