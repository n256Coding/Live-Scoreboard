/**
 * Created by Nishan on 10/25/2017.
 */
'use strict';

angular.module('mainModule').controller('eventController', ['$scope', '$http', 'socket', 'eventService', 'userControlService', '$location',
    function ($scope, $http, socket, eventService, userControlService, $location) {
        $scope.selectedEventId = '';
        $scope.selectedEvent = {};
        $scope.exploredEvent = eventService.getSelectedEvent();
        $scope.isEventSelected = false;
        $scope.chatScriptCache = [];
        $scope.message = {};

        console.log(eventService.getSelectedEvent());
        $scope.initializeExploreInfo = function () {
            $scope.selectedEvent = eventService.getSelectedEvent();
        };

        $scope.newEvent = function (eventTypeParam) {
            $scope.isEventSelected = true;
            $scope.selectedEvent.eventType = eventTypeParam;
            $scope.selectedEvent.live = true;
            $scope.selectedEvent.eventId = eventService.getUniqueId();
            $scope.selectedEvent.team1_score = 0;
            $scope.selectedEvent.team2_score = 0;
            socket.emit('new_event_req', $scope.selectedEvent);
            alert('Your event is now live!');
            $scope.selectedEvent = {};
        };

        $scope.sendMessage = function () {
            //socket.emit('chat_message_push_req', {message : message, eventId : $scope.selectedEvent.eventId});
            if($scope.message.content.trim() != ''){
                var chat = {id:eventService.getUniqueId(), content:$scope.message.content, name:userControlService.getUser().firstName};
                eventService.pushMessage(chat);
                $scope.chatScriptCache.push(chat);
                $scope.message.content = '';
            }
        };

        $scope.exploreEvent = function(eventId, isLive) {
            if(isLive){
                $scope.selectedEvent = $scope.liveEvents.filter(function (item) {
                    return item.eventId == eventId;
                });
            }else{
                $scope.selectedEvent = $scope.recentEvents.filter(function (item) {
                    return item.eventId == eventId;
                });
            }
            eventService.setSelectedEvent($scope.selectedEvent);
            $location.url('/exploreEvent');
        };

        socket.on('live_event_res', function (data) {
            $scope.liveEvents = data;
        });

        socket.on('recent_event_res', function (data) {
            $scope.recentEvents = data;
        });

        socket.on('chat_message_res', function (data) {

        });

        socket.emit('live_event_req', {});
        socket.emit('recent_event_req', {});
        socket.emit('chat_message', {});
}]);