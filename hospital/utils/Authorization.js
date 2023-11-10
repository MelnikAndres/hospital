function isAdmin(role){
    return role === 'admin'
}

function isPatient(role){
    return role === 'patient'
}

function isDoctor(role){
    return role === 'doctor'
}

function isSameUser(uid, loggedUid){
    return uid === loggedUid
}

module.exports = {
    isAdmin,
    isPatient,
    isDoctor,
    isSameUser
}