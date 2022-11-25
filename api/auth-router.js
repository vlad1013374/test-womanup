const router = require('express').Router()
const {AuthController} = require('./controllers/')
const {check} = require("express-validator");


router.post('/sign-in', AuthController.sign_in);
router.post('/sign-up',
        [check('email', "Uncorrect email").isEmail(),
            check('password', 'Password must be longer than 3 and shorter than 12').isLength({min: 3, max: 12})],
        AuthController.sign_up);

module.exports = router


