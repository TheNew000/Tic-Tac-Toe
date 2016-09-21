var app = angular.module('tttApp', ['ngRoute', 'ngCookies']);

app.controller('tttController', function($scope, $http, $location, $cookies, StateFactory, CompMovesFactory, GameFactory, CompPlayerFactory) {

    $scope.whichGame = function(type){
        return $location.path(type);
    }

});

// Set up routes using the routes module
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'tttController'
    }).when('/soloPlay',{
        templateUrl: 'views/soloPlay.html',
        controller: 'soloCtrl'
    }).when('/duoPlay',{
        templateUrl: 'views/duoPlay.html',
        controller: 'duoPlayCtrl'
    }).otherwise({
        redirectTo: '/'
    });
});
