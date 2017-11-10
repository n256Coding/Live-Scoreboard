/**
 * Created by Nishan on 11/10/2017.
 */
'use strict';

angular.module('mainModule').factory('socket', [function () {
    var socket = io.connect('http://localhost:3000');

    return{
        on : function (eventName, callback) {
            socket.on(eventName, callback);
        },
        emit : function (eventName, data) {
            socket.emit(eventName, data);
        }
    };
}]);