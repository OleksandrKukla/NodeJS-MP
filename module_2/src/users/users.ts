import uuid from 'uuid/v1';

class Users {
    private users: any;

    constructor (sampleData) {
        this.users = new Map();

        if (sampleData && sampleData.length) {
            sampleData.map(user => this.addUser(user));
        }
    }

    getUser (id) {
        return this.users.get(id);
    }

    addUser (data) {
        const id = uuid();
        const user = { ...data, id };
        this.users.set(id, user);

        return user;
    }

    deleteUser (id) {
        const user = this.users.get(id);

        if (user && !user.isDeleted) {
            user.isDeleted = true;

            return user;
        }
    }

    updateUser (id, data) {
        const user = this.users.get(id);

        if (user) {
            const _user = { ...user, ...data, id };
            this.users.set(id, _user);

            return _user;
        }
    }

    getAutoSuggestUsers (loginSubstring, limit) {
        const data = [];

        this.users.forEach(user => {
            if (
                data.length < limit
                && user.login
                && user.login.includes(loginSubstring)
            ) {
                data.push(user);
            }
        });

        return data.sort();
    }
}

export default Users;