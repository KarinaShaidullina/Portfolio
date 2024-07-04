import UserModel from '../models/User.js';
import ApiError from '../error/ApiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {login, password, email, phone_number, role = 'USER'} = req.body
        try {
            if (!login || !password || !email || !phone_number) {
                return next(ApiError.badRequest('Заполните все поля'))
            }
            if (role !== 'USER') {
                throw new Error('Возможна только роль USER')
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await UserModel.create({login, email, phone_number, role, password: hashPassword})
            const token = generateJwt(user.id, user.login, user.role)
            return res.json({token})
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await UserModel.getByEmail(email)
            if (!user) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            let compare = bcrypt.compareSync(password, user.password)
            if (!compare) {
                throw new Error('Указан неверный пароль')
            }
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res, next) {
        const token = generateJwt(req.auth.id, req.auth.email, req.auth.role)
        return res.json({token})
    }

    async getAll(req, res, next) {
        try {
            const users = await UserModel.getAll()
            res.json(users)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя')
            }
            const user = await UserModel.getOne(req.params.id)
            res.json(user)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        const {login, password, email, phone_number, role = 'USER'} = req.body
        try {
            if (!login || !password || !email || !phone_number) {
                return next(ApiError.badRequest('Заполните все поля'))
            }
            if ( ! ['USER', 'ADMIN'].includes(role)) {
                throw new Error('Недопустимое значение роли')
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await UserModel.create({login, email, phone_number, role, password: hashPassword})
            return res.json(user)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            let {login, password, email, phone_number, role} = req.body
            if (role && !['USER', 'ADMIN'].includes(role)) {
                throw new Error('Недопустимое значение роли')
            }
            if (password) {
                password = await bcrypt.hash(password, 5)
            }
            const user = await UserModel.update(req.params.id, {login, password, email, phone_number, role})
            res.json(user)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя')
            }
            const user = await UserModel.delete(req.params.id, req.auth.id)
            res.json(user)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

export default new UserController()