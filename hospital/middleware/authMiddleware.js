const AuthService = require('../services/AuthService')
const UserService = require('../services/UserService')

async function authMiddleware(req, res, next) {

    const authService = new AuthService(new UserService())
    const token = req.cookies.jwt;
    if(!token){
        req.logged = false
        return next();
    }
    const data = await authService.verifyToken(token)
    if(data.errors){
        req.logged = false
        return next();
    }else{
        req.logged = true
        req.role = data.payload.rl
        req.sec = data.payload.sec
        req.uid = data.payload.sub
        return next();
    }
};

module.exports = authMiddleware