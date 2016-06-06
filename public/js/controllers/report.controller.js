/**
 * Created by Dmitry on 4/29/2016.
 */

angular
    .module('fp')
    .controller('reportCtrl',reportController);

function reportController($scope,$routeParams,$http,$rootScope,$route,AuthService){

        $scope.report;
        $scope.user=$rootScope.cur_user;
        var images=[];


        (function (){
            $http.get('/reports/'+$routeParams.report_id).success(function(report){
                $scope.report=report;
            }).error(function(){
                console.log("something bad!");
            });
        })();
        /*$scope.report.pictures.forEach(function(item,index,arr) {
          images.push({
            image:item,
            item:item
          });
        });

        $scope.images = {
          images:images,
          index : images[0]
        };*/

        $scope.logout=function() {
            AuthService.logout().then(function () {
                $rootScope.cur_user = null;
                $location.url('#/login');
            });
        };
}
