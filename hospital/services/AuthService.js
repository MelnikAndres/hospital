const HOST = process.env.NODE_ENV === 'localtest' ? 'localhost' : 'hospital-auth'
const ERROR_LOGIN_INFO = 'Wrong name or password'

class AuthService {

    #userService
    constructor(userService){
        this.#userService = userService
    }

    async newSignedToken(name, password) {
        const user = await this.#userService.getUserByNameAndPassword(name, password)
        if (!user) throw new Error(ERROR_LOGIN_INFO)
        const payload = {
            'iss': 'hospital-app',
            'sub': user.id.toString(),
            'exp': '5m',
            'rl': user.role
        }
        const data = await (await fetch(`http://${HOST}:3030/sign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'payload': payload })
        })).json()
        if (!data.errors) {
            await this.#userService.updateSalt(user.id, data.salt)
        }
        return data
    }

    async verifyToken(token) {
        const data = await (await fetch(`http://${HOST}:3030/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })).json()

        return data
    }
}

module.exports = AuthService