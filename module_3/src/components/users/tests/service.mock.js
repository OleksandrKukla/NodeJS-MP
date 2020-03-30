import user from './user.data.mock';

export default {
    get: jest.fn(() => user),
    add: jest.fn(() => true),
    delete: jest.fn(() => true),
    update: jest.fn(() => true),
    getByLogin: jest.fn(() => user),
    getAutoSuggested: jest.fn(() => user),
};