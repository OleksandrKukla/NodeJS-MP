import Service from './service';
import config from './config';
import HttpStatus from 'http-status-codes';
import createValidator from './validator';
import authorization from '../authorization/middleware';

export default (app, connection) => {
    const service = new Service(connection, config);
    const validator = createValidator();

    app.get('/users/:id', authorization, async (req, res) => {
        const user = await service.get(req.params.id);
        const status = user ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        res.status(status).json(user);
    });

    app.post('/users/', validator, authorization, async (req, res) => {
        const user = await service.add(req.body);
        const status = user ? HttpStatus.OK : HttpStatus.BAD_REQUEST;

        res.status(status).end();
    });

    app.put('/users/:id', validator, authorization, async (req, res) => {
        const user = await service.update(req.params.id, req.body);
        const status = user ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        res.status(status).end();
    });

    app.delete('/users/:id', authorization, async (req, res) => {
        const user = await service.delete(req.params.id);
        const status = user ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        res.status(status).end();
    });

    app.get('/suggested/', authorization, async (req, res) => {
        const loginSubstring = req.query.q;
        const limit = Number(req.query.limit) || 1000;
        const result = await service.getAutoSuggested(loginSubstring, limit);

        res.status(HttpStatus.OK).json(result);
    });
};