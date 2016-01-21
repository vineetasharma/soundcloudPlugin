'use strict';

(function (angular) {
    angular
        .module('soundCloudPluginContent')
        .controller('ContentHomeCtrl', ['$scope', '$timeout','DB','COLLECTIONS','Buildfire','DEFAULT_DATA',
            function ($scope, $timeout,DB,COLLECTIONS,Buildfire,DEFAULT_DATA) {
                console.log('ContentHomeCtrl Controller Loaded-------------------------------------');
                var ContentHome = this;
                var soundCloud=new DB(COLLECTIONS.SoundCloudInfo);

                // create a new instance of the buildfire carousel editor
                ContentHome.editor = new Buildfire.components.carousel.editor("#carousel");

                // this method will be called when a new item added to the list
                ContentHome.editor.onAddItems = function (items) {
                    if (!ContentHome.info.data.content.images)
                        ContentHome.info.data.content.images = [];
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
                    if (!$scope.$$phase)$scope.$digest();
                };
                // this method will be called when you change the order of items
                ContentHome.editor.onOrderChange = function (item, oldIndex, newIndex) {
                    var temp = ContentHome.info.data.content.images[oldIndex];
                    ContentHome.info.data.content.images[oldIndex] = ContentHome.info.data.content.images[newIndex];
                    ContentHome.info.data.content.images[newIndex] = temp;
                    if (!$scope.$$phase)$scope.$digest();
                };

                function init(){
                    var success=function(data){
                        if(data.data){
                            ContentHome.info=data;
                        }
                        else{
                            ContentHome.info=DEFAULT_DATA.SOUND_CLOUD_INFO;
                        }
                        console.log('Got soundcloud info successfully-----------------',data);
                    };
                    var error=function(err){
                        console.error('Error while getting data from db-------',err);
                    };
                    soundCloud.get().then(success,error);
                }

                init();


            }]);
})(window.angular);