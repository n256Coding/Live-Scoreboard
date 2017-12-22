angular.module('mainModule').controller('userController', ['$scope', 'userControlService', '$location', '$rootScope',
    function ($scope, userControlService, $location, $rootScope) {
        $scope.user = {firstName:'Not Logged'};
        $scope.isLogged = false;

        $rootScope.$on('event:loggedIn', function () {
            $scope.isLogged = true;
            $scope.user = userControlService.getUser();
        });

        $rootScope.$on('event:loggedOut', function () {
            $scope.isLogged = false;
            $scope.user = userControlService.getUser();
        });

        $scope.login = function(){
            //TODO Hardcoded string used to login credentials. Need to implement to make it real
            if($scope.user.firstName == 'admin' && $scope.user.password == 'admin'){
                userControlService.setUser($scope.user);
                $location.url('/dashboard');
            }
            else{
                alert("Incorrect Username and/or password!");
            }
        };

        $scope.logout = function () {
            if($scope.isLogged){
                userControlService.clearUser();
                $location.url('/login');
            }
        };
}]);