import { StaffMember, DeliveryDriver } from '../employee.js';
import DocumentAPI from './document_API.js';
import StorageFactory from '../factory.js';

$(document).ready(function () {
    //Eventhandler for table Rows
    $('tbody').on('click', 'tr', function () {
        $(this).toggleClass('active');
    });

    //Eventhandler for buttons
    $('button').click(function (e) { 
        e.preventDefault()
        switch ($(this).attr('id')) {
            case "btn-update-staff":
                staffStorage.getById(DocumentAPI.getTableRow('tbody-staff'), (staff) => { console.log(staff) })
                break;
            case "btn-staff-return":
                staffStorage.getById(DocumentAPI.getTableRow('tbody-staff'), (staff) => { console.log(staff) })

                break;
            case "btn-driver-return":
                driverStorage.getById(DocumentAPI.getTableRow('tbody-drivers'), (driver) => { console.log(driver) })
                break;
            default:
                return;
        }
    });

    // initial table population on page load
    staffStorage.getAll((e) => {
        if (e.length === 0) {
            remoteDB.getAll((e) => {
                e.results.forEach(element => {
                    staffStorage.create(new StaffMember(
                        element.name.first,
                        element.name.last,
                        element.picture.thumbnail,
                        element.email,
                        null,
                        null,
                        null),
                        (e) => {
                            let row = DocumentAPI.createTableRow(e);
                            $('#tbody-staff').append(row);
                        });
                });
            });
        } else {
            e.forEach(obj => {
                $('#tbody-staff').append(DocumentAPI.createTableRow(obj));
            });
        }
    });
});

const storageFactory = new StorageFactory();
export const staffStorage = storageFactory.employeeStorage('wd-app');
export const driverStorage = storageFactory.driversStorage('wd-app');
const remoteDB = storageFactory.getRemoteStorage('https://randomuser.me/api/?results=5&noinfo');
