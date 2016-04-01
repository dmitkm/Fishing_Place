fp.controller('registrCtrl',  function ($scope) {

    $scope.newUser={
        regname:"",
        regpassword:"",
        confpassword:"",
        email:""
    };

    $scope.PWCompare=false;

    $scope.confirm=function (repeat_password,$event) {
        if(angular.isDefined(repeat_password)){

            if(repeat_password==$scope.newUser.regpassword){
                
                $scope.PWCompare=true;
                console.log($scope.PWCompare);
            }else{
                $scope.PWCompare=false;
                console.log($scope.PWCompare);
            }
        }

      };
    $scope.getPWCompare=function(){
        return $scope.PWCompare;
    };

});