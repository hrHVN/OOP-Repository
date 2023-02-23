import { DriverRepository, StaffRepository } from "./entity_repository.js";
import { APIClient } from './api_client.js';
import { MemoryCache } from "./memorycahe.js";
import { LocalStorageAPI } from './localStorage.js';

export default class RepositoryFactory {

  _getOrCreateApiClient(api) {
    if (this.apiClient) {
      return this.apiClient
    }

    this.apiClient = new APIClient(api);
    return this.apiClient;
  }

  _getOrCreateMemoryCache() {
    if (this.memoryCache) {
      return this.memoryCache
    }

    this.memoryCache = new MemoryCache();
    return this.memoryCache;
  }

  _getOrCreateLocalStorageAPI(api) {
    if (this.localStorageAPI) return this.localStorageAPI;
    this.localStorageAPI = new LocalStorageAPI(api);
    return this.localStorageAPI;
  }

  createDriverRepository(useMemoryCache) {
    let storage = useMemoryCache ? this._getOrCreateMemoryCache() : this._getOrCreateApiClient();
    return new DriverRepository(storage);
  }

  createStaffRepository(useMemoryCache) {
    let storage = useMemoryCache ? this._getOrCreateMemoryCache() : this._getOrCreateApiClient('https://randomuser.me/api/?results=5&noinfo');
    return new StaffRepository(storage);
  }

  createLocalStorageRepository() {
    return new StaffRepository(this._getOrCreateLocalStorageAPI('wdt-app-storage'))
  }
}

