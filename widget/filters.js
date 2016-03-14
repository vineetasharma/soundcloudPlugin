(function (angular, buildfire) {
    "use strict";
    //created mediaCenterWidget module
    angular
        .module('soundCloudPluginWidgetFilters', [])
        .filter('resizeImage', [function () {
            return function (url, width, height, type) {
                return buildfire.imageLib.resizeImage(url, {
                    width: width,
                    height: height
                });
            };
        }])
        .filter('cropImage', [function () {
            return function (url, width, height, type) {
                var url = url && url.replace('large','t300x300');
                return buildfire.imageLib.cropImage(url, {
                    width: width,
                    height: height
                });
            };
        }])
        .filter('safeHtml', ['$sce', function ($sce) {
            return function (html) {
                if (html) {
                    var $html = $('<div />', {html: html});
                    $html.find('iframe').each(function (index, element) {
                        var src = element.src;
                        console.log('element is: ', src, src.indexOf('http'));
                        src = src && src.indexOf('file://') != -1 ? src.replace('file://', 'http://') : src;
                        element.src = src && src.indexOf('http') != -1 ? src : 'http:' + src;
                    });
                    return $sce.trustAsHtml($html.html());
                } else {
                    return "";
                }
            };
        }])
        .filter('millisecondsToDateTime', [function() {
            return function(milliseconds) {
                var seconds = milliseconds / 1000;
                return new Date(1970, 0, 1).setSeconds(seconds);
            };
        }])
        .filter('secondsToDateTime', [function() {
            return function(seconds) {
                return new Date(1970, 0, 1).setSeconds(seconds);
            };
        }]);
})(window.angular,window.buildfire);