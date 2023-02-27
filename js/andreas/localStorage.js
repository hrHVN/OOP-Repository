export class LocalStorageAPI {
    constructor(basePath) {
        this.basePath = basePath;
        this.parsed = JSON.parse(localStorage.getItem(this.basePath) || "{}");
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
        let components = path.split('/').filter((e) => e != '');

        // Catch lack of ID
        if (object.id == null) object.id = this._create_UUID()
        // Crate storage if non exists
        if (this.parsed[components[0]] == undefined) this.parsed[components[0]] = [];

        // Update Local storage JSON
        this.parsed[components[0]].push(object);
        
        localStorage.setItem(this.basePath, JSON.stringify(this.parsed));
        this.parsed = JSON.parse(localStorage.getItem(this.basePath));
        callback(object);
    }

    read(path, callback) {
        // Update table
        let components = path.split('/').filter((e) => e != '');
        // Get All, or return empty
        if (components.length == 1) {
            let stored = this.parsed == null ? null : this.parsed[components[0]];
            if (stored == null) {
                return callback([]);
            }
            return callback(stored);
        }

        // Find object with Id
        let stored = this.parsed[components[0]].find((e) => e.id == components[1]);
        if (stored == null) return callback(`Object at ${path} not found.`);

        return callback(stored);
    }

    update(path, object, callback) {
        // IF no ID
        let components = path.split("/").filter((e) => e !== "");
        if (components.length == 1) return callback(`Invalid path ${path}`);

        // Update Object, and catch error
        let index = this.parsed[components[0]].findIndex((e) => e.id === components[1]);
        if (index == null) return callback(`Object with id ${components[1]} not found.`);
        this.parsed[components[0]][index] = object;

        //Sorting the table
        this.parsed[components[0]].sort((a, b) => {
            if (b.duration == null) return -1;
            if (a.duration == null) return 1;
            return a.duration - b.duration;
        });
       
        // Update Local storage JSON
        localStorage.setItem(this.basePath, JSON.stringify(this.parsed))
        return callback(object);
    }

    delete(path, callback) {
        // If no ID, then delete storage
        let components = path.split("/").filter((e) => e !== "");
        if (components.length == 1) {
            let stored = this.parsed[components[0]];
            delete this.parsed[components[0]];
            return callback(stored);
        }

        // IF ID delete ID, and catch error
        let index = this.parsed[components[0]].findIndex((e) => e.id === components[1]);
        if (index == null) return callback(`Object with id ${components[1]} not found.`);

        let stored = this.parsed[components[0]][index];
        this.parsed[components[0]].splice(index, 1);

        // Update Local storage JSON
        localStorage.setItem(this.basePath, JSON.stringify(this.parsed))
        return callback(stored);
    }
}