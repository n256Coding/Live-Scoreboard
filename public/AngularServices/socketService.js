'use strict';

angular.module('mainModule').factory('socket', ['socketFactory',
    function (socketFactory) {
    return socketFactory();
}]);