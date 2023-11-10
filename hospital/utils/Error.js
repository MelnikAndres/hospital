function typeErrorMsg(prop, type) {
    return new TypeError(`${prop} must be ${type}`);
}

function requiredErrorMsg(prop) {
    return new Error(`${prop} is required`);
}

function invalidErrorMsg(prop) {
    return new Error(`${prop} value is invalid`);
}

function lengthErrorMsg(prop, length) {
    return new Error(`${prop} must be at least ${length} character/s long`);
}

module.exports = {
    typeErrorMsg,
    requiredErrorMsg,
    invalidErrorMsg,
    lengthErrorMsg
}