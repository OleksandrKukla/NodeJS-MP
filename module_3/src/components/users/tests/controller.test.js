import request from 'supertest';
import app from '../../../app';
import controller from '../controller';
import serviceMock from './service.mock';
import user from './user.data.mock';

describe('Users controller', () => {
    const validatorMock = jest.fn((req, res, next) => next());
    const authorizationMock = jest.fn((req, res, next) => next());

    beforeAll(() => {
        controller(app, serviceMock, validatorMock, authorizationMock);
    });

    beforeEach(() => {
        authorizationMock.mock.calls.length = 0;
        validatorMock.mock.calls.length = 0;
    });

    afterAll(() => {
        app.close();
    });

    test('Should return user for method: GET /users/:id ', () => {
        return request(app)
            .get('/users/1')
            .expect(200, user)
            .then(() => {
                expect(authorizationMock.mock.calls.length).toBe(1);
                expect(serviceMock.get.mock.calls.length).toBe(1);
            });
    });

    test('Should add user for method: POST /users/ ', () => {
        return request(app)
            .post('/users/')
            .expect(200)
            .then(() => {
                expect(authorizationMock.mock.calls.length).toBe(1);
                expect(validatorMock.mock.calls.length).toBe(1);
                expect(serviceMock.add.mock.calls.length).toBe(1);
            });
    });

    test('Should update user for method: PUT /users/:id ', () => {
        return request(app)
            .put('/users/1')
            .expect(200)
            .then(() => {
                expect(authorizationMock.mock.calls.length).toBe(1);
                expect(validatorMock.mock.calls.length).toBe(1);
                expect(serviceMock.update.mock.calls.length).toBe(1);
            });
    });

    test('Should delete user for method: DELETE /users/:id ', () => {
        return request(app)
            .delete('/users/1')
            .expect(200)
            .then(() => {
                expect(authorizationMock.mock.calls.length).toBe(1);
                expect(serviceMock.delete.mock.calls.length).toBe(1);
            });
    });

    test('Should return user for method: GET /suggested/ ', () => {
        return request(app)
            .get('/suggested/')
            .expect(200, user)
            .then(() => {
                expect(authorizationMock.mock.calls.length).toBe(1);
                expect(serviceMock.getAutoSuggested.mock.calls.length).toBe(1);
            });
    });
});