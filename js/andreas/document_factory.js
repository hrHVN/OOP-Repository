import { LocalStorageRepository } from "../olaf/entity_repository.js";
import { DocumentAPI, StaffTable } from "./document_API.js";
import { LocalStorageAPI } from "./localStorage.js";

export default class DocumentFactory {
    _createDocumentApi(parentTagId) {
        return new DocumentAPI(parentTagId);
    }

    _localStorageApi(location) {
        if (this.localStorageAPI) return this.localStorageAPI;
        return this.localStorageAPI = new LocalStorageAPI(location)
    }

    createStorageApi(location, path) {
        return new LocalStorageRepository(this._localStorageApi(location), path)
    }

    createStaffTable(parentTagId) {
        return new StaffTable(this._createDocumentApi(parentTagId), path);
    }
}