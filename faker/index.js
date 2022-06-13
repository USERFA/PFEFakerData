// since we are requiring the top level of faker, load all locales by default
var Faker = require('./lib');
var faker = new Faker({ locales: require('./lib/locales') });
module['exports'] = faker;
const fs = require('fs');

// const faker = require('faker');

//1 - generatig one user and savong the output as json 
// let firstName = faker.name.firstName();
// // console.log(firstName)
// let lastName = faker.name.lastName();
// // console.log(lastName)
// let jobTitle = faker.name.jobTitle();
// // console.log(jobTitle)
// let prefix = faker.name.prefix();
// // console.log(prefix)
// let suffix = faker.name.suffix();
// // console.log(suffix)
// let phone = faker.phone.phoneNumber();
// console.log(phone)

// const jsonData = JSON.stringify({
//     firstName,
//     lastName,
//     prefix,
//     suffix,
//     jobTitle,
//     phone,
// });
// console.log(jsonData)

//generating n objects and saving them as an array
var TAB = '\t'
// let newArray = new Array(10).fill({}).map((e) => {     //10 elements
//     let obj = {}
//     obj.firstName = faker.name.firstName();
//     obj.lastName = faker.name.lastName();
//     return obj
// }).map(object => {
//     return `${object.firstName}${TAB}${object.lastName}`
// })

// fs.writeFileSync('C:/Users/Desktop/faker/node_modules/faker/Data',  newArray.join('\n'));
////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!///////////////////////////


///////////////////////////////////////////////////////EMPLOYEE////////////////////////////////////////////////////////////////////////////
//generating the employees data:
//1- UUID
function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16).toUpperCase();
    });
    return uuid;
}
// need to initiliazr the UUID arrays of each class then give random values  to the classes ' objects
let employeeUUIDs = new Array(150).fill({}).map((a) => {
    let object = {}
    object.uuid = create_UUID();
    return object;
}).map(e => {
    return `${e.uuid}`
})
let companyUUIDs = new Array(150).fill({}).map((a) => {
    let object = {}
    object.uuid = create_UUID();
    return object;
}).map(c => {
    return `${c.uuid}`
})
let departementUUIDs = new Array(150).fill({}).map((a) => {
    let object = {}
    object.uuid = create_UUID();
    return object;
}).map(d => {
    return `${d.uuid}`
})
let localUUIDs = new Array(150).fill({}).map((a) => {
    let object = {}
    object.uuid = create_UUID();
    return object;
}).map(l => {
    return `${l.uuid}`
})
let floorUUIDs = new Array(150).fill({}).map((a) => {
    let object = {}
    object.uuid = create_UUID();
    return object;
}).map(f => {
    return `${f.uuid}`
})
//2- random  from the previously created uuid list
function randomEmployee(A) {
    return A[Math.floor(Math.random() * A.length)]
}

function randomDepartment(A) {
    return A[Math.floor(Math.random() * A.length)]
}

function randomCompany(A) {
    return A[Math.floor(Math.random() * A.length)]
}

function randomLocal(A) {
    return A[Math.floor(Math.random() * A.length)]
}
//2- random date from date range
function date(start, end) {
    var date = new Date(+start + Math.random() * (end - start)).toLocaleDateString();
    return date;
}

