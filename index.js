const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');

const start = async() => {

    const app = express();

    await databaseConnection();

    await expressApp(app);

    app.listen(PORT, () => {
        console.log(`SERVER STARTED ON PORT ${PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
}

start();

