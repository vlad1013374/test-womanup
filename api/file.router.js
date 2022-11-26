const router = require('express').Router()
const {FileController} = require('./controllers/')
const authMiddleware = require("./middlewares/auth.middleware")


router.post('/upload', authMiddleware, FileController.file_upload);


module.exports = router