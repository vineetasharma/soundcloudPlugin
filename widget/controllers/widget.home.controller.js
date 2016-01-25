'use strict';

(function (angular) {
    angular
        .module('soundCloudPluginWidget')
        .controller('WidgetHomeCtrl', ['$scope', '$timeout', 'DEFAULT_DATA', 'COLLECTIONS', 'DB', 'soundCloudAPI',
            '$rootScope',
            function ($scope, $timeout, DEFAULT_DATA, COLLECTIONS, DB, soundCloudAPI, $rootScope) {
                console.log('WidgetHomeCtrl Controller Loaded-------------------------------------');
                $rootScope.playTrack = false;
                var WidgetHome = this;
                WidgetHome.view = null;

                WidgetHome.page = -1;
                WidgetHome.noMore = false;
                WidgetHome.isBusy = true;

                /*declare the device width heights*/
                $rootScope.deviceHeight = window.innerHeight;
                $rootScope.deviceWidth = window.innerWidth;

                WidgetHome.SoundCloudInfoContent = new DB(COLLECTIONS.SoundCloudInfo);


                WidgetHome.showDescription = function () {
                    if (WidgetHome.info.data.content.description == '<p>&nbsp;<br></p>' || WidgetHome.info.data.content.description == '<p><br data-mce-bogus="1"></p>')
                        return false;
                    else
                        return true;
                };

                /// load items
                WidgetHome.loadItems = function (carouselItems) {
                    // create an instance and pass it the items if you don't have items yet just pass []
                    if (WidgetHome.view)
                        WidgetHome.view.loadItems(carouselItems);
                }

                WidgetHome.initCarousel = function () {

                    if (WidgetHome.info && WidgetHome.info.data.content.images.length) {
                        WidgetHome.view.loadItems(WidgetHome.info.data.content.images);
                    } else {
                        WidgetHome.view.loadItems([]);
                    }

                };

                WidgetHome.SoundCloudInfoContent.get().then(function success(result) {
                        console.log('>>result<<', result);
                        if (result && result.data && result.id) {
                            WidgetHome.info = result;
                            if (WidgetHome.info.data && WidgetHome.info.data.design)
                                $rootScope.bgImage = WidgetHome.info.data.design.bgImage;
                            if (WidgetHome.info.data.content.link && WidgetHome.info.data.content.soundcloudClientID) {
                                soundCloudAPI.connect(WidgetHome.info.data.content.soundcloudClientID);
                                WidgetHome.loadMore();
                            }
                        }
                        else {
                            WidgetHome.info = DEFAULT_DATA.SOUND_CLOUD_INFO;
                            if (WidgetHome.info.data.content.link && WidgetHome.info.data.content.soundcloudClientID) {
                                soundCloudAPI.connect(WidgetHome.info.data.content.soundcloudClientID);
                                WidgetHome.isBusy = false;
                                WidgetHome.loadMore();
                            }
                        }
                    },
                    function fail() {
                        WidgetHome.info = DEFAULT_DATA.SOUND_CLOUD_INFO;
                    }
                );

                WidgetHome.goToTrack = function (track) {
                    console.log('Goto Track called---------------------------------------', track);
                    $rootScope.playTrack = true;
                    WidgetHome.currentTrack = track;
                    console.log('Goto Track called---------------$rootScope playTrack------------------------', $rootScope.playTrack);
                    if (!$rootScope.$$phase)$rootScope.$digest();
                };

                WidgetHome.loadMore = function () {
                    if (WidgetHome.isBusy) {
                        console.error('turned back');
                        return;
                    }
                    console.log('WidgetHome.page', WidgetHome.page);
                    WidgetHome.isBusy = true;
                    soundCloudAPI.getTracks(WidgetHome.info.data.content.link, ++WidgetHome.page)
                        .then(function (data) {
                            WidgetHome.isBusy = false;
                            var d = data.collection;
                            WidgetHome.tracks = WidgetHome.tracks ? WidgetHome.tracks.concat(d) : d;
                            console.log('WidgetHome.tracks', WidgetHome.tracks);
                            $scope.$digest();
                        });
                };

                /**
                 * Player related method and variables
                 */

                WidgetHome.playTrack = function () {
                    WidgetHome.playing = true;
                };
                WidgetHome.pauseTrack = function () {
                    WidgetHome.playing = false;
                };
                WidgetHome.openSettingsOverlay = function () {
                    WidgetHome.openSettings = true;
                };
                WidgetHome.openPlayListOverlay = function () {
                    WidgetHome.openPlaylist = true;
                };
                WidgetHome.openMoreInfoOverlay = function () {
                    WidgetHome.openMoreInfo = true;
                };
                WidgetHome.closeSettingsOverlay = function () {
                    WidgetHome.openSettings = false;
                };
                WidgetHome.closePlayListOverlay = function () {
                    WidgetHome.openPlaylist = false;
                };
                WidgetHome.closeMoreInfoOverlay = function () {
                    WidgetHome.openMoreInfo = false;
                };
                $scope.$on("Carousel:LOADED", function () {
                    if (!WidgetHome.view) {
                        WidgetHome.view = new window.buildfire.components.carousel.view("#carousel", []);  ///create new instance of buildfire carousel viewer
                    }
                    if (WidgetHome.view && WidgetHome.info && WidgetHome.info.data) {
                        WidgetHome.initCarousel();
                    }
                    else {
                        WidgetHome.view.loadItems([]);
                    }
                });


                /**
                 * Buildfire.datastore.onUpdate method calls when Data is changed.
                 */

                var onUpdateCallback = function (event) {
                    if (event.data) {
                        WidgetHome.info = event;
                        $rootScope.bgImage = WidgetHome.info.data.design.bgImage;
                        /* if (WidgetHome.info.data.content.link && WidgetHome.info.data.content.soundcloudClientID) {
                         soundCloudAPI.connect(WidgetHome.info.data.content.soundcloudClientID);
                         WidgetHome.loadMore();
                         }*/
                        WidgetHome.initCarousel();
                        $scope.$apply();
                    }

                };

                var listener = window.buildfire.datastore.onUpdate(onUpdateCallback);

            }]);
})(window.angular);