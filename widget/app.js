(function (angular, buildfire) {
    "use strict";
    //created soundCloudWidget module
    angular
        .module('soundCloudWidget',
        [
            'ngAnimate',
            'ngRoute',
            'ui.bootstrap',
            'infinite-scroll'
        ])
        //injected ngRoute for routing
        //injected ui.bootstrap for angular bootstrap component
        .config(['$httpProvider', function ($httpProvider) {
            var interceptor = ['$q', function ($q) {
                var counter = 0;

                return {

                    request: function (config) {
                        buildfire.spinner.show();
                        //NProgress.start();

                        counter++;
                        return config;
                    },
                    response: function (response) {
                        counter--;
                        if (counter === 0) {

                            buildfire.spinner.hide();
                        }
                        return response;
                    },
                    responseError: function (rejection) {
                        counter--;
                        if (counter === 0) {

                            buildfire.spinner.hide();
                        }

                        return $q.reject(rejection);
                    }
                };
            }];
            $httpProvider.interceptors.push(interceptor);

        }]);
})
(window.angular, window.buildfire);
