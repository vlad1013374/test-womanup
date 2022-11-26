const express = require('express');
const cors  = require('./api/middlewares/cors-middleware');
const { AuthRouter, ToDoRouter, FileRouter } = require('./api');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/openapi.json')
const fileUpload = require('express-fileupload')

module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/static', express.static('static'));
    app.use(fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    }));
    //api
    app.use('/auth', AuthRouter)
    app.use('/todos', ToDoRouter)
    app.use('/files', FileRouter)

}