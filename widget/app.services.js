(function (angular, buildfire, location) {
    'use strict';
    //created mediaCenterWidget module
    angular
        .module('soundCloudWidgetServices', ['soundCloudWidgetEnums'])
        .provider('Buildfire', [function () {
            this.$get = function () {
                return buildfire;
            };
        }])
        /*.factory('Location', [function () {
            var _location = location;
            return {
                go: function (path) {
                    _location.href = path;
                },
                goToHome: function () {
                    _location.href = _location.href.substr(0, _location.href.indexOf('#'));
                }
            };
        }])*/
        .service('soundCloudAPI', ['$http', '$q', function ($http, $q) {
            var that = this;

            that.connect = function (clientId) {
                SC.initialize({
                    client_id: clientId
                });
            };

            that.getTracks = function (link, page) {
                var page_size = 7;

                /*if (true) {*/
                    var q = '';
                    if (link.indexOf('tracks') != -1)
                        q = link.split('/').slice(-2, -1)[0]; // get second last route param i.e. artist's name
                    else
                        q = link.split('/').pop();  // get last route param i.e artist's name
                    return SC.get('/users/' + q + '/tracks', {
                        limit: page_size,
                        offset: (page * page_size),
                        linked_partitioning: page
                    });
              /*  }
                else {
                    SC.resolve(link).then(function (d) {
                        return SC.get();
                    });
                }*/
            }
        }])
        .factory("DB", ['Buildfire', '$q', 'MESSAGES', 'CODES', function (Buildfire, $q, MESSAGES, CODES) {
            function DB(tagName) {
                this._tagName = tagName;
            }

            DB.prototype.get = function () {
                var that = this;
                var deferred = $q.defer();
                Buildfire.datastore.get(that._tagName, function (err, result) {
                    if (err && err.code == CODES.NOT_FOUND) {
                        return deferred.resolve();
                    }
                    else if (err) {
                        return deferred.reject(err);
                    }
                    else {
                        return deferred.resolve(result);
                    }
                });
                return deferred.promise;
            };
            return DB;
        }]);
})(window.angular, window.buildfire, window.location);