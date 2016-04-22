/**
 * Created by Dmitry on 4/14/2016.
 */

angular
    .module('fp')
    .service("AuthService",['$rootScope','$q','$http',function($rootScope,$q,$http){
        $rootScope.error='';
        $rootScope.curr_user='';

        var service={
            isLoggedIn: isLoggedIn,
            //getUserStatus: getUserStatus,
            login: login,
            logout: logout,
            register: register
        };

        return service;


        function login(User){
            var deffered=$q.defer();

            $http.post('/login',User)
             .success(function(data,status){
                 if(status===200&&data.user){
                    deffered.resolve(data);
                 }else{
                     deffered.reject(data.error);
                 }
             }).error(function(data){
                //deffered.reject({error:"Something bad happened!Try again!"});
                deffered.reject(data.error);
             });
            return deffered.promise;
        }
        function register (newUser){
            var deffered=$q.defer();

            $http.post('/registration',newUser)
                .success(function(data,status){
                    if(status===200&&data.status){
                        deffered.resolve(data);
                    }else{
                        deffered.reject(data.error);
                    }
                })
                .error(function(data){
                    deffered.reject(data.error);
                });
            return deffered.promise;
        }
        function logout (){
            var deffered=$q.defer();
            $http.get('/logout')
                .success(function(data,status){
                    if(data.status==='logout successfully'){
                        deffered.resolve(data);
                    }
                })
                .error(function(){
                    deffered.reject();
                });
            return deffered.promise;
        }
        function isLoggedIn (){}
    }]);