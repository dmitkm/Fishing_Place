var fp = angular.module('fp',['ngRoute']);

fp.config(["$routeProvider","$locationProvider",function ($routeProvider,$locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'templates/login.html',
        controller:'loginCtrl'
    })
    .when('/registration', {
        templateUrl: 'templates/registr.html',
        controller:'registrCtrl'
    })
    .when('/home',{
        templateUrl: 'templates/home.html',
        controller:'homeCtrl'
    })
    .otherwise({ 
        template: '<h1>404 page not found</h1>' 
    });
/*
    $locationProvider.html5Mode(true);*/

}]);

fp.controller('mainCtrl', function($scope,$window){

});