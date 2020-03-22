import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

export default (app, service, validator, config) => {

    app.post('/login', validator, async (req, res) => {

        const user = await service.getByLogin(req.body.username);

        const isLogged = (
            user
            && user.login === req.body.username
            && user.password === req.body.password
        );

        if (!isLogged) {
            res.status(HttpStatus.FORBIDDEN).end();
            return;
        }

        const token = jwt.sign(
            {},
            config.privateKey,
            {
                expiresIn: config.expiresIn
            }
        );

        res.status(HttpStatus.OK).json({ token });
    });
};