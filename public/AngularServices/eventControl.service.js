/**
 * Created by Nishan on 12/18/2017.
 */
'use strict';

angular.module('mainModule').factory('eventService', ['socket', function () {
    var chatScript = [];
    var selectedEvent = {};

    function getUniqueId() {
        return Date.now();
    }

    function pushMessage(message) {
        chatScript.push(message);
        return chatScript;
    }

    function getChatScript() {
        return chatScript;
    }

    function clearChatScript() {
        chatScript = [];
    }

    function setSelectedEvent(event) {
        selectedEvent = event;
    }

    function getSelectedEvent() {
        return selectedEvent[0];
    }

    function refreshSelectedEvent(data, eventId) {
        var updatedEvent = data.filter(function (item) {
            return item.eventId == eventId;
        });
        return updatedEvent[0];
    }

    return{
        getUniqueId : getUniqueId,
        pushMessage : pushMessage,
        clearChatScript : clearChatScript,
        getChatScript : getChatScript,
        setSelectedEvent : setSelectedEvent,
        getSelectedEvent : getSelectedEvent,
        refreshSelectedEvent : refreshSelectedEvent
    }
}]);