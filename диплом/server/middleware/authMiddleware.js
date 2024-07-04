import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError.js';

const decode = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        return decoded
    } catch(e) {
        throw new Error('Неверная подпись токена')
    }
}

const auth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization?.split(' ')[1] // Bearer token
        if (!token) {
            throw new Error('Требуется авторизация')
        }
        const decoded = decode(token)
        req.auth = decoded
        next()
    } catch (e) {
        req.auth = null // Устанавливаем req.auth в null в случае ошибки
        next(ApiError.forbidden(e.message))
    }
}

export default auth

// const jwt = require('jsonwebtoken')

// module.exports = function (req, res, next) {
//     if (req.method === "OPTIONS") {
//         next()
//     }
//     try {
//         const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
//         if (!token) {
//             return res.status(401).json({message: "Не авторизован"})
//         }
//         const decoded = jwt.verify(token, process.env.SECRET_KEY)
//         req.user = decoded
//         next()
//     } catch (e) {
//         res.status(401).json({message: "Не авторизован"})
//     }
// };