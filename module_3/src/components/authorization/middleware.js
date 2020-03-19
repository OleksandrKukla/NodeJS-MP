import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import config from './config';

export default (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(HttpStatus.UNAUTHORIZED).end();
        return;
    }

    jwt.verify(token, config.privateKey, error => {
        if (error) {
            res.status(HttpStatus.FORBIDDEN).end();
        } else {
            next();
        }
    });
};