'use strict';

(function (angular) {
    angular
        .module('soundCloudPluginContent')
        .controller('ContentHomeCtrl', ['$scope', '$timeout', 'DB', 'COLLECTIONS', 'Buildfire', 'DEFAULT_DATA', 'soundCloudAPI',
            function ($scope, $timeout, DB, COLLECTIONS, Buildfire, DEFAULT_DATA, soundCloudAPI) {
                console.log('ContentHomeCtrl Controller Loaded-------------------------------------');
                var ContentHome = this;
                var timerDelay, masterInfo;
                //TODO: constant should be in capital case
                ContentHome.soundCloud = new DB(COLLECTIONS.SoundCloudInfo);

                //option for wysiwyg
                ContentHome.bodyWYSIWYGOptions = {
                    plugins: 'advlist autolink link image lists charmap print preview',
                    skin: 'lightgray',
                    trusted: true,
                    theme: 'modern'
                };
                //TODO: wrong assignment of null
                ContentHome.soundcloudLinksInvalid = null;

                //TODO: html/jquery code shuold be in directive
                // create a new instance of the buildfire carousel editor
                ContentHome.editor = new Buildfire.components.carousel.editor("#carousel");

                // this method will be called when a new item added to the list
                ContentHome.editor.onAddItems = function (items) {
                    console.log('Content info==========================', ContentHome.info);
                    if (ContentHome.info && ContentHome.info.data && ContentHome.info.data.content && !ContentHome.info.data.content.images)
                        ContentHome.info.data.content.images = [];
                    //TODO: use concat instead of push/apply
                    ContentHome.info.data.content.images.push.apply(ContentHome.info.data.content.images, items);
                    if (!$scope.$$phase)$scope.$digest();
                };
                // this method will be called when an item deleted from the list
                ContentHome.editor.onDeleteItem = function (item, index) {
                    ContentHome.info.data.content.images.splice(index, 1);
                    if (!$scope.$$phase)$scope.$digest();
                };
                // this method will be called when you edit item details
                ContentHome.editor.onItemChange = function (item, index) {
                    ContentHome.info.data.content.images.splice(index, 1, item);
                    //TODO: move this to util method
                    if (!$scope.$$phase)$scope.$digest();
                };
                // this method will be called when you change the order of items
                ContentHome.editor.onOrderChange = function (item, oldIndex, newIndex) {
                    //TODO: check for index out of bound

                  var items = ContentHome.info.data.content.images;

                  var tmp = items[oldIndex];

                  if (oldIndex < newIndex) {
                    for (var i = oldIndex + 1; i <= newIndex; i++) {
                      items[i - 1] = items[i];
                    }
                  } else {
                    for (var i = oldIndex - 1; i >= newIndex; i--) {
                      items[i + 1] = items[i];
                    }
                  }
                  items[newIndex] = tmp;

                  ContentHome.info.data.content.images = items;
                    if (!$scope.$$phase)$scope.$digest();
                };


                ContentHome.verifySoundcloudLinks = function () {
                    if (ContentHome.info.data.content.soundcloudClientID && ContentHome.info.data.content.link) {
                        //TODO: rename it in promise
                        var method_return = soundCloudAPI.verify(ContentHome.info.data.content.soundcloudClientID, ContentHome.info.data.content.link);

                        method_return.then(function (d) {
                            //console.log('verify d',d);
                            //TODO: data type should be same in all case either string/bool
                            if (angular.isArray(d) || ['playlist', 'track', 'user'].indexOf(d.kind) != -1)
                                ContentHome.soundcloudLinksInvalid = false;
                            else
                                ContentHome.soundcloudLinksInvalid = 'link';
                            $timeout(function () {
                                ContentHome.soundcloudLinksInvalid = null;
                            }, 2000);
                            //TODO: check for $$phase
                            $scope.$digest();
                        }, function (e) {
                            if (e.status === 401)
                                ContentHome.soundcloudLinksInvalid = 'Client ID';
                            else
                                ContentHome.soundcloudLinksInvalid = 'link';

                            $timeout(function () {
                                ContentHome.soundcloudLinksInvalid = null;
                            }, 2000);
                            //TODO: no use of $scope.$digest();, remove it.
                            $scope.$digest();
                        });
                    }
                };

                function init() {
                    //TODO: user function instead of var function literate
                    var success = function (data) {
                        if (data && data.data && (data.data.content || data.data.design)) {
                            updateMasterInfo(data);
                            ContentHome.info = data;
                            if (data.data.content && data.data.content.images) {
                                ContentHome.editor.loadItems(data.data.content.images);
                            }
                        }
                        else {
                            updateMasterInfo(DEFAULT_DATA.SOUND_CLOUD_INFO);
                            ContentHome.info = DEFAULT_DATA.SOUND_CLOUD_INFO;
                        }
                    };
                    var error = function (err) {
                        console.error('Error while getting data from db-------', err);
                    };
                    ContentHome.soundCloud.get().then(success, error);
                }

                init();

                function isUnchanged(info) {
                    console.log('info------------------------------------------', info);
                    console.log('Master info------------------------------------------', masterInfo);
                    return angular.equals(info, masterInfo);
                }

                function updateMasterInfo(info) {
                    masterInfo = angular.copy(info);
                }

                function saveData(_info) {
                    //TODO: user function instead of var function literate
                    var saveSuccess = function (data) {
                        console.log('Data saved successfully---------------from content-----------', data);
                    };
                    var saveError = function (err) {
                        console.error('Error while saving data------------------------------', err);
                    };
                    if (_info && _info.data)
                        ContentHome.soundCloud.save(_info.data).then(saveSuccess, saveError);
                }

                function updateInfoData(_info) {
                    if (timerDelay) {
                        clearTimeout(timerDelay);
                    }
                    if (_info && _info.data && !isUnchanged(_info)) {
                        timerDelay = $timeout(function () {
                            if (_info.data.default == true) {
                                delete _info.data.default;
                                if (_info.data.content.link == DEFAULT_DATA.SOUND_CLOUD_INFO.data.content.link)
                                    _info.data.content.link = '';
                                _info.data.content.soundcloudClientID = '';
                            }
                            saveData(_info);
                        }, 1000);
                    }
                }

                ContentHome.clearData = function () {

                };
                $scope.$watch(function () {
                    return ContentHome.info;
                }, updateInfoData, true);

            }]);
})(window.angular);