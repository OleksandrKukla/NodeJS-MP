import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import createValidator from './validator';
import config from './config';

export default (app, connection, users) => {
    const validator = createValidator();

    const service = new users.service(connection, users.config);

    app.post('/login', validator, async (req, res) => {

        // DANGER don't use autosuggested, use search by user name
        const user = (await service.getAutoSuggested(req.body.username, 1))[0];

        const isLogged = (
            user
            && user.login === req.body.username
            && user.password === req.body.password
        );

        const status = isLogged ? HttpStatus.OK : HttpStatus.FORBIDDEN;
        const token = jwt.sign(
            {},
            config.privateKey,
            {
                expiresIn: config.expiresIn
            }
        );

        res.status(status).json({ token });
    });
};