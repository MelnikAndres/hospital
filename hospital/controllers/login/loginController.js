const AuthService = require('../../services/AuthService')
const UserService = require('../../services/UserService')
const parseExpiration = require('../../utils/parseExpiration')
const JWT_COOKIE_NAME = "jwt"
const ERROR_LOGIN_INFO = "Wrong name or password"

class LoginController {

    #authService = new AuthService(new UserService())

    async postLogin(req, res) {
        if(req.logged) return res.status(400).json({ errors: [ERROR_LOGIN_INFO] })
        const loginSchema = require('./schemas/loginSchema')
        const errors = loginSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })
        try{
            const data = await this.#authService.newSignedToken(req.body.name, req.body.password)
            if(data.errors) return res.status(400).json({ errors: data.errors })
            return res.cookie(JWT_COOKIE_NAME, data.JWT, { httpOnly: true, maxAge: parseExpiration(data.expire) }).sendStatus(200)
        }catch(err){
            return res.status(400).json({ errors: [err] })
        }
    }

    postLogout(req, res) {
        res.clearCookie(JWT_COOKIE_NAME).sendStatus(200)
    }
}
module.exports = new LoginController()