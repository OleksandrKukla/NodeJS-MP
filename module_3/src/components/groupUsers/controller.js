import Service from './service';
import componentConfig from './config';
import HttpStatus from 'http-status-codes';

export default (app, connection, config) => {
    const service = new Service(connection, { ...config, ...componentConfig });

    app.post('/groupUsers/', async (req, res) => {
        const group = await service.add(req.body);
        const status = group ? HttpStatus.OK : HttpStatus.BAD_REQUEST;

        res.status(status).end();
    });
};