const mongoose = require('mongoose');
require('dotenv').config();
const DB_URL  = process.env.DB_URL;

module.exports = async() => {

    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB CONNECTED');

    } catch (error) {
        console.log('DBERROR ============')
        console.log(error);
        process.exit(1);
    }

};