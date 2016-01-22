(function (angular) {
    "use strict";
    angular
        .module('soundCloudWidgetEnums', [])
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
                        images: [{iconUrl:'http://imageserver.prod.s3.amazonaws.com/1453358006303-04785112652461976/1f3dd710-c019-11e5-97c2-75a2cda7b99b.png'}],
                        description: '<p>Lakshay<br></p>',
                        soundcloudClientID: '9a09ee0e50798267cb7644fb5c238ade',
                        link: 'https://soundcloud.com/laraparkerkent/tracks'
                    },
                    design: {
                        itemListLayout: "list-layout1",
                        bgImage: "http://imageserver.prod.s3.amazonaws.com/1453358006303-04785112652461976/1f3dd710-c019-11e5-97c2-75a2cda7b99b.png"
                    }
                }
            }
        });

})(window.angular);