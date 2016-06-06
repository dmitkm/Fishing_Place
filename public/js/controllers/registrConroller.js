angular
    .module('fp')
    .controller('registrCtrl',registrationController);

function registrationController($scope,$location,AuthService,FlashService) {
    $scope.newUser={
        regname:     "",
        regpassword: "",
        email:       ""
    };
    //$rootScope.message='';


    $scope.addUser = function(newUser) {
        AuthService.register(newUser)
            .then(function (data) {
                if (data.status) {
                    $location.url('/login');
                    FlashService.success(data.status);
                }
            })
            .catch(function (data) {
                FlashService.error(data.error);

            });
    };

}
