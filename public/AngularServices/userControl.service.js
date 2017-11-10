/**
 * Created by Nishan on 10/31/2017.
 */
'use strict';

angular.module('mainModule').factory('userControlService', function () {
    var user = {};

    function getUser() {
        return user;
    }

    function setUser(userVar) {
        user = userVar;
    }

    return{
        get : getUser,
        set : setUser
    }
});