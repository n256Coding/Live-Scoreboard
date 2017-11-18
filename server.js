/**
 * Created by Nishan on 10/20/2017.
 */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var eventsRouter = require('./Routers/viewEvents.router');

app.use(bodyParser.json());
app.use('/app', express.static(__dirname+'/public'));
app.use('/app/modules', express.static(__dirname+'/bower_components'));
app.use('/events', eventsRouter);
app.set('socketio', io);


app.get('/', function (req, res) {
    res.sendFile(__dirname+'/public/index.html');
});

server.listen(3000, function () {
    console.log('Server is listening on port ' + 3000);
});

var sportEvents= [
                {
                    'name':'event1',
                    'team1':'Lion',
                    'team2':'Dogs',
                    'description':'',
                    'date':'2017 August 23',
                    'startTime':'7 PM',
                    'endTime':'10 PM',
                    'score':'25',
                    'live':false
                },
                {
                    'name':'event2',
                    'team1':'Dogs',
                    'team2':'Cats',
                    'description':'',
                    'date':'2018 January 22',
                    'startTime':'8 AM',
                    'endTime':'11 AM',
                    'score':'35',
                    'live':false
                },
                {
                    'name':'event1',
                    'team1':'Cats',
                    'team2':'Monkeys',
                    'description':'',
                    'date':'2017 October 27',
                    'startTime':'6 AM',
                    'endTime':'8 AM',
                    'score':'45',
                    'live':true
                }
                ];

function getLiveSportEvents() {
    return sportEvents.filter(function (event) {
        return event.live == true;
    });
}

function getRecentSportEvents() {
    return sportEvents.filter(function (event) {
        return event.live == false;
    });
}

io.on('connection', function (socket) {
    socket.on('live_event_req', function (data) {
        io.sockets.emit('live_event_res', getLiveSportEvents());
    });
    socket.on('recent_event_req', function (data) {
        io.sockets.emit('recent_event_res', getRecentSportEvents());
    });
    socket.on('new_event_req', function (data) {
        sportEvents.push(data);
        io.sockets.emit('live_event_res', getLiveSportEvents());
        io.sockets.emit('recent_event_res', getRecentSportEvents());
    });
});

module.exports = server;