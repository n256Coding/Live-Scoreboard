/**
 * Created by Nishan on 10/20/2017.
 */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var eventsRouter = require('./Routers/viewEvents.router');

app.use(bodyParser.json());
app.use('/app', express.static(__dirname+'/public'));
app.use('/app/modules', express.static(__dirname+'/bower_components'));
app.use('/events', eventsRouter);

var listenOutput = app.listen(3000, function (err) {
    if(err){
        console.log('There is error in creating connection');
    }else{
        console.log('Server is listening on port '+3000);
    }
});

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/public/index.html');
});

module.exports = listenOutput;