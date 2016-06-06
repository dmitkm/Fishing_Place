
angular
    .module('fp',['ngRoute','geolocation']);

angular
    .module('fp')
    .config(config);

angular
    .module('fp')
    .run(run);

angular
    .module('fp')
    .controller('mainCtrl',main);

function config($routeProvider,$locationProvider) {
    $routeProvider
    .when('/login',{
        templateUrl: 'templates/login.html',
        controller:  'loginCtrl',
        asses:false
    })
    .when('/registration', {
        templateUrl: 'templates/registr.html',
        controller:  'registrCtrl'
    })
    .when('/home',{
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
    })
    .when('/reports/:report_id',{
        templateUrl: 'templates/report.html',
        controller: 'reportCtrl'
    })
    .otherwise({
        template: '<h1>404 page not found</h1>'
    });

   $locationProvider.html5Mode(false);

   /*galleriaProvider.setPath('./bower/galleria/src/themes/classic/galleria.classic.js');

    galleriaProvider.setOptions({
                dummy: '/res/img/dummy.gif',
                _toggleInfo: false,
                showInfo:true,
                transition: 'slide',
                imageCrop: true
            });*/
}

function run($rootScope,$location,AuthService){

    $rootScope.$on('$routeChangeStart',function(event,prev,curr){
        //console.log(prev);
        if(!$location.path()==='/login'&&!AuthService.isLoggedIn()){
            $location.url('/login');
        }
    });

}

function main(){

}
