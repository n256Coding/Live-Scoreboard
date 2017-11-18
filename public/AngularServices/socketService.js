/**
 * Created by Nishan on 11/10/2017.
 */
'use strict';

angular.module('mainModule').factory('socket', ['socketFactory',
    function (socketFactory) {
    return socketFactory();
}]);