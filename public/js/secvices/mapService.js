/**
 * Created by Dmitry on 3/9/2016.
 */
/*(function(){*/
angular
    .module('fp')
    .factory('mapService',function(){
        var service={};
        service.newMap=function(container,options){
            var map=new google.maps.Map(container,options);
            var markbtn=document.getElementById("new_marker_btn");
            map.controls[google.maps.ControlPosition.LEFT_CENTER].push(markbtn);
            return map;

        };
        service.addEvent=function(obj,event,callback){
            var that=this;
             google.maps.event.addListener(obj,event,function(e){
                 callback.call(that,e);
          });
        }

        service.addMarker=function (map,opts) {
            var marker;
            opts.position={
                lat:opts.lat,
                lng:opts.lng
            }
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
        }

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


        }



        //privat method
        function createMarker(opts,map) {
            opts.map=map;
            return new google.maps.Marker(opts);

        }

            return service;
    });
/*
})();*/
