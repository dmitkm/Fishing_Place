fp.controller('homeCtrl',function ($scope,mapService) {

    $scope.mapOptions={
        center:new google.maps.LatLng(48.464717, 35.046183),
        zoom:15,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        scrollwheel:true,
        draggable:true
        };
    /*$scope.map=new google.maps.Map(document.getElementById("map_canvas"), $scope.mapOptions);

    $scope.macker=[];

    $scope.addnewMarcker=function(){

    }*/
    $scope.map=mapService.newMap(document.getElementById("map_canvas"), $scope.mapOptions);
    var opt={
        lat:48.464717,
        lng:35.046183,
        event:{
            name:"click",
            callback:function () {
                console.log('im click');
            }
        }
    };

    $scope.marker=mapService.addMarker($scope.map,opt);

    $scope.addNewMarker=function(){

        mapService.addNewMarker($scope.map,{
            content:"<div>hi</div>"
        });
    };
    var m=$scope.addNewMarker();
    console.log(m);
});