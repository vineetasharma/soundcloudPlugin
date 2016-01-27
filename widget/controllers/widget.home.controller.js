'use strict';

(function (angular) {
    angular
        .module('soundCloudPluginWidget')
        .controller('WidgetHomeCtrl', ['$scope', '$timeout', 'DEFAULT_DATA', 'COLLECTIONS', 'DB', 'soundCloudAPI', 'Buildfire',
            '$rootScope',
            function ($scope, $timeout, DEFAULT_DATA, COLLECTIONS, DB, soundCloudAPI, Buildfire, $rootScope) {
                console.log('WidgetHomeCtrl Controller Loaded-------------------------------------');
                $rootScope.playTrack = false;
                var WidgetHome = this;
                WidgetHome.view = null;
                WidgetHome.currentTime = 0.0;

                WidgetHome.page = -1;
                WidgetHome.noMore = false;
                WidgetHome.isBusy = false;

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
                };

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
                    if (WidgetHome.info && WidgetHome.info.data && WidgetHome.info.data.content && WidgetHome.info.data.content.link)
                        soundCloudAPI.getTracks(WidgetHome.info.data.content.link, ++WidgetHome.page)
                            .then(function (data) {
                                console.log('Got tracks--------------------------', data);
                                WidgetHome.isBusy = false;
                                var d = data.collection;
                                WidgetHome.tracks = WidgetHome.tracks ? WidgetHome.tracks.concat(d) : d;
                                console.log('WidgetHome.tracks', WidgetHome.tracks);
                                $scope.$digest();
                            });
                };

                /**
                 * audioPlayer is Buildfire.services.media.audioPlayer.
                 */
                var audioPlayer = Buildfire.services.media.audioPlayer;

                /**
                 * audioPlayer.onEvent callback calls when audioPlayer event fires.
                 */
                audioPlayer.onEvent(function (e) {
                    console.log('Audio Player On Event callback Method------------------', e);
                    if (e.event == "timeUpdate") {
                        WidgetHome.currentTime = e.data.currentTime;
                        WidgetHome.duration = e.data.duration;
                        $scope.$apply();
                    }
                    else if (e.event == "audioEnded") {
                        WidgetHome.playing = false;
                        $scope.$apply();
                    }
                    else if (e.event == "pause") {
                        WidgetHome.playing = false;
                        $scope.$apply();
                    }
                });

                /**
                 * Player related method and variables
                 */
                WidgetHome.playTrack = function () {
                    console.log('Widget HOme url----------------------', WidgetHome.currentTrack.stream_url + '?client_id=' + WidgetHome.info.data.content.soundcloudClientID);
                    WidgetHome.playing = true;
                    if (WidgetHome.paused) {
                        audioPlayer.play();
                    } else {
                        audioPlayer.play({url: WidgetHome.currentTrack.stream_url + '?client_id=' + WidgetHome.info.data.content.soundcloudClientID});
                    }
                };
                WidgetHome.pauseTrack = function () {
                    WidgetHome.playing = false;
                    WidgetHome.paused = true;
                    audioPlayer.pause();
                };
                WidgetHome.forward = function () {
                    if (WidgetHome.currentTime + 5 >= WidgetHome.currentTrack.duration)
                        audioPlayer.setTime(WidgetHome.currentTrack.duration);
                    else
                        audioPlayer.setTime(WidgetHome.currentTime + 5);
                };

                WidgetHome.backward = function () {
                    if (WidgetHome.currentTime - 5 > 0)
                        audioPlayer.setTime(WidgetHome.currentTime - 5);
                    else
                        audioPlayer.setTime(0);
                };
                WidgetHome.shufflePlaylist = function () {
                    console.log('WidgetHome settings in shuffle---------------------',WidgetHome.settings);
                    if(WidgetHome.settings){
                        WidgetHome.settings.shufflePlaylist=WidgetHome.settings.shufflePlaylist?false:true;
                    }
                    audioPlayer.settings.set(WidgetHome.settings);
                };
                WidgetHome.loopPlaylist = function () {
                    console.log('WidgetHome settings in Loop Playlist---------------------',WidgetHome.settings);
                    if(WidgetHome.settings){
                        WidgetHome.settings.loopPlaylist=WidgetHome.settings.loopPlaylist?false:true;
                    }
                    audioPlayer.settings.set(WidgetHome.settings);
                };
                WidgetHome.addToPlaylist = function (track) {
                    console.log('AddToPlaylist called-------------------------------');
                    var playListTrack=new Track(track.title,track.stream_url+'?client_id='+WidgetHome.info.data.content.soundcloudClientID,track.artwork_url,track.tag_list,track.user.username);
                    audioPlayer.addToPlaylist(playListTrack);
                };
                WidgetHome.removeFromPlaylist = function (track) {
                    var playListTrack=new Track(track.title,track.stream_url+'?client_id='+WidgetHome.info.data.content.soundcloudClientID,track.artwork_url,track.tag_list,track.user.username);
                    console.log('removeFromPlaylist called-------------------------------');
                    if(WidgetHome.playList){
                        var trackIndex;
                        WidgetHome.playList.filter(function(val,index){
                            if(val.url==track.stream_url+'?client_id='+WidgetHome.info.data.content.soundcloudClientID)
                                audioPlayer.removeFromPlaylist(index);
                            return index;

                        });
                        console.log('indexes------------track Index----------------------track==========',trackIndex);
                    }
                    /*if(trackIndex!='undefined'){
                        audioPlayer.removeFromPlaylist(trackIndex);
                    }*/
                };
                WidgetHome.getFromPlaylist = function () {
                    audioPlayer.getPlaylist(function(err,data){
                        console.log('Callback---------getList--------------',err,data);
                        if(data && data.tracks){
                            WidgetHome.playList=data.tracks;
                        }
                    });
                    WidgetHome.openMoreInfo=false;
                    WidgetHome.openPlaylist=true;
                };
                WidgetHome.changeTime = function (time) {
                    console.log('Change time method called---------------------------------', time);
                    WidgetHome.currentTime = time / 1000;
                    audioPlayer.setTime(time / 1000);
                };
                WidgetHome.getSettings = function () {
                    WidgetHome.openSettings = true;
                    audioPlayer.settings.get(function(err,data){
                        console.log('Got player settings-----------------------',err,data);
                        if(data){
                            WidgetHome.settings=data;
                            if(!$scope.$$phase){$scope.$digest();}
                        }
                    });
                };
                WidgetHome.setSettings = function (settings) {
                    console.log('Set settings called----------------------',settings);
                    console.log('WidgetHome-------------settings------',WidgetHome.settings);
                    var newSettings=new AudioSettings(settings);
                    audioPlayer.settings.set(newSettings);
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
                $scope.$on("destroy currentTrack", function () {
                    WidgetHome.currentTime = 0.0;
                    WidgetHome.playing=false;
                    WidgetHome.paused=false;
                    WidgetHome.currentTrack=null;
                });

                /**
                 * Track Smaple
                 * @param title
                 * @param url
                 * @param image
                 * @param album
                 * @param artist
                 * @constructor
                 */

                function Track(title, url, image, album,artist) {
                    this.title = title;
                    this.url = url;
                    this.image = image;
                    this.album = album;
                    this.artist=artist;
                    this.startAt = 0; // where to begin playing
                    this.lastPosition = 0; // last played to
                }

                /**
                 * AudioSettings sample
                 * @param autoPlayNext
                 * @param loop
                 * @param autoJumpToLastPosition
                 * @param shufflePlaylist
                 * @constructor
                 */
                function AudioSettings(settings){
                    this.autoPlayNext = settings.autoPlayNext; // once a track is finished playing go to the next track in the play list and play it
                    this.loopPlaylist = settings.loopPlaylist; // once the end of the playlist has been reached start over again
                    this.autoJumpToLastPosition= settings.autoJumpToLastPosition; //If a track has [lastPosition] use it to start playing the audio from there
                    this.shufflePlaylist =settings.shufflePlaylist;// shuffle the playlist
                }


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

                var listener = Buildfire.datastore.onUpdate(onUpdateCallback);

            }]);
})(window.angular);