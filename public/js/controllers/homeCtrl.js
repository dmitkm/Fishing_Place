    angular
        .module('fp')
        .controller('homeCtrl',homeController);



function homeController($scope,$rootScope,$location,mapService,$http,AuthService,geolocation) {

    var input=document.querySelector('input[type=file]'),
        file_choice=document.querySelector('.file_choice'),
        selected=document.querySelector('.selected');

    $scope.title ='';
    $scope.pic_name ='';
    $scope.coords = {lat:0,lng:0};
    $scope.loading ='';
    $scope.dropFiles ={};
    $scope.cur_user =$rootScope.cur_user;
    /*open upload form*/
    $scope.isOpen = false;
    $scope.toggle = function() {
        $scope.isOpen = !$scope.isOpen;
    };
    console.log($scope.cur_user);

    //update center of map by your location coords(Geolocation API)
    geolocation.getLocation().then(function(data){
      mapService.setCenter(data.coords.latitude,data.coords.longitude);
    });

    //basic map options
    var mapOptions ={
        center:new google.maps.LatLng(48.464717, 35.046183),
        zoom:15,
       /* mapTypeId: google.maps.MapTypeId.ROADMAP*/
        mapTypeControl:true
    };
    //initialize map
    $scope.map=mapService.newMap(document.getElementById("map_canvas"), mapOptions);

    //get all posts and initialize all markers
    init();
    function init(){
        $http.get('/reports')
             .success(function(data) {

                angular.forEach(data,function(item){
                    var title=item.title,
                        id=item._id,
                        src=item.pictures[0];
                    var options={
                        lat:item.lat,
                        lng:item.lng,
                        content:"<div class='info_window'>"+
                                    "<h4>"+title+"</h4>"+
                                    "<div><img  class='win_img' src='"+src+"'></img></div>"+
                                    "<a href='#/reports/"+id+"'>Open report</a>"+
                                "</div>"
                    };
                    mapService.addMarker($scope.map,options);
                });
                 $scope.posts=data;
             })
             .error(function(data) {
                 console.log("Error"+ data.message);
             });
    }

    //handle drop files
    input.addEventListener('change',function(e){
        $scope.upfiles(e.target.files);
    });

    $scope.upfiles = function(files){
        var count = files.length,
            msg = count > 1 ? count + " files selected" : files[0].name;

        angular.element(file_choice).css('display', 'none');
        angular.element(selected).text(msg);
        };

    $scope.reset=function(){
        angular.element(file_choice).css('display','');
        angular.element(selected).text('');
    };

    //upload report
    $scope.addFP=function(FP){
        var input=document.querySelector('input[type=file]'),
            form=document.getElementById("fishPlace"),
            //inputs=form.elements,
            fd = new FormData();
        console.log($rootScope.cur_user);
        FP.user=$rootScope.cur_user;
        FP.lat=$scope.coords.lat;
        FP.lng=$scope.coords.lng;

         console.log(FP);

        angular.forEach(FP,function(value,key){
            fd.append(key,value);
        });


        if(input.files){
            angular.forEach(input.files,function(file){
                fd.append('pictures',file);
            });
        }

        if($scope.dropFiles){
            console.log("drop");
            angular.forEach($scope.dropFiles,function(file){
                fd.append('pictures',file);
            });
        }

        $http({
            method: 'post',
            url: '/upload',
            headers: {'Content-Type': undefined /*'multipart/form-data;boundary=myString*/},
            data: fd
        }).success(function (data) {
            $scope.loading="done";
                  //angular.element(file_choice).css('display','');
            angular.element(selected).html("Done!<a ng-click='reset()'>Upload more!<a>");
        });
        form.reset();
    };


    /*get coords*/
    $scope.$on('clicked', function() {

        $scope.$apply(function() {

            $scope.coords = mapService.getCurrentCords();

        });
    });

    /*log out*/
    $scope.logout=function() {
        AuthService.logout().then(function () {
            $rootScope.cur_user = null;
            $location.url('/login');
        });
    };

};
