
angular
    .module('fp')
    .controller('loginCtrl',loginController);


function loginController($scope,$location,$rootScope,AuthService,FlashService){
    //$rootScope.cur_user = '';
    //$rootScope.error='';

    $scope.logIn=function(User){


        AuthService.login(User)
            .then(function(data){
                console.log(data);
                AuthService.setToken(data.token);
                //$rootScope.cur_user=data.user;
                $location.url('/home');
            })
            .catch(function(error){
                if(error){
                    FlashService.error(error);
                    $location.url('/login');
                }
            });
    };
}
