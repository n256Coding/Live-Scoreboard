/**
 * Created by Nishan on 10/25/2017.
 */
'use strict';

angular.module('mainModule').controller('eventController', ['$scope', '$http', 'socket',
    function ($scope, $http, socket) {
        $scope.selectedEvent = {};
        $scope.isEventSelected = false;
/*
        $http.get('/events/recent').then(function (data) {
            $scope.recentEvents = data.data;
        });

        $http.get('/events/live').then(function (data) {
            $scope.liveEvents = data.data;
        });
*/
        $scope.newEvent = function (eventTypeParam) {
            $scope.isEventSelected = true;
            $scope.selectedEvent.eventType = eventTypeParam;
            $scope.selectedEvent.live = true;
            socket.emit('new_event_req', $scope.selectedEvent);
            alert('Success!');/*
            $http.post('/events', $scope.selectedEvent).then(function (data) {
                alert('Success!');
            });
            */
        };
/*
        socket.on('eventupdate', function (data) {
            console.log(data);
        });
*/
        socket.on('live_event_res', function (data) {
            $scope.liveEvents = data;
        });

        socket.on('recent_event_res', function (data) {
            $scope.recentEvents = data;
        });

        socket.emit('live_event_req', {});
        socket.emit('recent_event_req', {});
}]);