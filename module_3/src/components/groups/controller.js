import Service from './service';
import config from './config';
import HttpStatus from 'http-status-codes';
import createValidator from './validator';
import createModel from './model'

export default (app, connection) => {
    const model = createModel(connection, config);
    const service = new Service(model, config);
    const validator = createValidator();

    app.get('/groups/:id', async (req, res) => {
        const group = await service.get(req.params.id);
        const status = group ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        res.status(status).json(group);
    });

    app.get('/groups/', async (req, res) => {
        const groups = await service.getAll();
        const status = groups ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        res.status(status).json(groups);
    });

    app.post('/groups/', validator, async (req, res) => {
        const group = await service.add(req.body);
        const status = group ? HttpStatus.OK : HttpStatus.BAD_REQUEST;

        res.status(status).end();
    });

    app.put('/groups/:id', validator, async (req, res) => {
        const group = await service.update(req.params.id, req.body);
        const status = group ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        res.status(status).end();
    });

    app.delete('/groups/:id', async (req, res) => {
        const group = await service.delete(req.params.id);
        const status = group ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        res.status(status).end();
    });
};