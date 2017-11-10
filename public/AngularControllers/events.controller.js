/**
 * Created by Nishan on 10/25/2017.
 */
'use strict';

angular.module('mainModule').controller('eventController', ['$scope', '$http', 'socket',
    function ($scope, $http, socket) {
        $scope.selectedEvent = {};
        $scope.isEventSelected = false;

        $http.get('/events/recent').then(function (data) {
            $scope.recentEvents = data.data;
        });

        $http.get('/events/live').then(function (data) {
            $scope.liveEvents = data.data;
        });

        $scope.newEvent = function (eventTypeParam) {
            $scope.isEventSelected = true;
            $scope.selectedEvent.eventType = eventTypeParam;
            $scope.selectedEvent.live = true;
            socket.emit('newevent', $scope.selectedEvent);
            //$http.post('/events', $scope.selectedEvent).then(function (data) {
            //    alert('Success!');
            //});

        };

        socket.on('gotevent', function (data) {
                alert(data.toString());
                console.log(data);
        });


}]);