class Service {

    constructor (model, connection) {
        this.connection = connection;
        this.model = model;
    }

    add (data) {
        return this.connection.transaction(transaction => {
            return this.model.create(data, { transaction });
        });
    }
}

export default Service;