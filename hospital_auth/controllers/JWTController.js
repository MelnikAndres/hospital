require('dotenv').config()
const basicJWT = require('../utils/basicJWT')

const ERRORS ={
    NO_TOKEN :'No token provided',
    NO_PAYLOAD : 'No payload provided'
}

const MESSAGES ={
    SERVICE_ONLINE:'JWT service is online'
}

class JWTController {
    postSign(req, res){
        const payload = req.body.payload
        if (!payload) return res.status(400).json({ errors: [ERRORS.NO_PAYLOAD] })
        const errors = basicJWT.verifyPayload(payload)
        if (errors) return res.status(400).json({ errors })
        const token = basicJWT.createJWT(payload, process.env.SECRET_KEY)
        res.status(200).json({ JWT: token.value, expire: token.expire, salt: token.salt})
    }
    postVerify(req, res){
        const token = req.headers.authorization
        if (!token) return res.status(400).json({ errors: [ERRORS.NO_TOKEN_ERROR] })
        const error = basicJWT.verifyJWT(token, process.env.SECRET_KEY)
        if (error) return res.status(403).json({ errors: error })
        const payload = basicJWT.decodeJWT(token)
        res.status(200).json(payload)
    }
    getStatus(req, res){
        res.status(200).send(MESSAGES.SERVICE_ONLINE)
    }
}


module.exports = new JWTController()