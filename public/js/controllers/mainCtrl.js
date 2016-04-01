var fp = angular.module('fp',['ngRoute']);

fp.config(function (routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '../../templates/login.html',
        controller:'loginCtrl'
    })
    .when('/registration', {
        templateUrl: '../../templates/registr.html',
        controller:'registrCtrl'
    })
    .when('/home',{
        templateUrl: '../../templates/home.html',
        controller:'homeCtrl'
    })
    .otherwise({ 
        template: '<h1>404 page not found</h1>' 
    });
});

/*fp.controller('mainCtrl', function($scope){
    $scope.logFormFlag=true;

    $scope.regist=function () {
        $scope.logFormFlag=false;
    }
});*/