import SequelizeMock from 'sequelize-mock';
import Service from '../service';

describe('Users controller', () => {
    const dbMock = new SequelizeMock();
    const userMock = {
        userid: 1,
        login: "mockUser",
        password: "mockPassword",
        age: 22,
    };

    const modelMock = dbMock.define(
        'user',
        userMock, {
            timestamps: false,
            hasPrimaryKeys: false,
        });

    modelMock.findByPk = modelMock.findOne;
    modelMock.findAll = async () => [userMock];

    const config = {
        tableName: 'users',
        primaryKey: 'userid',
    };

    const service = new Service(modelMock, config);

    test('"get" method should return user', done => {
        return service.get(1).then(user => {
            expect(user.get()).toEqual(userMock);
            done();
        }).catch(done);
    });

    test('"add" method should add user', done => {
        return service.add(userMock).then(user => {
            expect(user.get()).toBeDefined();
            done();
        }).catch(done);
    });

    test('"update" method should update user', done => {
        return service.update(1, userMock).then(user => {
            expect(user).toBeDefined();
            done();
        }).catch(done);
    });

    test('"delete" method should delete user', done => {
        return service.delete(1).then(user => {
            expect(user).toBeDefined();
            done();
        }).catch(done);
    });

    test('"getByLogin" method should return user', done => {
        return service.getByLogin('mockUser').then(user => {
            expect(user.get()).toEqual(userMock);
            done();
        }).catch(done);
    });

    test('"getAutoSuggested" method should return array with user', done => {
        return service.getAutoSuggested('mockUser').then(data => {
            expect(data).toEqual(expect.arrayContaining([userMock]));
            done();
        }).catch(done);
    });
});