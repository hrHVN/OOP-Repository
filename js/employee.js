// Employee
class Employee {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }
}

// Staff Child
class StaffMember extends Employee {
    constructor(name, surname, picture, email, outTime, duration, expectedReturnTime) {
        super(name, surname);
        this.picture = picture;
        this.email = email;
        this.outTime = outTime;
        this.duration = duration;
        this.expectedReturnTime = expectedReturnTime;
    }
    staffMemberIsLate() {
        console.log(`this ${this.name} is Late ${this.duration}`)
    }
}

// Delivery child
class DeliveryDriver extends Employee {
    constructor(name, surname, vehicle, telephone, deliveryAddress, returnTime) {
        super(name, surname);
        this.vehicle = vehicle;
        this.telephone = telephone;
        this.deliveryAddress = deliveryAddress;
        this.returnTime = returnTime;
    }
    deliveryDriverIsLate() {
        console.log(`this ${this.name} is Late ${this.returnTime}`)
    }
}

export {StaffMember, DeliveryDriver}