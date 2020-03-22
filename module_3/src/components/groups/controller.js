import HttpStatus from 'http-status-codes';

export default (app, service, validator, authorization) => {

    app.get('/groups/:id', authorization, async (req, res) => {
        const group = await service.get(req.params.id);
        const status = group ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        res.status(status).json(group);
    });

    app.get('/groups/', authorization, async (req, res) => {
        const groups = await service.getAll();
        const status = groups ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        res.status(status).json(groups);
    });

    app.post('/groups/', validator, authorization, async (req, res) => {
        const group = await service.add(req.body);
        const status = group ? HttpStatus.OK : HttpStatus.BAD_REQUEST;

        res.status(status).end();
    });

    app.put('/groups/:id', validator, authorization, async (req, res) => {
        const group = await service.update(req.params.id, req.body);
        const status = group ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        res.status(status).end();
    });

    app.delete('/groups/:id', authorization, async (req, res) => {
        const group = await service.delete(req.params.id);
        const status = group ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        res.status(status).end();
    });
};