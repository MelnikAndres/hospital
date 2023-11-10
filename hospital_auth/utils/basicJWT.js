const crypto = require('crypto')
const BITS = '256'
const ALGORITHM = 'sha'
const BASE = 'base64'

const PAYLOAD_ERRORS = {
    ISS: "Invalid issuer",
    SUB: "Invalid subject",
    EXP: "Invalid expiration time",
    RL: "Invalid role"
}
const SIGNATURE_ERRORS = {
    INVALID: "Invalid signature",
    EXPIRED: "Expired signature"
}

const HEADER = {
    "alg": `${ALGORITHM}${BITS}`,
    "typ": "JWT"
}

const isValidExpiration = (exp) => typeof exp === 'string' && exp.match(/^[0-9]+(s|m|h)$/)

const payload_schema = {
    iss: {isValid: (iss) => typeof iss === 'string', error: PAYLOAD_ERRORS.ISS},
    sub: {isValid: (sub) => typeof sub === 'string', error: PAYLOAD_ERRORS.SUB},
    exp: {isValid: isValidExpiration, error: PAYLOAD_ERRORS.EXP},
    rl: {isValid: (rl) => typeof rl === 'string', error: PAYLOAD_ERRORS.RL}
}
/* Payload structure
    {
        iss: "issuer",
        sub: "subject",
        exp: "expiration time",
        rl: "role",
        iat: "issued at" //generated automatically
        sec: "security salt (invalidator)" //generated automatically
    }
*/
function verifyPayload(payload){
    const errors = []
    for(const key in payload_schema){
        if(!payload_schema[key].isValid(payload[key])) errors.push(payload_schema[key].error)
    }
    return errors.length ? errors : null
}

function toBaseUrl(string) {
    return makeUrlSafe(btoa(string))
}
function makeUrlSafe(string) {
    return string.replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function encodeData(payload){
    payload.iat = Date.now()
    payload.sec = makeUrlSafe(crypto.randomBytes(16).toString(BASE))
    return `${toBaseUrl(JSON.stringify(HEADER))}.${toBaseUrl(JSON.stringify(payload))}`
}

function sign(encodedData, secret){
    const hmac = crypto.createHmac(ALGORITHM + BITS, secret);
    return makeUrlSafe(hmac.update(encodedData).digest(BASE));
}

function verifySign(encodedData, secret, token){
    const computedToken = sign(encodedData, secret);
    if(token.length !== computedToken.length) return false
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(computedToken))
}

function createJWT(payload, secret){
    const encodedData = encodeData(payload)
    return {value:`${encodedData}.${sign(encodedData, secret)}`, expire: payload.exp, salt: payload.sec}
}

function verifyJWT(token, secret){
    const [header, payload, signature] = token.split('.')
    if(!verifySign(`${header}.${payload}`,secret, signature)){
        return SIGNATURE_ERRORS.INVALID
    }
    const {exp} = JSON.parse(atob(payload))
    if(Date.now() > exp){
        return SIGNATURE_ERRORS.EXPIRED
    }
    return null
}

function decodeJWT(token){
    const [_, payload,__] = token.split('.')
    return {payload: JSON.parse(atob(payload))}
}

module.exports = {
    createJWT,
    verifyJWT,
    decodeJWT,
    verifyPayload
}