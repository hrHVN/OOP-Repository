import { LocalStorageAPI } from "./localStorage.js";
import { RemoteDB } from "./remoteStorage.js";
import { Drivers, RemoteAPI, Staff } from "./storage.js";

export default class StorageFactory {
    _createLocaleStorage(storageFileName) {
        if (this.localStorage) return this.localStorage;

        this.localStorage = new
            LocalStorageAPI(storageFileName);
        return this.localStorage;
    }

    _createRemoteStorage(url) {
        if (this.remoteStorage) return this.remoteStorage;
        this.remoteStorage = new RemoteDB(url)
        return this.remoteStorage;
    }

    employeeStorage(storageFileName) {
        return new Staff(
            this._createLocaleStorage(storageFileName))
    }

    driversStorage(storageFileName) {
        return new Drivers(
            this._createLocaleStorage(storageFileName))

    }

    getRemoteStorage(url) {
        return new RemoteAPI(
            this._createRemoteStorage(url))
    }
}