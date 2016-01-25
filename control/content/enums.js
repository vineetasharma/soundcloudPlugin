(function (angular) {
    "use strict";
    angular
        .module('soundCloudContentEnums', [])
        .constant('CODES', {
            NOT_FOUND: 'NOTFOUND',
            SUCCESS: 'SUCCESS'
        })
        .constant('MESSAGES', {
            ERROR: {
                NOT_FOUND: "No result found",
                CALLBACK_NOT_DEFINED: "Callback is not defined",
                ID_NOT_DEFINED: "Id is not defined",
                DATA_NOT_DEFINED: "Data is not defined",
                OPTION_REQUIRES: "Requires options"
            }
        })
        .constant('COLLECTIONS', {
            SoundCloudInfo: "soundCloudInfo"
        })
        .constant('DEFAULT_DATA', {
            SOUND_CLOUD_INFO: {
                data: {
                    content: {
                        images: [],
                        description: '',
                        soundcloudClientID: 'f949db5a9d9890512dbb5827b8329b8a',
                        link: 'https://soundcloud.com/laraparkerkent/tracks'
                    },
                    design: {
                        itemListLayout: "list-layout1",
                        bgImage: ""
                    }
                }
            }
        });

})(window.angular);