describe("ContentHomeCtrl", function () {

    var $rootScope,
        $scope,
        controller,
        q,
        $timeout,
        DEFAULT_DATA,
        DB,
        Buildfire,
        soundCloudAPI;
    beforeEach(module('soundCloudPluginContent', function ($provide) {
        $provide.service('Buildfire', function () {
            this.datastore = jasmine.createSpyObj('datastore', ['get', 'save']);
            this.datastore.get.and.callFake(function (_tagName, callback) {
                if (_tagName) {
                    callback(null, {
                        data: {
                            design: {
                                bgImage: ''
                            },
                            content: {
                                images: [{title: 'bg1.png'}]
                            }
                        }
                    });
                } else {
                    callback('Error', null);
                }
            });
            this.datastore.save.and.callFake(function (options, _tagName, callback) {
                if (_tagName) {
                    callback(null, [{
                        data: {
                            design: {
                                backgroundImage: '',
                                itemLayout: '',
                                listLayout: ''
                            },
                            content: {
                                sortBy: 'Newest'
                            }
                        }
                    }]);
                } else {
                    callback('Error', null);
                }
            });
            this.components = {
                carousel: {
                    editor: function (id) {
                        this.loadItems = function () {
                        }
                    }
                }
            };
        });
    }));

    beforeEach(function () {
        module('soundCloudPluginContent');
        inject(function ($injector, $q) {
            $rootScope = $injector.get('$rootScope');
            $timeout = $injector.get('$timeout');
            DEFAULT_DATA = $injector.get('DEFAULT_DATA');
            q = $injector.get('$q');
            soundCloudAPI = $injector.get('soundCloudAPI');
            Buildfire = $injector.get('Buildfire');
            $scope = $rootScope.$new();


            controller = $injector.get('$controller')('ContentHomeCtrl', {
                $scope: $scope,
                COLLECTIONS: $injector.get('COLLECTIONS'),
                DB: $injector.get('DB'),
                $timeout: $timeout,
                DEFAULT_DATA: DEFAULT_DATA,
                soundCloudAPI: soundCloudAPI,
                Buildfire: Buildfire
            });
            q = $q;
        });
    });

    describe('ContentHome.bodyWYSIWYGOptions is to be defined', function () {
        it('it should be defined', function () {
            expect(controller.bodyWYSIWYGOptions).toBeDefined();
            expect(controller.editor.onAddItems).toBeDefined();
        });
    });
    describe('ContentHome.editor.onAddItems when images is not there', function () {
        it('it should be defined', function () {
            controller.info = {
                data: {
                    content: {}
                }
            };
            controller.editor.onAddItems([{title: 'newImage.png'}]);
            $rootScope.$digest();
        });
    });
    describe('ContentHome.items is to be defined', function () {
        it('it should be defined', function () {
            controller.info = {
                data: {
                    content: {
                        images: []
                    }
                }
            };
            controller.editor.onAddItems([{title: 'newImage.png'}]);
            $rootScope.$digest();
        });
    });
    describe('ContentHome.editor.onDeleteItem is to be defined', function () {
        it('it should be defined', function () {
            controller.info = {
                data: {
                    content: {
                        images: [{title: 'newImage.png'}]
                    }
                }
            };
            controller.editor.onDeleteItem({title: 'newImage.png'}, 0);
            $rootScope.$digest();
        });
    });
    describe('ContentHome.editor.onItemChange is to be defined', function () {
        it('it should be defined', function () {
            controller.info = {
                data: {
                    content: {
                        images: [{title: 'newImage.png'}]
                    }
                }
            };
            controller.editor.onItemChange({title: 'newImag1e.png'}, 0);
            $rootScope.$digest();
        });
    });
    describe('ContentHome.editor.onOrderChange is to be defined', function () {
        it('it should be defined', function () {
            controller.info = {
                data: {
                    content: {
                        images: [{title: 'newImage.png'}]
                    }
                }
            };
            controller.editor.onOrderChange({title: 'newImage.png'}, 0, 0);
            $rootScope.$digest();
        });
    });
    describe('ContentHome.info watcher', function () {
        it('it should be defined', function () {
            controller.info = {
                data: {
                    content: {
                        images: []
                    }
                }
            };
            $rootScope.$apply();
            controller.info = {
                data: {
                    content: {
                        link: 'url'
                    }
                }
            };
            $rootScope.$apply();
            controller.info = {
                data: {
                    content: {
                        link: 'url'
                    },
                    design: {
                        bgImage: 'image.png'
                    }
                }
            };
            $rootScope.$digest();
            $timeout.flush();
        });
    });

    describe('WidgetHome.verify method', function () {

        it('invalid Url', function () {
            controller.info = {
                data: {
                    content: {
                        soundcloudClientID: 'ClientId',
                        link: 'url'
                    }
                }
            };
            controller.verifySoundcloudLinks();
        });
        it('valid URl', function () {
            controller.info = {
                data: {
                    content: {
                        soundcloudClientID: 'ClientId',
                        link: '/tracks/'
                    }
                }
            };
            controller.verifySoundcloudLinks();
        });
        it('without clientID', function () {
            controller.info = {
                data: {
                    content: {
                        link: 2
                    }
                }
            };
            controller.verifySoundcloudLinks();
        });
    });
});