//3- email domain
function emailRanges() {
    const domains = ['@gmail.com', '@hotmail.com', '@yahoo.fr'];
    return domains[Math.floor(Math.random() * domains.length)] //random array position
}
//3.1- specific employee employee
function employeeEmail(name) {
    return `${name}` + emailRanges();
}
//employees random data list => $0:= employee object
let employees = new Array(150).fill({}).map((e) => {
    let obj = {}
    obj.uuid = randomEmployee(employeeUUIDs);
    obj.firstName = faker.name.firstName();
    obj.lastName = faker.name.lastName();
    obj.email = employeeEmail(obj.firstName);
    obj.phone = faker.phone.phoneNumber('0#########');
    obj.role = faker.name.jobTitle();
    obj.uuid_Departement = randomDepartment(departementUUIDs);
    obj.birthdate = date(new Date('01/01/1993'), new Date('01/01/2000'));
    obj.uuid_Company = randomCompany(companyUUIDs);
    obj.password = faker.random.alphaNumeric(10);
    obj.avatar = faker.image.people();
    return obj
}).map(object => {
    return { UUID: object.uuid, firstName: object.firstName, lastName: object.lastName, email: object.email, phone: object.phone, role: object.role, UUID_Departement: object.uuid_Departement, birthdate: object.birthdate, UUID_Company: object.uuid_Company, password: object.password, avatar: object.avatar };
})
//employees that returns the UUIDs only from the previous array
// let UUIDSEMPLOYEES = new Array();
// UUIDSEMPLOYEES = UUIDSEMPLOYEES.concat(employees).map(object => {
//     return `${object.UUID}`;
// })
//sub array of employees, to be considered as admins
let admins = new Array();
admins = employees.slice(0, 6);
//employees that returns the objects as strings to be saved in the file..
let employeeData = new Array();
employeeData = employeeData.concat(employees).map(object => {
    return `${object.UUID}${TAB}${object.firstName}${TAB}${object.lastName}${TAB}${object.email}${TAB}${object.phone}${TAB}${object.role}${TAB}${object.UUID_Departement}${TAB}${object.birthdate}${TAB}${object.UUID_Company}${TAB}${object.password}${TAB}${object.avatar}`
})
fs.writeFileSync('C:/Users/Desktop/faker/node_modules/faker/Simulation/employees.txt', employeeData.join('\n'));

///////////////////////////////////////////////////////STATUS/////////////////////////////////////////////////////////////////////////////

//1- status enum
function randomStatus() {
    const stats = ['REMOTE', 'ONSITE', 'LEAVE'];
    return stats[Math.floor(Math.random() * stats.length)] //random array position
}
//status that returns the objects as strings to be saved in the file..
let status = new Array(150).fill({}).map((e) => {
    let obj = {}
    obj.uuid = create_UUID();
    obj.status = randomStatus();
    obj.date = date(new Date(), new Date(2022,06,30));
    obj.uuid_Employee = randomEmployee(employeeUUIDs);
    return obj
}).map(object => {
    return `${object.uuid}${TAB}${object.status}${TAB}${object.date}${TAB}${object.uuid_Employee}${TAB}`
})
//saving the status random data in the file
fs.writeFileSync('C:/Users/Desktop/faker/node_modules/faker/Simulation/status.txt', status.join('\n'));

///////////////////////////////////////////////////////COMPANY/////////////////////////////////////////////////////////////////////////

//1- company specific email
function companyEmail(label) {
    return `${label}` + emailRanges();
}

//status that returns the objects as strings to be saved in the file..
let companies = new Array(150).fill({}).map((e) => {
    let isMainLocal=randomLocal(localUUIDs);
    let obj = {}
    obj.uuid = randomCompany(companyUUIDs);
    obj.label = faker.company.companySuffix();
    obj.logo = faker.image.business();
    obj.uuid_Admin = randomEmployee(admins).UUID;

    if (isMainLocal.isMain) {
        obj.address = isMainLocal.address.address
    }else{
        obj.address=faker.address.streetAddress();
    }
    ;
    obj.email = companyEmail(obj.label);
    obj.phone = faker.phone.phoneNumber('0#########');
    obj.capacity = faker.datatype.number(9999);
    return obj
}).map(object => {
    return { UUID: object.uuid, label: object.label, logo: object.logo, UUID_Admin: object.uuid_Admin, email: object.email, phone: object.phone, capacity: object.capacity };
})
//companies that returns the UUIDs only from the previous array
// let UUIDCompanies = new Array();
// UUIDCompanies= UUIDCompanies.concat(companies).map(object => {
//     return `${object.UUID}`;
// })
//companies that returns the objects as strings to be saved in the file..
let companyData = new Array();
companyData = companyData.concat(companies).map(object => {
    return `${object.UUID}${TAB}${object.label}${TAB}${object.logo}${TAB}${object.UUID_Admin}${TAB}${object.email}${TAB}${object.phone}${TAB}${object.capacity}`
})
fs.writeFileSync('C:/Users/Desktop/faker/node_modules/faker/Simulation/companies.txt', companyData.join('\n'));

