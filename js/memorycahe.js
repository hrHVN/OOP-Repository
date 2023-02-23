export default class MemoryCache {

    constructor() {
      this.cache = {};
    }
  
    _create_UUID() {
      var dt = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    }
  
    create(path, object, callback) {
      //Catch ID
      if (object.id == null) {
        object.id = this._create_UUID();
      }
      let key = path.split("/").filter((e) => e !== "")[0];
      if (this.cache[key] == undefined) {
        this.cache[key] = [];
      }
      this.cache[key].push(object);
      callback(object);
    }
  
    read(path, callback) {
      let components = path.split("/").filter((e) => e != "");
  
      if (components.length == 1) {
        let stored = this.cache[components[0]];
        if (stored == undefined) {
          return callback([]);
        }
        return callback(stored);
      }
      
      let stored = this.cache[components[0]].find((e) => e.id == components[1]);
      if (stored == null) {
        return callback(`Object at path ${path} not found.`)
      }
  
      callback(stored);
    }
  
    update(path, object, callback) {
      let components = path.split("/").filter((e) => e !== "");
      if (components.length == 1) return callback(`Invalid path ${path}`);
  
      let index = this.cache[components[0]].findIndex((e) => e.id == components[1]);
      if (index == null) return callback(`Object with id ${object.id} not found.`);
  
      this.cache[components[0]][index] = object;
      callback(object);
    }
  
    delete(path, callback) {
      let components = path.split("/").filter((e) => e !== "");
      if (components.length == 1) {
        let stored = this.cache[components[0]];
        delete this.cache[components[0]];
        return callback(stored);
      }
  
      let index = this.cache[components[0]].findIndex((e) => e.id == components[1]);
      if (index == null) {
        return callback(`Object with id ${object.id} not found.`)
      }
  
      let stored = this.cache[components[0]][index];
      this.cache[components[0]].splice(index, 1);
      callback(stored);
    }
  }