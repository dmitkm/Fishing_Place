/**
 * Created by Dmitry on 3/9/2016.
 */
/*(function(){*/
angular
    .module('fp')
    .factory('mapService',['$rootScope',function($rootScope){

        var service={},
            marker;


        var coords={};

        service.newMap=function(container,options){
            this.map=new google.maps.Map(container,options);
            var _this=this;
            google.maps.event.addListener(this.map,'click',function(e){
                coords.lat=e.latLng.lat();
                coords.lng=e.latLng.lng();
                //console.log($rootScope.coords);
                $rootScope.$broadcast("clicked");

                var opt={
                    lat:e.latLng.lat(),
                    lng:e.latLng.lng(),
                    draggable:true,
                    icon:'../img/gps.svg'
                };

                updateMarker.apply(this,[_this.map,opt]);
            });
            return this.map;

        };
        service.addEvent=function(obj,event,callback){
            var that=this;
             google.maps.event.addListener(obj,event,function(e){
                 callback.call(that,e);
          });
        };

        service.addMarker=function (map,opts) {
            var marker;
            opts.position={
                lat:opts.lat,
                lng:opts.lng
            };
            marker=createMarker(opts,map);
            if(opts.event){
                this.addEvent(marker,opts.event.name,opts.event.callback);
            }
            if(opts.content){
                this.addEvent(marker,'click',function () {
                    var infoWindow=new google.maps.InfoWindow({
                        content:opts.content
                    });
                    infoWindow.open(map,marker);
                });
            }
            return marker;
        };

        service.addNewMarker=function(map,opt){
            var that=this;

            this.addEvent(map,'click',function(e){

                console.log("lat: "+ e.latLng.lat()+
                    "lng: "+e.latLng.lng());

                    opt.lat=e.latLng.lat();
                    opt.lng=e.latLng.lng();
                    opt.event={
                        name: "click",
                        callback: function () {
                            console.log('im click');
                        }
                    },
                    opt.draggable=true;


                    that.addMarker(map,opt);
            });



        };

        service.getCurrentCords=function(){
            //console.log(coords);
            return coords;

        };

        //privat method
        function createMarker(opts,map) {
            opts.map=map;
            return new google.maps.Marker(opts);

        }
        function updateMarker(map,opt){
            if(!marker || !marker.setPosition){
                marker=service.addMarker(map,opt);
            }else{
                marker.setPosition({lat:opt.lat,lng:opt.lng});
            }
        }
            return service;
    }]);
/*
})();*/