///////////////////////////////////////////////////////LOCAL//////////////////////////////////////////////////////////////////////////////

let premises = new Array(150).fill({}).map((e) => {
    let obj = {}
    obj.uuid = randomLocal(localUUIDs);
    obj.label = faker.name.jobArea();
    obj.address = {
        address: faker.address.streetAddress()
    };
    obj.uuid_Company = randomCompany(companyUUIDs);
    obj.isMain = faker.datatype.boolean();
    obj.image = faker.image.city();
    return obj
}).map(object => {
    return { UUID: object.uuid, label: object.label, address: object.address.address, UUID_Company: object.uuid_Company, isMain: object.isMain, image: object.image }
})
// let UUIDPremises = new Array();
// UUIDPremises= UUIDPremises.concat(premises).map(object => {
//     return `${object.UUID}`;
// })
let localData = new Array();
localData = localData.concat(premises).map(object => {
    return `${object.UUID}${TAB}${object.label}${TAB}${object.address}${TAB}${object.UUID_Company}${TAB}${object.isMain}${TAB}${object.image}`
})
fs.writeFileSync('C:/Users/Desktop/faker/node_modules/faker/Simulation/premises.txt', localData.join('\n'));

///////////////////////////////////////////////////////FLOOR///////////////////////////////////////////////////////////////////////////////
function randomFloorLabel() {
    const floors = ['Floor1', 'Floor2', 'Floor3'];
    return floors[Math.floor(Math.random() * floors.length)]
}
let floors = new Array(150).fill({}).map((e) => {
    let obj = {}
    obj.uuid = create_UUID();
    obj.label = randomFloorLabel();
    obj.uuid_Local = randomLocal(localUUIDs);
    return obj
}).map(object => {
    return { UUID: object.uuid, label: object.label, UUID_Local: object.uuid_Local }
})
// let UUIDFloors = new Array();
// UUIDFloors= UUIDFloors.concat(floors).map(object => {
//     return `${object.UUID}`;
// })
let floorData = new Array();
floorData = floorData.concat(floors).map(object => {
    return `${object.UUID}${TAB}${object.label}${TAB}${object.UUID_Local}`
})
fs.writeFileSync('C:/Users/Desktop/faker/node_modules/faker/Simulation/floors.txt', floorData.join('\n'));

///////////////////////////////////////////////////////DEPARTMENT///////////////////////////////////////////////////////////////////////////
function randomDepLabel() {
    const departements = ['RH', 'TEST', 'QA', 'DEV', 'AUTOMATION', 'UX'];
    return departements[Math.floor(Math.random() * departements.length)] //random array position
}
let departements = new Array(150).fill({}).map((e) => {
    let obj = {}
    obj.uuid = randomDepartment(departementUUIDs);
    obj.label = randomDepLabel();
    obj.uuid_Company = randomCompany(companyUUIDs);
    obj.uuid_Boss = randomEmployee(admins).UUID;
    return obj
}).map(object => {
    return { UUID: object.uuid, label: object.label, UUID_Company: object.uuid_Company, UUID_Boss: object.uuid_Boss }
})
// let UUIDDepartments = new Array();
// UUIDDepartments= UUIDDepartments.concat(departements).map(object => {
//     return `${object.UUID}`;
// })
let departmentData = new Array();
departmentData = departmentData.concat(departements).map(object => {
    return `${object.UUID}${TAB}${object.label}${TAB}${object.UUID_Company}${TAB}${object.UUID_Boss}$`
})
fs.writeFileSync('C:/Users/Desktop/faker/node_modules/faker/Simulation/departments.txt', departmentData.join('\n'));

// console.log(randomEmployee(employeeUUIDs))