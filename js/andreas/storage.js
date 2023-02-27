class Storage {
    constructor(client, path) {
        this.client = client;
        this.path = path;
    }

    create(object, callback) {
        this.client.create(this.path, object, callback);
    }

    getAll(callback) {
        this.client.read(this.path, callback);
    }

    getById(id, callback) {
        this.client.read(`${this.path}/${id}`, callback);
    }

    update(object, callback) {
        this.client.update(
            `${this.path}/${id}`, object, callback);
    }

    delete(id, callback) {
        this.client.delete(`${this.path}/${id}`, callback)
    }
}

class Staff extends Storage {
    constructor(client) {
        super(client, '/staff');
    }
}

class Drivers extends Storage {
    constructor(client) {
        super(client, '/drivers');
    }
}

class RemoteAPI extends Storage {
    constructor(client) {
        super(client, '/remote');
    }
}

export { Staff, Drivers, RemoteAPI }