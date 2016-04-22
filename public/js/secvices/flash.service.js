/**
 * Created by Dmitry on 4/15/2016.
 */

angular
    .module("fp")
    .factory('FlashService', ["$rootScope","$timeout" ,function ($rootScope,$timeout) {
        $rootScope.msg=null;

        var service={
            success: successMessage,
            error  : errorMessage

        };

        return service;

        function successMessage (message) {

            $rootScope.msg={
                text : message,
                type : "success"
            };
            $timeout(clearMessage,5000);

        };


        function errorMessage (message) {
            $rootScope.msg={
                text : message,
                type : "danger"
            };
            $timeout(clearMessage,5000);
        };

        //private method
        function clearMessage () {
            $rootScope.msg=null;
        };

    }]);