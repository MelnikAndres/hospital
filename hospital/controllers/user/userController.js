const { isSameUser, isAdmin } = require('../../utils/Authorization')
const UserService = require('../../services/UserService')

class UserController {

    #userService = new UserService()

    async getAllUsers(req, res) {
        if (!isAdmin(req.role)) return res.sendStatus(403)
        try{
            const users = await this.#userService.getAllUsers(req.query.name, req.query.role)
            return res.status(200).json(users)
        }catch(err){
            return res.status(500).json({ errors: [err] })
        }
    }

    async createAdminUser(req, res) {
        if (!isAdmin(req.role)) return res.sendStatus(403)
        const createAdminUserSchema = require('./schemas/createAdminUserSchema')
        const errors = createAdminUserSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        try{
            await this.#userService.createAdminUser(req.body.name, req.body.password, req.body.role)
            return res.sendStatus(200)
        }catch(err){
            return res.status(500).json({ errors: [err] })
        }
    }

    async getUser(req, res) {
        const userId = +req.params.id

        if (!isAdmin(req.role) && !isSameUser(req.uid, userId)) return res.sendStatus(403)

        try{
            const user = await this.#userService.getUserById(userId)
            if(!user) return res.sendStatus(404)
            return res.status(200).json(user)
        }catch(err){
            console.log(err)
            return res.status(500).json({ errors: [err] })
        }
    }

    async updateUser(req, res) {
        const userId = +req.params.id
        if (!isAdmin(req.role) && !isSameUser(req.uid, userId)) return res.sendStatus(403)
        const updateUserSchema = require('./schemas/updateUserSchema')
        const errors = updateUserSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        try{
            await this.#userService.updateUser(userId, req.body.name, req.body.new_pass)
            return res.sendStatus(200)
        }catch(err){
            return res.status(500).json({ errors: [err] })
        }

    }

    async deleteUser(req, res) {
        const userId = +req.params.id
        if (!isAdmin(req.role)) return res.sendStatus(403)

        try{
            await this.#userService.deleteUser(userId)
            return res.sendStatus(200)
        }catch(err){
            return res.status(500).json({ errors: [err] })
        }
    }
}

module.exports = new UserController()