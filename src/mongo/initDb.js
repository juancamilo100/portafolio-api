const mongoose = require('mongoose');
const databaseManager = require('./databaseManager');

const databaseInit = () => {
    const mongoDatabase = new databaseManager(
        mongoose,
        'mongodb://localhost:27017/',
        'portafolio'
    );
    
    mongoDatabase.connect();
}

module.exports = { databaseInit };