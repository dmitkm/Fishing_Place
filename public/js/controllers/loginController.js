fp.controller('loginCtrl', function ($scope,$http,$location,$rootScope,AuthService,FlashService){
    //$rootScope.cur_user = '';
    //$rootScope.error='';


    $scope.logIn=function(User){


        AuthService.login(User)
            .then(function(data){
                $rootScope.cur_user=data.user;
                $location.url('/home');
            })
            .catch(function(err){
                FlashService.error(err);
                //$rootScope.error=err;
                $location.url('/login');
            });

    };
});
