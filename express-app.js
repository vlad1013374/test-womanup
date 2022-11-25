const express = require('express');
const cors  = require('./api/middlewares/cors-middleware');
const { AuthRouter, ToDoRouter } = require('./api');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/openapi.json')

module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    //api
    app.use('/auth', AuthRouter)
    app.use('/todos', ToDoRouter)

}