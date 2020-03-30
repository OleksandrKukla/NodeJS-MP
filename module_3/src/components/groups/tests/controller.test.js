import request from 'supertest';
import app from '../../../app';
import controller from '../controller';
import serviceMock from './service.mock';
import group from './group.data.mock';

describe('Groups controller', () => {
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

    test('Should return group for method: GET /groups/:id ', () => {
        return request(app)
            .get('/groups/1')
            .expect(200, group)
            .then(() => {
                expect(authorizationMock.mock.calls.length).toBe(1);
                expect(serviceMock.get.mock.calls.length).toBe(1);
            });
    });

    test('Should return all groups for method: GET /groups/ ', () => {
        return request(app)
            .get('/groups/')
            .expect(200, [group, group])
            .then(() => {
                expect(authorizationMock.mock.calls.length).toBe(1);
                expect(serviceMock.getAll.mock.calls.length).toBe(1);
            });
    });

    test('Should add group for method: POST /groups/ ', () => {
        return request(app)
            .post('/groups/')
            .expect(200)
            .then(() => {
                expect(authorizationMock.mock.calls.length).toBe(1);
                expect(validatorMock.mock.calls.length).toBe(1);
                expect(serviceMock.add.mock.calls.length).toBe(1);
            });
    });

    test('Should update group for method: PUT /groups/:id ', () => {
        return request(app)
            .put('/groups/1')
            .expect(200)
            .then(() => {
                expect(authorizationMock.mock.calls.length).toBe(1);
                expect(validatorMock.mock.calls.length).toBe(1);
                expect(serviceMock.update.mock.calls.length).toBe(1);
            });
    });

    test('Should delete group for method: DELETE /groups/:id ', () => {
        return request(app)
            .delete('/groups/1')
            .expect(200)
            .then(() => {
                expect(authorizationMock.mock.calls.length).toBe(1);
                expect(serviceMock.delete.mock.calls.length).toBe(1);
            });
    });
});