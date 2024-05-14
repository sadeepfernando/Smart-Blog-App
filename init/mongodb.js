const mongoose = require('mongoose');
const {connection_url} = require('../config/keys');

const mongoDbConnection = async() =>{
    try{
        await mongoose.connect(connection_url);
        console.log('database connection successfull');

    }catch(error){
        console.log(error.message);
    }
}

module.exports = mongoDbConnection;