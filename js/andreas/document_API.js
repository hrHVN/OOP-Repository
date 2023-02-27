export default class DocumentAPI {
    constructor(parentTagId) {
        this.domReference = parentTagId;
    }

    createTableRow(path, object) {
        let row = document.createElement('tr');

        for (const key in object) {
            let t = document.createElement('td');
            if (key == 'id') {
                t.setAttribute('class', 'hidden');
            }
            if (key == 'picture') {
                let i = document.createElement('img');
                let first = row.firstChild;
                i.setAttribute('src', object[key] || '/media/placeholder.png');

                t.appendChild(i);
                row.insertBefore(i, first);
                continue;
            }
            t.innerText = object[key];
            row.setAttribute('id', object.id)
            row.appendChild(t);
        }
        return row;
    }

    getHTML(path){
        $(`${this.parentTagId} ${path}`).html();
    }

    insertHTML(path, object) {
        $(`${this.parentTagId} ${path}`).html( object );
    }
}

class DocumentObject {
    constructor(api, path) {
        this.api = api;
        this.path = path;
    }

    get(callback){
        this.api.getHTML(this.path, callback);
    }

    insert(callback) {
        this.api.insertHTML(this.path, callback);
    }


}

class DocumentTable extends DocumentObject {
    constructor(api, path) {
        super(api, path);
    }
}

export class StaffTable extends DocumentTable {
    constructor(api, path) {
        super(api, path);
    }
}

export class DriverTable extends DocumentTable {
    constructor(api, path) {
        super(api, path);
    }
}

export class DriverForm extends DocumentObject {
    constructor(api, path) {
        super(api, path);
    }
}