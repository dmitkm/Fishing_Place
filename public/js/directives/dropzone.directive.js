/**
 * Created by Dmitry on 4/6/2016.
 */
angular
    .module("fp")
    .directive("dropzone",function($http){
        return {
            restrict:"A",
            //scope:false,
            scope:{
                loading:'=loading',
                files:'=dropFiles',
                handleFile:'&'

            },
            link:function(scope,element,attr){

                element.on('dragover', function(e) {

                    e.preventDefault();
                    e.stopPropagation();
                    element.addClass('drop-zone-hover');
                });
                element.on('dragleave', function(e) {

                    e.preventDefault();
                    e.stopPropagation();
                    element.removeClass('drop-zone-hover');

                });
                element.on('drop', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(e);
                    if (e.dataTransfer){
                        var length=e.dataTransfer.files.length;
                        if (length > 0) {
                            console.log(e.dataTransfer.files);
                            //scope.handleFile(e.dataTransfer.files);
                            scope.handleFile({files:e.dataTransfer.files});
                            scope.files=e.dataTransfer.files;
 
                            element.removeClass('drop-zone-hover');
                        }
                    }
                    return false;
                });





            if(scope.loading =='done'){
                console.log('done');
                angular.element(selected).text("Done!");
                
            }
            element.removeClass('drop-zone-hover');

                function upload (files){
                    var input=element.find('input')[0];
                    var name=angular.element(input).attr('name');
                    //console.log(files);
                    var fd = new FormData();
                    for(var i = 0;i<files.length;i++){
                      console.log(files[i]);
                      fd.append(name,files[i]);
                    }
                    var xhr=new XMLHttpRequest();
                    xhr.open('post','/upload',true);
                    xhr.onreadystatechange=function(){
                      if(xhr.readyState===4 && xhr.status===200){
                        console.log("loaded");
                      }
                    };
                    xhr.upload.onprogress=function(e){
                    //console.log((e.loaded/e.tatal));
                  };

                      console.log(fd);
                    xhr.setRequestHeader('Content-Type','multipart/form-data;boundary=myString');
                    xhr.send(fd);
                    

                  /*  $http({
                        method: 'post',
                        url: '/upload',
                        headers: {'Content-Type': undefined /!*'multipart/form-data;boundary=myString*!/},
                        data: fd
                      }).success(function (data) {

                        scope.title=data.title;
                        scope.pic_name=data.name;
                        console.log(scope.pic_name);

                      });*/
                    
                }




            }
            
        };
    });
