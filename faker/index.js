// since we are requiring the top level of faker, load all locales by default
var Faker = require('./lib');
var faker = new Faker({ locales: require('./lib/locales') });
module['exports'] = faker;
const fs = require('fs');

var TAB = '\t'

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

// //2- random date from date range
// function date(start, end) {
//     var date = new Date(+start + Math.random() * (end - start)).toLocaleDateString();
//     return date;
// }
// // 3- random hour mhm 
// function timing(start, end) {
//     const timezones = ['11:30', '14:00', '9:00','10:00'];
//     return timezones[Math.floor(Math.random() * timezones.length)] 
// }
//3- email domain
function emailRanges() {
    const domains = ['@gmail.com', '@hotmail.com', '@yahoo.fr'];
    return domains[Math.floor(Math.random() * domains.length)] //random array position
}
// //3.1- specific employee employee
// function employeeEmail(name) {
//     return `${name}`+emailRanges();
// }
// //1- status enum
// function randomStatus() {
//     const stats = ['REMOTE', 'ONSITE', 'LEAVE'];
//     return stats[Math.floor(Math.random() * stats.length)] //random array position
// }
// // fs.writeFileSync('C:/HP_ProBook/Users/Desktop/faker/node_modules/faker/Simulation/status.txt', status.join('\n'));

//1- company specific email
function companyEmail(label) {
    return `${label}` + emailRanges();
}

function notifType() {
    const types = ['MEETING', 'STATUS'];
    return types[Math.floor(Math.random() * types.length)]
}

const randomItem = (array) => {
    return array[Math.floor(array.length * Math.random())]

}

const g_employee = () => {
    let first = faker.name.firstName();
    let last = faker.name.lastName()
    return {
        uuid: create_UUID(),
        firstName: first,
        lastName: last,
        email: faker.internet.email(first, last),
        phone: faker.phone.phoneNumber('0#########'),
        role: faker.name.jobTitle(),
        birthdate: date(new Date('01/01/1993'), new Date('01/01/2000')),
        password: faker.internet.password(10),
        avatar: faker.image.people()

    }
}

const g_company = () => {
    const company = {

        uuid: create_UUID(),
        label: faker.company.companyName(),
        capacity: faker.datatype.number({ max: 2000 }),
        logo: faker.image.business(),
        address: faker.address.streetAddress(),
        phone: faker.phone.phoneNumber()

    }
    return company

}
function randomDepLabel() {
    const departements = ['RH', 'TEST', 'QA', 'DEV', 'AUTOMATION', 'UX', 'Management'];
    return departements[Math.floor(Math.random() * departements.length)] //random array position
}
const g_departement = () => {
    return {
        uuid: create_UUID(),
        label: randomDepLabel()
    }

}
function randomRoomLabel() {
    const roomsLabel = [faker.fake('Room ') + faker.datatype.number({ max: 20 }), faker.fake('Salle ') + faker.datatype.number({ max: 20 })];
    return roomsLabel[Math.floor(Math.random() * roomsLabel.length)] 
}
function randomCommunity() {
    const comm = ['Community1','Community2','Community3','Community4'];
    return comm[Math.floor(Math.random() * comm.length)] 
}

function randomRoomType() {
    const roomsType = ["Meeting", "Room"];
    return roomsType[Math.floor(Math.random() * roomsType.length)] 
}
const g_room = () => {
    return {
        uuid: create_UUID(),
        label: randomRoomLabel(),
        type: randomRoomType()
    }

}
const g_participant = () => {
    return {
        uuid: create_UUID(),

    }
}

function FromTo(start) {
    const starting = start;
    const futureDate = new Date();
    futureDate.setTime(starting.getTime());
    const hours = 120 * 60 * 1000;
    futureDate.setTime(futureDate.getTime() + hours);

    return futureDate


}

const g_reservation = () => {
    return {
        uuid: create_UUID(),
        from: faker.date.between('2022-01-01T09:00:00.000Z', '2022-12-01T17:00:00.000Z')
    }
}
function randomFloorLabel() {
    const floors = ['Floor1', 'Floor2', 'Floor3', 'Floor4', 'Floor5'];
    return floors[Math.floor(Math.random() * floors.length)]
}
const g_floor = () => {
    return {

        uuid: create_UUID(),
        label: randomFloorLabel(),
    }


}
const g_local = () => {
    return {

        uuid: create_UUID(),
        label: faker.name.jobArea(),
        address: {
            address: faker.address.streetAddress()
        },
        isMain: faker.datatype.boolean(),
        image: faker.image.city(),

    }
}
const statusBase = [
    'ON-SITE', 'REMOTE', 'LEAVE', 'SICK'
]
function date(start, end) {
    var date = new Date(+start + Math.random() * (end - start)).toLocaleDateString();
    return date;

}

const g_status = () => {
    return {
        uuid: create_UUID(),
        status: statusBase[Math.floor(Math.random() * statusBase.length)],
        date: date(new Date(), new Date(2022, 12, 30)),

    }


}

