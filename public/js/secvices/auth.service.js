/**
 * Created by Dmitry on 4/14/2016.
 */

angular
    .module('fp')
    .service("AuthService", function($rootScope,$window,$q,$http,$location){


        var service={
            setToken:setToken,
            getToken:getToken,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser,
            login:login,
            register:register,
            logOut:logOut
        };

        return service;

        function setToken(token){
            $window.localStorage['token'] = token;
        }

        function getToken(){
            return $window.localStorage['token'];
        }

        function isLoggedIn(){
            var token = service.getToken();

            if(token){
                var user_data = JSON.parse(atob(token.split('.')[1]));
                return user_data.exp > Date.now()/1000;
            }else{
                return false;
            }
        }

        function currentUser(){
            if(service.isLoggedIn()){
                var token = service.getToken();
                var user_data = JSON.parse(atob(token.split('.')[1]));

                return user_data.name;
            }
        }


        function login(User){
            var deffered=$q.defer();

            $http.post('/login',User)
             .success(function(data){
                     //console.log(data);
                     deffered.resolve(data);
                 //else{
                 //    deffered.reject(data.error);
                 //}
             }).error(function(data){
                deffered.reject(data.message);
             });
            return deffered.promise;
        }
        function register (newUser){
            var deffered=$q.defer();

            $http.post('/registration',newUser)
                .success(function(data,status){
                    if(status===200&&data.status){
                        deffered.resolve(data);

                        $location.path('/login');
                    }else{
                        deffered.reject(data.error);
                    }
                })
                .error(function(data){
                    deffered.reject(data.error);
                });
            return deffered.promise;
        }

        function logOut (){
            //var deffered=$q.defer();

            $window.localStorage.removeItem('token');

            $http.get('/logout')
                .success(function(data,status){
                    if(data.status==='logout successfully'){
                      //  deffered.resolve(data);
                    }
                })
                .error(function(){
                  //  deffered.reject();
                });
            // deffered.promise;
        }

    });