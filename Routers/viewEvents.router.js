/**
 * Created by Nishan on 10/25/2017.
 */
'use strict';

var express = require('express');
var Router = express.Router();
var server = require('../server');
var io = null;

var sportEvents= [];
var event1 = {'name':'event1',
    'team1':'Lion',
    'team2':'Dogs',
    'description':'',
    'date':'2017 August 23',
    'startTime':'7 PM',
    'endTime':'10 PM',
    'score':'25',
    'live':false
};

var event2 = {'name':'event2',
    'team1':'Dogs',
    'team2':'Cats',
    'description':'',
    'date':'2018 January 22',
    'startTime':'8 AM',
    'endTime':'11 AM',
    'score':'35',
    'live':false
};

var event3 = {'name':'event1',
    'team1':'Cats',
    'team2':'Monkeys',
    'description':'',
    'date':'2017 October 27',
    'startTime':'6 AM',
    'endTime':'8 AM',
    'score':'45',
    'live':true
};

sportEvents.push(event1);
sportEvents.push(event2);
sportEvents.push(event3);

Router.get('/*', function (req, res) {

    //res.json(sportEvents);
});

Router.get('/live', function (req, res) {
    var tempEvent = [];
    function doFilter(callback) {
        sportEvents.forEach(function (event) {
            if(event.live == true){
                tempEvent.push(event);
            }
        });
        callback();
    }
    doFilter(function () {
        res.json(tempEvent);
    });
});

Router.get('/recent', function (req, res) {
    var tempEvent = [];
    function doFilter(callback) {
        sportEvents.forEach(function (event) {
            if(event.live == false){
                tempEvent.push(event);
            }
        });
        callback();
    }
    doFilter(function () {
        res.json(tempEvent);
    })
});

Router.post('/', function (req, res) {
    sportEvents.push(req.body);
    //res.json(sportEvents);

    console.log('Hello World');
    const io = req.app.get('socketio');
    io.on('connection', function (socket) {
        socket.emit('eventupdate', sportEvents);
    });
});
/*
io.on('connection', function (socket) {
    console.log('Starting to emit');
    socket.emit('gotevent', { hello : 'world' });
    console.log('Emited');
});
*/

exports.foo = function (req, res) {
    console.log('Hello World');
    io = req.app.get('socketio');
    io.on('connection', function (socket) {
        socket.emit('gotevent', { hello : 'world' });
    });
};

module.exports = Router;