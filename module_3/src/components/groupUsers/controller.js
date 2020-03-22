import HttpStatus from 'http-status-codes';

export default (app, service, authorization) => {

    app.post('/groupUsers/', authorization, async (req, res) => {
        const group = await service.add(req.body);
        const status = group ? HttpStatus.OK : HttpStatus.BAD_REQUEST;

        res.status(status).end();
    });
};