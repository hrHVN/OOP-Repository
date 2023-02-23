import RepositoryFactory from './factory_repositories.js';
import { StaffMember, DeliveryDriver } from './employee.js';

const apiFactory = new RepositoryFactory();
const staffRepository = apiFactory.createStaffRepository(true);
const apiRepository = apiFactory.createStaffRepository();
const driverRepository = apiFactory.createDriverRepository(true);
const localStorage = apiFactory.createLocalStorageRepository();

// staffRepository.create(new StaffMember('Andreas', 'Nesheim', null, 'a_n@gmail.com', '14:40', 25, '15:05'), (e) => { populateDom(e) })
// staffRepository.create(new StaffMember('Emilie', 'Nesheim', null, 'e_n@gmail.com', null, null, null), (e) => { populateDom(e) })

localStorage.getAll((e) => {
    if (e.length <= 0) {
        apiRepository.getAll((e) => {
            e.results.forEach(element => {
                staffRepository.create(new StaffMember(
                    element.name.first,
                    element.name.last,
                    element.picture.thumbnail,
                    element.email,
                    null,
                    null,
                    null),
                    (staff) => {
                        localStorage.create(staff, (e) => { populateDom(e) })
                    })
            });
        })
    } else {
        e.forEach(obj => {
            populateDom(obj);
        });
    }
})

let temp = null;
localStorage.getById('7282b07e-f76a-4921-9feb-c1da6e2ea243', (e) => {console.log(e)});


function updateStaff() {

}

function populateDom(Object) {
    let table = document.getElementsByTagName('tbody')[0];
    let row = document.createElement('tr');

    for (const key in Object) {
        let t = document.createElement('td');
        if (key == 'id') {
            t.setAttribute('class', 'hidden');
        }
        if (key == 'picture') {
            let i = document.createElement('img');
            let first = row.firstChild;
            i.setAttribute('src', Object[key] || '/media/placeholder.png');

            t.appendChild(i);
            row.insertBefore(i, first);
            continue;
        }
        t.innerText = Object[key];
        row.appendChild(t);
    }
    table.appendChild(row);
}

//console.log(localStorageAPI.read())