const express = require('express');
const cors  = require('./api/middlewares/cors-middleware');
const { AuthRouter, ToDoRouter } = require('./api');

module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors);

    //api
    app.use('/auth', AuthRouter)
    app.use('/todos', ToDoRouter)

}