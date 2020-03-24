import group from './group.data.mock';

export default {
    get: jest.fn(() => group),
    add: jest.fn(() => true),
    delete: jest.fn(() => true),
    update: jest.fn(() => true),
    getAll: jest.fn(() => [group, group]),
};