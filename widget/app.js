(function (angular, buildfire) {
    "use strict";
    //created soundCloudWidget module
    angular
        .module('soundCloudPluginWidget',
        [
            'ngAnimate',
            'ngRoute',
            'ui.bootstrap',
            'soundCloudWidgetEnums',
            'soundCloudPluginWidgetFilters',
            'soundCloudWidgetServices',
            'infinite-scroll',
            'soundCloudModals',
            'ngTouch'
        ])
        //injected ngRoute for routing
        //injected ui.bootstrap for angular bootstrap component
        .config(['$httpProvider','$compileProvider', function ($httpProvider,$compileProvider) {

            /**
             * To make href urls safe on mobile
             */
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|cdvfile|file):/);


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

        }])
      .directive("loadImage", [function () {
        return {
          restrict: 'A',
          link: function (scope, element, attrs) {
            element.attr("src", "../../../styles/media/holder-" + attrs.loadImage + ".gif");

            var elem = $("<img>");
            elem[0].onload = function () {
              element.attr("src", attrs.finalSrc);
              elem.remove();
            };
            elem.attr("src", attrs.finalSrc);
          }
        };
      }])
        .run(['$location', '$rootScope','$timeout', function ($location, $rootScope,$timeout) {
            buildfire.history.onPop(function(data, err){
                console.log('buildfire.history.onPop----------------------------',data,'Error------------------',err);
                if($rootScope.playTrack){
                    $timeout(function () {
                        if($rootScope.openPlaylist){
                            $rootScope.openPlaylist=false;
                        }
                        else{
                            $rootScope.playTrack=false;
                            $rootScope.$broadcast("destroy currentTrack");
                        }
                    }, 100);
                    if($rootScope.$$phase){$rootScope.$digest();}
                }
            });
        }]);
})
(window.angular, window.buildfire);
