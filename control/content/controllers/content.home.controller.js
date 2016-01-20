'use strict';

(function (angular) {
    angular
        .module('soundCloudPluginContent')
        .controller('ContentHomeCtrl', ['$scope', '$timeout',
            function ($scope, $timeout) {
                console.log('ContentHomeCtrl Controller Loaded-------------------------------------');
                var ContentHome = this;
            }]);
})(window.angular);