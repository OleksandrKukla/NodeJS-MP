import Users from './users';
import HttpStatus from 'http-status-codes';
import mockedUsers from './users.mock';
import createValidator from './validator';

export default (app) => {
    const users = new Users(mockedUsers);
    const validator = createValidator();

    app.get('/users/:id', (req, res) => {
        const user = users.getUser(req.params.id);
        const status = user ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        res.status(status).json(user);
    });

    app.post('/users/', validator, (req, res) => {
        const user = users.addUser(req.body);
        const status = user ? HttpStatus.OK : HttpStatus.BAD_REQUEST;

        res.status(status).json(user);
    });

    app.put('/users/:id', validator, (req, res) => {
        const user = users.updateUser(req.params.id, req.body);
        const status = user ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        res.status(status).json(user);
    });

    app.delete('/users/:id', (req, res) => {
        const user = users.deleteUser(req.params.id);
        const status = user ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        res.status(status).json(user);
    });

    app.get('/suggested/', (req, res) => {
        const loginSubstring = req.query.q;
        const limit = Number(req.query.limit) || 1000;
        const result = users.getAutoSuggestUsers(loginSubstring, limit);

        res.status(HttpStatus.OK).json(result);
    });
};