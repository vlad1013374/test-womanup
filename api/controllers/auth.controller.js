const {User} = require("../../database/")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const {validationResult} = require("express-validator")

class AuthController {

    /**
     * функция входа в аккаунт, ожидает email, password из body
     * @param req
     * @param res
     * @returns {token}
     */
    async sign_in(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message: "User not found"})
            }
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({message: "Invalid password"})
            }
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
            return res.json({
                token,
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Server error"});
        }
    }

    /**
     * функция регистрации, ожидает email, login из  body
     * @param req
     * @param res
     * @returns {token}
     */
    async sign_up(req, res) {

        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Uncorrect request", errors})
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: `User with email ${email} already exist`})
            }
            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({email, password: hashPassword})
            await user.save()
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
            return res.json({
                token,
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Server error"});
        }


    }

}

module.exports = new AuthController();