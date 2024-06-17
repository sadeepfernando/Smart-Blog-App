const http = require('http');
const app = require('./app');
const {port} = require('./config/keys');

//initializing the server
const server = http.createServer(app);

//listening to the server
app.listen(port, () =>{console.log('You are listening to the port:8000')});