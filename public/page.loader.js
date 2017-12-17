/**
 * Created by Nishan on 10/20/2017.
 */
'use strict';

angular.module('mainModule').config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/eventViewer', {
            templateUrl : 'AngularViews/eventsViewer.html',
            controller: 'eventController'
        }).when('/login', {
            templateUrl : 'AngularViews/loginViewer.html',
            controller: 'userController'
        }).when('/scoreUpdater', {
            templateUrl : 'AngularViews/cricketScoreUpdatorView.html',
            controller: 'userController'
        }).when('/newEvent', {
            templateUrl : 'AngularViews/newEventViewer.html',
            controller: 'eventController'
        }).when('/dashboard', {
            templateUrl : 'AngularViews/dashboardView.html',
            controller: 'eventController'
        }).otherwise({
            templateUrl : 'AngularViews/loginViewer.html',
            controller: 'userController'
        });
        $locationProvider.html5Mode(true);
}]);