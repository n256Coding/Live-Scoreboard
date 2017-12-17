/**
 * Created by Nishan on 10/31/2017.
 */
'use strict';

angular.module('mainModule').controller('userController', ['$scope', 'userControlService', '$location',
    function ($scope, userControlService, $location) {
    $scope.user = {};
        $scope.login = function(){
            //TODO Hardcoded string used to login credentials. Need to implement to make it real
            if($scope.user.firstName == 'admin' && $scope.user.password == 'admin'){
                $location.url('/dashboard');
                document.getElementById('logged_name').innerText = $scope.user.firstName;
            }
            else{
                alert("Incorrect Username and/or password!");
            }
        }
}]);