var crypto = require('crypto')

function passHashingMiddleware(req, res, next) {
    const passProp = req.body.password? 'password' : (req.body.new_pass? 'new_pass' : null)
    if(!passProp) return next()
    const password = req.body[passProp]
    const hash = crypto.createHash('md5').update(password).digest('hex')
    req.body[passProp] = hash
    next()
}

module.exports = passHashingMiddleware