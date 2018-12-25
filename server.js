'use strict';
const https=require("https");

const express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path	=require('path');
//APIs FILE
//var apis = require('./config/apis.js');
// Constants
// Do not change PORT
const PORT = 80;

// App
const app = express();
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//for importing api routes
//app.use("/",apis);
require('./app/routes.js')(app);
require('./config/apis.js')(app);

//APIS

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