const g_notification = () => {
    return {
        uuid: create_UUID(),
        date: faker.date.between('2022-01-01T09:00:00.000Z', '2022-07-01T17:00:00.000Z'),
        isSeen: faker.datatype.boolean(),
        isAccepted: faker.datatype.boolean(),
        type: '',
        key: ''
    }
}


function randomMeetingType() {
    const meetingType = ["REMOTE", "ON-SITE"];
    return meetingType[Math.floor(Math.random() * meetingType.length)] 
}

const g_meeting = () => {
    return {
        label: faker.fake('Meet'),
        uuid: create_UUID(),
        type: randomMeetingType()
    }

}
const g_community = () => {
    return {
        uuid: create_UUID(),
        label:randomCommunity()
    }

}

const employees = new Array(50).fill().map(e => g_employee())
const companies = new Array(10).fill().map(e => g_company())
const departements = new Array(30).fill().map(e => g_departement())
const premises = new Array(50).fill().map(e => g_local())

const floors = new Array(60).fill().map(e => g_floor())
const rooms = new Array(70).fill().map(e => g_room())

const status = new Array(60).fill().map(e => g_status())
const meetings = new Array(10).fill().map(e => g_meeting())
noramlReservation = new Array(5).fill().map(e => g_reservation())
const notifications = new Array()
const reservations = new Array()
const participants = new Array()
const communities = new Array()

companies.map(company => {
    boss = g_employee()
    company.UUID_Admin = boss?.uuid
    boss.UUID_Company = company?.uuid
    employees.push(boss)
    company.email = companyEmail(company?.label.split(" ").join(""))
    return company
})

departements.map(departement => {
    departement.UUID_Company = randomItem(companies)?.uuid
    return departement

})
employees.map(employee => {
    let dept = randomItem(departements)
    employee.UUID_Departement = dept?.uuid
    employee.UUID_Room = randomItem(rooms)?.uuid
    employee.UUID_Company = dept?.UUID_Company
    return employee
})

const employeesOfDepartement = (uuid) => {
    return employees.filter(employee => employee.UUID_Departement === uuid)
}
departements.map(departement => {
    let employes = new Array()
    employes = employes.concat(employeesOfDepartement(departement.uuid))

    departement.UUID_Boss = randomItem(employes)?.uuid
    return departement
})
const premisesofCompany = (uuid) => {
    return premises.filter(local => local.UUID_Company === uuid)
}
const floorsofLocal = (uuid) => {
    return floors.filter(floor => floor.UUID_Local === uuid)
}
const roomsofFloor = (uuid) => {
    return rooms.filter(room => room.UUID_Floor === uuid)

}

employees.map(employee => {
    let locals = premisesofCompany(employee.UUID_Company)
        let floor = randomItem(floorsofLocal(randomItem(locals)?.uuid))?.uuid
        let roomss = roomsofFloor(floor)
        employee.UUID_Room = randomItem(roomss)?.uuid
    }
)

premises.map(local => {
    local.UUID_Company = randomItem(companies)?.uuid
    return local
})

floors.map(floor => {
    floor.UUID_Local = randomItem(premises)?.uuid
    return floor
})

rooms.map(room => {
    room.UUID_Floor = randomItem(floors)?.uuid
   return room
})

status.map(oneStatus => {
    oneStatus.UUID_Employee = randomItem(employees)?.uuid
    let notification = g_notification()
    notification.type = "STATUS"
    let emitter = randomItem(employees)
    notification.content = faker.fake(emitter?.firstName + ' ' + emitter?.lastName + " a declare votre status " + oneStatus.status + " pour le " + oneStatus.date)
    notification.UUID_Emitter = emitter?.uuid
    notification.UUID_Receiver = oneStatus.UUID_Employee
    notifications.push(notification)
    return oneStatus
})


meetings.map(meeting => {
    meeting.from = faker.date.between('2022-01-01T09:00:00.000Z', '2022-12-01T17:00:00.000Z');
    meeting.to = FromTo(meeting.from);
    starting = meeting.from;
    ending = meeting.to
    if (meeting.type === 'ON-SITE') {
        meeting.UUID_Reservation = create_UUID();
        let reservation = new Array(1)
        reservation.uuid = meeting?.UUID_Reservation;
        reservation.UUID_Room = randomItem(rooms)?.uuid;
        reservation.from = starting,
        reservation.to = ending
        reservations.push(reservation)
    }
    else {
        meeting.UUID_Reservation = null;
    }
    let community = g_community()
    community.UUID_Meeting = meeting?.uuid
    communities.push(community)
    let departement = randomItem(departements)
    let employes = employeesOfDepartement(departement?.uuid)
    employes.forEach(employee => {
        participant = g_participant()
        participant.UUID_Employee = employee?.uuid
        participant.UUID_Community = community?.uuid
        let notification = g_notification()
        let emitter = randomItem(employees)
        notification.type = "MEETING"
        notification.key = meeting?.uuid
        notification.UUID_Emitter = emitter?.uuid
        notification.UUID_Receiver = participant?.UUID_Employee
        notification.content = faker.fake(emitter?.firstName + ' ' + emitter?.lastName + " vous a invite a la reunion " + meeting.label)
        notifications.push(notification)
        participants.push(participant)
    })
})
noramlReservation.map(reservation => {
    reservation.UUID_Room = randomItem(rooms)?.uuid
    to = FromTo(reservation.from)
    reservations.push(reservation)
}
)

