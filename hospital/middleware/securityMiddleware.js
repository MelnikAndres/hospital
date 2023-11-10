const userService = require('../services/UserService')
const ERRORS = {
    UNKNOWN_USER: 'Unknown user',
    COMPROMISED_TOKEN: 'Compromised token, please login again'
}

async function securityMiddleware(req, res, next) {
    if (!req.logged) return next()
    const security_salt = req.sec
    const userId = req.uid
    const userValidator = await userService.getUserValidator(userId)
    if (!userValidator) return res.status(400).json({ errors: [ERRORS.UNKNOWN_USER] })
    if (userValidator !== security_salt) return res.status(403).json({ errors: [ERRORS.COMPROMISED_TOKEN] })
    return next()
};

module.exports = securityMiddleware

