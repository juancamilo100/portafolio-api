const mongoose = require('mongoose');

const databaseInit = () => {
    mongoose.connect('mongodb://localhost:27017/', {
        useNewUrlParser: true,
        dbName: "portafolio",
        connectTimeoutMS: 5000
    });
    
    mongoose.connection.on('connected', function () {  
      console.log('Connection successful to MongoDB');
    }); 
}  

module.exports = { databaseInit };

