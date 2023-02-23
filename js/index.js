import RepositoryFactory from './factory_repositories.js';
import './employee.js';

const apiFactory = new RepositoryFactory();
const staffRepository = apiFactory.createStaffRepository(true);
const apiRepository = apiFactory.createStaffRepository();
const driverRepository = apiFactory.createDriverRepository(true);



staffRepository.create(new StaffMember('Andreas', 'Nesheim', null, 'a_n@gmail.com', '14:40', 25, '15:05'), (e) => { populateDom(e) })
staffRepository.create(new StaffMember('Emilie', 'Nesheim', null, 'e_n@gmail.com', null, null, null), (e) => { populateDom(e) })

apiRepository.getAll((e) => {
    e = e.results;

    for (const key in e) {
        staffRepository.create(new StaffMember(e[key].name.first, e[key].name.last, e[key].picture.thumbnail, e[key].email, null, null, null), (e) => { populateDom(e) })
    }
})


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