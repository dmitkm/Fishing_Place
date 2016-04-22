fp.controller('homeCtrl',function ($scope,$rootScope,$location,mapService,$http,AuthService,$document) {
    
    var input=document.querySelector('input[type=file]'),
        file_choice=document.querySelector('.file_choice'),
        selected=document.querySelector('.selected');

    $scope.title='';
    $scope.pic_name='';
    $scope.coords={lat:0,lng:0};
    $scope.loading='';
    $scope.dropFiles={};

    var mapOptions={
        center:new google.maps.LatLng(48.464717, 35.046183),
        zoom:15,
       /* mapTypeId: google.maps.MapTypeId.ROADMAP*/
        mapTypeControl:true
    };
    $scope.map=mapService.newMap(document.getElementById("map_canvas"), mapOptions);


    function init(){
        $http.get('/fppost')
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
                                    "<div><img  class='win_img' src='img/uploads/"+src+"'></img></div>"+
                                    "<a href='#/"+id+"'>Open report</a>"+
                                "</div>"
                    };
                    mapService.addMarker($scope.map,options);
                });

                 $scope.posts=data;
                 console.log($scope.posts);
             })
             .error(function() {
                 
             });
    }
    init();

   

    /*tes marker*/
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
    /*end*/

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

    $scope.addFP=function(FP){
       
        FP.lat=$scope.coords.lat;
        FP.lng=$scope.coords.lng;
         console.log(FP);
         var input=document.querySelector('input[type=file]');

          var form=document.getElementById("fishPlace"),
              inputs=form.elements,
              fd = new FormData();

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
    /*open report form*/
    $scope.isOpen = false;
    $scope.toggle = function() {
        $scope.isOpen = !$scope.isOpen;
    }  
    /*log out*/
    $scope.logout=function() {
        AuthService.logout().then(function () {
            $rootScope.cur_user = null;
            $location.url('/login');
        });
    };


});
