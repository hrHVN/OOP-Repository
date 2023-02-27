import { staffStorage, driverStorage } from "./index.js";

export default class DocumentAPI {

    static createTableRow(object) {
        let row = document.createElement('tr');

        for (const key in object) {
            let t = document.createElement('td');
            if (key == 'id') {
                t.setAttribute('class', 'hidden');
            }
            if (key == 'picture' || key == 'vehicle') {
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

    static getTableRow(table) {
        return $(`#${table} .active`).attr('id');
    }

    
    static updateStaff(id, object) {
        staffStorage.getById(id, (e) => {
            for (const key in object) {
                e[key] = object[key];
            }
            staffStorage.update(e, (update) => {
                $(`#${id}`).remove();
                // append object to the correct list index
                let index = null;
                staffStorage.getAll((i) => { index = i.findIndex((e) => e.id = id); });
    
                let row = this.createTableRow(update);
                let children = $('#tbody-staff').children('tr');
                $(row).insertBefore(`#${children[index].id}`)
            });
        });
    }

    static updateDriver(id, object) {
        driverStorage.getById(id, (e) => {
            for (const key in object) {
                e[key] = object[key];
            }
            driverStorage.update(e, (update) => {
                $(`#${id}`).remove();
                // append object to the correct list index
                let index = null;
                staffStorage.getAll((i) => { index = i.findIndex((e) => e.id = id); });
    
                let row = this.createTableRow(update);
                let children = $('#tbody-drivers').children('tr');
                $(row).insertBefore(`#${children[index].id}`)
            });
        });
    }
}