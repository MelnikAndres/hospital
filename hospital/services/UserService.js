const UserRepository = require('../repositories/UserRepository')
const UserDto = require('../dtos/UserDto')
class UserService {
    #userRepository = new UserRepository()

    async create(name, password, role) {
        const result = await this.#userRepository.createUser(name, password, role)
        return result.id
    }

    async getUserByNameAndPassword(name, password) {
        this.#userRepository.addNameFilter(name)
        this.#userRepository.addPasswordFilter(password)
        const users = await this.#userRepository.consumeQuery()
        return new UserDto(users[0].id,users[0].name,users[0].role)
    }

    async updateSalt(id, salt) {
        return await this.#userRepository.updateUserSalt(id, salt)
    }

    async getAllUsers(name,role) {
        if (name) this.#userRepository.addNameFilter(name)
        if (role) this.#userRepository.addRoleFilter(role)
        const data = await this.#userRepository.consumeQuery()
        return data.map(user => new UserDto(user.id,user.name,user.role))
    }

    async createAdminUser(name, password, role) {
        return await this.#userRepository.createUser(name, password, role)
    }

    async getUserById(id) {
        const user = await this.#getUser(id)
        if(!user) return null
        return new UserDto(user.id,user.name,user.role)
    }

    async #getUser(id){
        this.#userRepository.addIdFilter(id)
        const data = await this.#userRepository.consumeQuery()
        if (data.length === 0) return null
        return data[0]
    }
    async getUserValidator(id) {
        const user = await this.#getUser(id)
        if(!user) return null
        return user.token_validator
    }

    async updateUser(userId, name, new_pass) {
        if (!name && !new_pass) return
        return await this.#userRepository.updateUser(userId, name, new_pass)
    }

    async deleteUser(userId) {
        return await this.#userRepository.deleteUser(userId)
    }
}

module.exports = UserService