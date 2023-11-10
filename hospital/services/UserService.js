const userRepository = require('../repositories/UserRepository')
const UserDto = require('../dtos/UserDto')
class UserService {

    async create(name, password, role) {
        const result = await userRepository.createUser(name, password, role)
        return result.id
    }

    async getUserByNameAndPassword(name, password) {
        userRepository.addNameFilter(name)
        userRepository.addPasswordFilter(password)
        const users = await userRepository.consumeQuery()
        return new UserDto(users[0].id,users[0].name,users[0].role)
    }

    async updateSalt(id, salt) {
        await userRepository.updateUserSalt(id, salt)
    }

    async getAllUsers(name,role) {
        if (name) userRepository.addNameFilter(name)
        if (role) userRepository.addRoleFilter(role)
        const data = await userRepository.consumeQuery()
        return data.map(user => new UserDto(user.id,user.name,user.role))
    }

    async createAdminUser(name, password, role) {
        await userRepository.createUser(name, password, role)
    }

    async getUserById(id) {
        const user = await this.#getUser(id);
        if(!user) return null
        return new UserDto(user.id,user.name,user.role)
    }

    async #getUser(id){
        userRepository.addIdFilter(id)
        const data = await userRepository.consumeQuery()
        if (data.length === 0) return null
        return data[0]
    }
    async getUserValidator(id) {
        const user = await this.#getUser(id)
        if(!user) return null
        return user.token_validator
    }

    async updateUser(userId, name, new_pass) {
        if (!name && !new_pass) return;
        await userRepository.updateUser(userId, name, new_pass)
    }

    async deleteUser(userId) {
        await userRepository.deleteUser(userId)
    }

    testFunciton(){
        console.log("working?")
    }
}

module.exports = new UserService()