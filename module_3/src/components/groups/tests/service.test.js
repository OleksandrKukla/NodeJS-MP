import SequelizeMock from 'sequelize-mock';
import Service from '../service';

describe('Groups controller', () => {
    const dbMock = new SequelizeMock();
    const groupMock = {
        name: "admin",
        permissions: '{ READ, WRITE }'
    };

    const modelMock = dbMock.define(
        'groups',
        groupMock, {
            timestamps: false,
            hasPrimaryKeys: false,
        });

    modelMock.findByPk = modelMock.findOne;
    modelMock.findAll = async () => [groupMock];

    const config = {
        tableName: 'groups',
        primaryKey: 'groupid'
    };

    const service = new Service(modelMock, config);

    test('"get" method should return group', done => {
        return service.get(1).then(group => {
            expect(group.get()).toEqual(groupMock);
            done();
        }).catch(done);
    });

    test('"add" method should add group', done => {
        return service.add(groupMock).then(group => {
            expect(group.get()).toBeDefined();
            done();
        }).catch(done);
    });

    test('"update" method should update group', done => {
        return service.update(1, groupMock).then(group => {
            expect(group).toBeDefined();
            done();
        }).catch(done);
    });

    test('"delete" method should delete group', done => {
        return service.delete(1).then(group => {
            expect(group).toBeDefined();
            done();
        }).catch(done);
    });

    test('"getAll" method should return array with group', done => {
        return service.getAll('groupMock').then(data => {
            expect(data).toEqual(expect.arrayContaining([groupMock]));
            done();
        }).catch(done);
    });
});