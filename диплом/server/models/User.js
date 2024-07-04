import { User } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class UserModel {
    async getAll() {
        const users = await User.findAll()
        return users
    }

    async getOne(id) {
        const user = await User.findByPk(id)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        return user
    }

    async getByEmail(email) {
        const user = await User.findOne({where: {email}})
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        return user
    }

    async create(data) {
        const {login, email, phone_number, password, role} = data
        const user = await User.create({login, email, phone_number, password, role})
        return user
    }

    async update(id, data) {
        const user = await User.findByPk(id)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        const {
            login = user.login,
            email = user.email,
            phone_number = user.phone_number,
            password = user.password,
            role = user.role
        } = data
        await user.update({login, email, phone_number, password, role})
        return user
    }

    async delete(id) {
        const user = await User.findByPk(id)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        await user.destroy()
        return user
    }
}

export default new UserModel()