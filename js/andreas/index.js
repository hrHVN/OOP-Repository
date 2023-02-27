import RepositoryFactory from '../olaf/factory_repositories.js';
import { StaffMember, DeliveryDriver } from './employee.js';
import DocumentAPI from './document_API.js';

const apiFactory = new RepositoryFactory();
const domAPI = new DocumentAPI('tbody-staff');

const apiRepository = apiFactory.createStaffRepository();
const driverRepository = apiFactory.createDriverRepository(true);
const localStorage = apiFactory.createLocalStorageRepository();

localStorage.getAll((e) => {
    if (e.length === 0) {
        apiRepository.getAll((e) => {
            e.results.forEach(element => {
                localStorage.create(new StaffMember(
                    element.name.first,
                    element.name.last,
                    element.picture.thumbnail,
                    element.email,
                    null,
                    null,
                    null),
                    (e) => populateDom(e));
            });
        });
    } else {
        e.forEach(obj => {
            populateDom(obj);
        });
    }
})

// updateStaff("7d86e2b8-9ed1-4cb1-972a-00e7bcc7eead", {
//     duration: null,
//     outTime: null,
//     expectedReturnTime: null
// });

function updateStaff(id, object) {
    localStorage.getById(id, (e) => {
        for (const key in object) {
            e[key] = object[key];
        }
        localStorage.update(e, (update) => {
            $(`#${id}`).remove();
            // append object to the correct list index
            let index = null;
            localStorage.getAll((i) => { index = i.findIndex((e) => e.id = id); });

            let row = domAPI.createTableRow(update);
            let children = $('#tbody').children('tr');
            $(row).insertBefore(`#${children[index].id}`)
        });
    });
}

function populateDom(object) {
    let table = document.getElementsByTagName('tbody')[0];
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
    table.appendChild(row);
}

function createTableRow(object) {
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