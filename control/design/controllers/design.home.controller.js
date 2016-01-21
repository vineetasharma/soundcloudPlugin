'use strict';

(function (angular) {
    angular
        .module('soundcloudPluginDesign')
        .controller('DesignHomeCtrl', ['$scope', '$timeout','COLLECTIONS','DB','DEFAULT_DATA',
            function ($scope, $timeout,COLLECTIONS,DB,DEFAULT_DATA) {
                console.log('DesignHome Controller Loaded-------------------------------------');
                var DesignHome = this;
                var timerDelay,masterInfo;
                var soundCloud=new DB(COLLECTIONS.SoundCloudInfo);
                function init(){
                    var success=function(data){
                        if(data && data.data && (data.data.content || data.data.design)){
                            console.log('Info got---------------');
                            updateMasterInfo(data.data);
                            DesignHome.info=data;
                        }
                        else{
                            updateMasterInfo(DEFAULT_DATA.SOUND_CLOUD_INFO);
                            DesignHome.info=DEFAULT_DATA.SOUND_CLOUD_INFO;
                        }
                        console.log('Got soundcloud info successfully-----------------',data.data);
                    };
                    var error=function(err){
                        console.error('Error while getting data from db-------',err);
                    };
                    soundCloud.get().then(success,error);
                }
                init();

                function isUnchanged(info) {
                    console.log('info------------------------------------------',info);
                    console.log('Master info------------------------------------------',masterInfo);
                    return angular.equals(info,masterInfo);
                }

                function updateMasterInfo(info) {
                    masterInfo = angular.copy(info);
                }
                function saveData(_info){
                    var saveSuccess=function(data){
                        console.log('Data saved successfully--------------------------',data);
                    };
                    var saveError=function(err){
                        console.error('Error while saving data------------------------------',err);
                    };
                    if(_info && _info.data)
                        soundCloud.save(_info.data).then(saveSuccess,saveError);
                }

                function updateInfoData(_info){
                    if (timerDelay) {
                        clearTimeout(timerDelay);
                    }
                    if (_info && _info.data && !isUnchanged(_info)) {
                        timerDelay = setTimeout(function () {
                            saveData(_info);
                        }, 1000);
                    }
                }

                $scope.$watch(function () {
                    return DesignHome.info;
                }, updateInfoData, true);
            }]);
})(window.angular);