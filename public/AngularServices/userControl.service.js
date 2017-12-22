'use strict';

angular.module('mainModule').factory('userControlService', ['$rootScope', function ($rootScope) {
    var user = {};
    var myLiveEvents = [];
    var myRecentEvents = [];

    function getUser() {
        return user;
    }

    function setUser(userVar) {
        user = userVar;
        $rootScope.$broadcast('event:loggedIn');
    }

    function clearUser() {
        user = {};
        user.firstName = 'Not logged';
        user.password = '';
        $rootScope.$broadcast('event:loggedOut');
        return getUser;
    }

    function getMyLiveEvents() {
        return myLiveEvents;
    }

    function setMyLiveEvents(events) {
        myLiveEvents = events;
    }

    function getMyRecentEvents() {
        return myRecentEvents;
    }

    function setMyRecentEvents(events) {
        myRecentEvents = events;
    }

    return{
        getUser : getUser,
        setUser : setUser,
        clearUser : clearUser,
        getMyLiveEvents : getMyLiveEvents,
        setMyLiveEvents : setMyLiveEvents,
        getMyRecentEvents : getMyRecentEvents,
        setMyRecentEvents : setMyRecentEvents
    }
}]);