/**
 * Created by Nishan on 10/31/2017.
 */
'use strict';

angular.module('mainModule').factory('userControlService', ['$rootScope', function ($rootScope) {
    var user = {};

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

    return{
        getUser : getUser,
        setUser : setUser,
        clearUser : clearUser
    }
}]);