describe("ContentHomeCtrl Error case in save and get method", function () {

    var $rootScope,
        $scope,
        controller,
        q,
        $timeout,
        DEFAULT_DATA,
        DB,
        Buildfire,
        soundCloudAPI;
    beforeEach(module('soundCloudPluginContent', function ($provide) {
        $provide.service('Buildfire', function () {
            this.datastore = jasmine.createSpyObj('datastore', ['get', 'save']);
            this.datastore.get.and.callFake(function (_tagName, callback) {
                callback({code:'No result found'}, null);
            });
            this.datastore.save.and.callFake(function (options, _tagName, callback) {
                callback('Error', null);
            });
            this.components = {
                carousel: {
                    editor: function (id) {
                        this.loadItems = function () {
                        }
                    }
                }
            };
        });
    }));

    beforeEach(function () {
        module('soundCloudPluginContent');
        inject(function ($injector, $q) {
            $rootScope = $injector.get('$rootScope');
            $timeout = $injector.get('$timeout');
            DEFAULT_DATA = $injector.get('DEFAULT_DATA');
            q = $injector.get('$q');
            soundCloudAPI = $injector.get('soundCloudAPI');
            Buildfire = $injector.get('Buildfire');
            $scope = $rootScope.$new();


            controller = $injector.get('$controller')('ContentHomeCtrl', {
                $scope: $scope,
                COLLECTIONS: $injector.get('COLLECTIONS'),
                DB: $injector.get('DB'),
                $timeout: $timeout,
                DEFAULT_DATA: DEFAULT_DATA,
                soundCloudAPI: soundCloudAPI,
                Buildfire: Buildfire
            });
            q = $q;
        });
    });

    describe('UNIT: Init', function () {
        describe('When Error', function () {
            it('it should reject and return error', function () {
                $rootScope.$digest();
            })
        });
    });
});
describe("ContentHomeCtrl Data is not there case in save and get method", function () {

    var $rootScope,
        $scope,
        controller,
        q,
        $timeout,
        DEFAULT_DATA,
        DB,
        Buildfire,
        soundCloudAPI;
    beforeEach(module('soundCloudPluginContent', function ($provide) {
        $provide.service('Buildfire', function () {
            this.datastore = jasmine.createSpyObj('datastore', ['get', 'save']);
            this.datastore.get.and.callFake(function (_tagName, callback) {
                callback(null, {});
            });
            this.datastore.save.and.callFake(function (options, _tagName, callback) {
                callback(null, null);
            });
            this.components = {
                carousel: {
                    editor: function (id) {
                        this.loadItems = function () {
                        }
                    }
                }
            };
        });
    }));

    beforeEach(function () {
        module('soundCloudPluginContent');
        inject(function ($injector, $q) {
            $rootScope = $injector.get('$rootScope');
            $timeout = $injector.get('$timeout');
            DEFAULT_DATA = $injector.get('DEFAULT_DATA');
            q = $injector.get('$q');
            soundCloudAPI = $injector.get('soundCloudAPI');
            Buildfire = $injector.get('Buildfire');
            $scope = $rootScope.$new();


            controller = $injector.get('$controller')('ContentHomeCtrl', {
                $scope: $scope,
                COLLECTIONS: $injector.get('COLLECTIONS'),
                DB: $injector.get('DB'),
                $timeout: $timeout,
                DEFAULT_DATA: DEFAULT_DATA,
                soundCloudAPI: soundCloudAPI,
                Buildfire: Buildfire
            });
            q = $q;
        });
    });

    describe('UNIT: Init', function () {
        describe('When Error', function () {
            it('it should reject and return error', function () {
                $rootScope.$digest();
            })
        });
    });
});