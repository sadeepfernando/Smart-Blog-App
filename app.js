const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config();
const mongoDbConnection = require('./init/mongodb');
const {authRoutes, categoryRoutes, fileRoute } = require('./routes/index');
const {errorHandler} = require('./middlewares/index');
const notFound = require('./controllers/notFound');

//initialize express instance
const app = express();

//database connection
mongoDbConnection();

//third party module import
app.use(express.json({limit:'500mb'}));
app.use(bodyParser.urlencoded({limit:'500mb',extended:true}));
app.use(morgan("dev"));

//routes section
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('api/v1/file', fileRoute);


//not found route
app.use('*',notFound);


//error handling middleware
app.use(errorHandler);



module.exports = app;