let companyData = new Array();
companyData = companyData.concat(companies).map(object => {
    return `${object.uuid}${TAB}${object.UUID_Admin}${TAB}${object.label}${TAB}${object.logo}${TAB}${object.email}${TAB}${object.phone}${TAB}${object.capacity}`
})
fs.writeFileSync('C:/Users/Hp_ProBook/Desktop/companies.txt', companyData.join('\n'));
let departmentData = new Array();
departmentData = departmentData.concat(departements).map(object => {
    return `${object.uuid}${TAB}${object.UUID_Company}${TAB}${object.label}${TAB}${object.UUID_Boss}`
})
fs.writeFileSync('C:/Users/Hp_ProBook/Desktop/departments.txt', departmentData.join('\n'));
let employeeData = new Array();
employeeData = employeeData.concat(employees).map(object => {
    return `${object.uuid}${TAB}${object.UUID_Company}${TAB}${object.UUID_Departement}${TAB}${object.UUID_Room}${TAB}${object.firstName}${TAB}${object.lastName}${TAB}${object.email}${TAB}${object.phone}${TAB}${object.role}${TAB}${object.birthdate}${TAB}${object.password}${TAB}${object.avatar}`
})
fs.writeFileSync('C:/Users/Hp_ProBook/Desktop/employees.txt', employeeData.join('\n'));
let localData = new Array();
localData = localData.concat(premises).map(object => {
    return `${object.uuid}${TAB}${object.label}${TAB}{"address":"${object.address.address}"}${TAB}${object.UUID_Company}${TAB}${object.isMain}${TAB}${object.image}`
})
fs.writeFileSync('C:/Users/Hp_ProBook/Desktop/premises.txt', localData.join('\n'));

let roomtData = new Array();
roomtData = roomtData.concat(rooms).map(object => {
    return `${object.uuid}${TAB}${TAB}${object.UUID_Floor}${TAB}${object.label}${TAB}${object.type}`
})
fs.writeFileSync('C:/Users/Hp_ProBook/Desktop/rooms.txt', roomtData.join('\n'));
let statustData = new Array();
statustData = statustData.concat(status).map(object => {
    return `${object.uuid}${TAB}${object.status}${TAB}${object.UUID_Employee}${TAB}${object.date}`
})
fs.writeFileSync('C:/Users/Hp_ProBook/Desktop/status.txt', statustData.join('\n'));
let notificationData = new Array();
notificationData = notificationData.concat(notifications).map(object => {
    return `${object.uuid}${TAB}${object?.UUID_Emitter}${TAB}${object?.UUID_Receiver}${TAB}${object.isSeen}${TAB}${object.isAccepted}${TAB}${object.date.toISOString()}${TAB}${object?.content}${TAB}${object?.key}${TAB}${object?.type}`

})
fs.writeFileSync('C:/Users/Hp_ProBook/Desktop/notifications.txt', notificationData.join('\n'));
let meetingsData = new Array();
meetingsData = meetingsData.concat(meetings).map(object => {
    return `${object.uuid}${TAB}${object.label}${TAB}${object.type}${TAB}${object.from.toISOString()}${TAB}${object.to.toISOString()}${TAB}${object.UUID_Reservation}${TAB}${object.key}${TAB}${object.type}`

})
fs.writeFileSync('C:/Users/Hp_ProBook/Desktop/meetings.txt', meetingsData.join('\n'));
let communityData = new Array();
communityData = communityData.concat(communities).map(object => {
    return `${object.uuid}${TAB}${object.label}${TAB}${object.UUID_Meeting}`
})
fs.writeFileSync('C:/Users/Hp_ProBook/Desktop/communities.txt', communityData.join('\n'));
let participantData = new Array();
participantData = participantData.concat(participants).map(object => {
    return `${object.uuid}${TAB}${object.UUID_Employee}${TAB}${object.UUID_Community}`

})
fs.writeFileSync('C:/Users/Hp_ProBook/Desktop/participants.txt', participantData.join('\n'));
let reservationData = new Array();
reservationData = reservationData.concat(reservations).map(object => {
    return `${object.uuid}${TAB}${object.UUID_Room}${TAB}${object.from.toISOString()}${TAB}${object?.to?.toISOString()}`
})
fs.writeFileSync('C:/Users/Hp_ProBook/Desktop/reservations.txt', reservationData.join('\n'));

let floorData = new Array();
floorData = floorData.concat(floors).map(object => {
    return `${object.uuid}${TAB}${object.label}${TAB}${object.UUID_Local}`
})
fs.writeFileSync('C:/Users/Hp_ProBook/Desktop/floors.txt', floorData.join('\n'));