const jwt = require('jsonwebtoken')
require('dotenv').config()
/**
 * Проверяет jwt из header.auth и записывает в req.user id пользователя из токена
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
       return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Auth error'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({message: 'Auth error'})
    }
}