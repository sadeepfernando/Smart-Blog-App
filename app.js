const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const mongoDbConnection = require('./init/mongodb');
const {authRoutes} = require('./routes/index');

//initialize express instance
const app = express();

//database connection
mongoDbConnection();

//third party module import
app.use(express.json({limit:'500mb'}));
app.use(bodyParser.urlencoded({limit:'500mb',extended:true}));

//routes section
app.use('/api/v1/auth',authRoutes);

module.exports = app;

