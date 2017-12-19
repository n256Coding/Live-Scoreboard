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
                    'eventId':'1397123702318',
                    'name':'event1',
                    'team1':'Lion',
                    'team2':'Dogs',
                    'team1_score':26,
                    'team2_score':32,
                    'description':'This will be a good match because both teams well experienced!',
                    'date':'2017 August 23',
                    'live':false,
                    'chat':[]
                },
                {
                    'eventId':'1392323702318',
                    'name':'event2',
                    'team1':'Dogs',
                    'team2':'Cats',
                    'team1_score':21,
                    'team2_score':35,
                    'description':'Today is really fits for the match',
                    'date':'2018 January 22',
                    'startTime':'8 AM',
                    'endTime':'11 AM',
                    'live':false,
                    'chat':[]
                },
                {
                    'eventId':'1397124852318',
                    'name':'event1',
                    'team1':'Cats',
                    'team2':'Monkeys',
                    'team1_score':35,
                    'team2_score':26,
                    'description':'',
                    'date':'2017 October 27',
                    'startTime':'6 AM',
                    'endTime':'8 AM',
                    'score':'45',
                    'live':true,
                    'chat':[]
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
    socket.on('chat_message_push_req', function (data) {
        var event = sportEvents.filter(function (item) {
                        return item.eventId = data.eventId;
                    });

    });
    socket.on('score_update_req', function (data) {
        var index = sportEvents.findIndex(x => x.eventId == data.eventId);

        if(data.teamNumber == 1){
            console.log(sportEvents);
            sportEvents[index].team1_score = parseInt(sportEvents[index].team1_score) + parseInt(data.inc);
        }
        else if(data.teamNumber == 2){
            sportEvents[index].team2_score = parseInt(sportEvents[index].team2_score) + parseInt(data.inc);
        }
        io.sockets.emit('live_event_res', getLiveSportEvents());
    });
    socket.on('event_close_req', function (data) {
        var index = sportEvents.findIndex(x => x.eventId == data.eventId);
        sportEvents[index].live = false;
        io.sockets.emit('live_event_res', getLiveSportEvents());
        io.sockets.emit('recent_event_res', getRecentSportEvents());
    });
});

module.exports = server;