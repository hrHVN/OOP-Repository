class EntityRepository {
    constructor(storage, entityPath) {
        this.storage = storage;
        this.entityPath = entityPath;
    }

    create(object, callback) {
        this.storage.create(this.entityPath, object, callback)
    }

    getAll(callback) {
        this.storage.read(this.entityPath, callback);
    }

    getById(id, callback) {
        this.storage.read(`${this.entityPath}/${id}`, callback);
    }

    update(object, callback) {
        this.storage.update(`${this.entityPath}/${object.id}`, object, callback)
    }

    delete(id, callback) {
        this.storage.delete(`${this.entityPath}/${id}`, callback);
    }
}

class DriverRepository extends EntityRepository {
    constructor(apiClient) {
        super(apiClient, "/drivers");
    }
}

class StaffRepository extends EntityRepository {
    constructor(apiClient) {
        super(apiClient, "/staff");
    }
}

class LocalStorageRepository extends EntityRepository {
    constructor (apiClient) {
        super(apiClient, '/local');
    }
}

export { DriverRepository, StaffRepository, LocalStorageRepository }