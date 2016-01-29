describe("DesignHomeCtrl", function () {

    var $rootScope,
        $scope,
        controller,
        q,
        $timeout,
        DEFAULT_DATA,
        Buildfire;
    beforeEach(module('soundcloudPluginDesign', function ($provide) {
        $provide.service('Buildfire', function () {
            this.imageLib = {
                showDialog: function (options, callback) {
                    controller._callback(null, {selectedFiles: ['test']});
                }
            };
            this.datastore = jasmine.createSpyObj('datastore', ['get', 'save']);
            this.datastore.get.and.callFake(function (_tagName, callback) {
                if (_tagName) {
                    callback(null, {
                        data: {
                            design: {
                                itemListLayout: 'layout1',
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
                                itemListLayout: 'layout1',
                                bgImage: ''
                            },
                            content: {
                                images: [{title: 'bg1.png'}]
                            }
                        }
                    }]);
                } else {
                    callback('Error', null);
                }
            });
            this.components = {
                images: {
                    thumbnail: function () {
                        this.loadbackground = function (url) {
                        };
                        this.onChange = function (url) {
                        };
                        this.onDelete = function (url) {
                        };
                        return this;

                    }
                }
            };
        });
    }));


    beforeEach(function () {
        module('soundcloudPluginDesign');

        inject(function ($injector, $q) {
            $rootScope = $injector.get('$rootScope');
            $timeout = $injector.get('$timeout');
            DEFAULT_DATA = $injector.get('$q');
            q = $injector.get('DEFAULT_DATA');
            $scope = $rootScope.$new();
            controller = $injector.get('$controller')('DesignHomeCtrl', {
                $scope: $scope,
                COLLECTIONS: $injector.get('COLLECTIONS'),
                DB: $injector.get('DB'),
                Buildfire: $injector.get('Buildfire'),
                $timeout: $timeout,
                DEFAULT_DATA: DEFAULT_DATA
            });
            q = $q;
        });
    });


    describe('Initialization', function () {
        it('should initialize the listLayouts to the default value', function () {
            expect(controller.layouts.length).toEqual(4);
        });
    });
    describe('changeLayout method calling', function () {
        it('should initialize the listLayouts to the default value', function () {
            controller.info = {
                data: {
                    design: {
                        itemListLayout: 'layout1'
                    }
                }
            };
            controller.changeLayout('layout2');
            $rootScope.$apply();
            expect(controller.info.data.design.itemListLayout).toEqual('layout1');
        });
    });

    describe('updateFn', function () {
        it('should make the background image property null', function () {
            controller.info = {
                data: {
                    design: {
                        itemListLayout: 'Mno.png'
                    }
                }
            };
            $rootScope.$apply();
            //expect(controller.placeInfo.data.design.secListBGImage).toBeNull();
        });
        it('updateFn Unchanged', function () {
            controller.info = {
                id: '1', data: {
                    content: {
                        images: [],
                        description: ''
                    },
                    design: {
                        itemListLayout: "item-list-1",
                        bGImage: "bg.png"
                    }
                }
            };
            $rootScope.$apply();
            //expect(controller.placeInfo.data.design.secListBGImage).toBeNull();
        });
        it('updateFn When  id is not there', function () {
            controller.info = {
                data: {
                    content: {
                        images: [],
                        description: ''
                    },
                    design: {
                        itemListLayout: "item-list-1",
                        bGImage: "bg.png"
                    }
                }
            };
            $rootScope.$apply();
            controller.info = {
                data: {
                    content: {
                        images: [],
                        description: ''
                    },
                    design: {
                        itemListLayout: "item-list-2121",
                        bGImage: "bg.png"
                    }
                }
            };
            $rootScope.$apply();
            $timeout.flush();
            //expect(controller.placeInfo.data.design.secListBGImage).toBeNull();
        });
    })
    ;
});
describe("DesignHomeCtrl Error case", function () {

    var $rootScope,
        $scope,
        controller,
        q,
        $timeout,
        DEFAULT_DATA,
        Buildfire;
    beforeEach(module('soundcloudPluginDesign', function ($provide) {
        $provide.service('Buildfire', function () {
            this.imageLib = {
                showDialog: function (options, callback) {
                    controller._callback(null, {selectedFiles: ['test']});
                }
            };
            this.datastore = jasmine.createSpyObj('datastore', ['get', 'save']);
            this.datastore.get.and.callFake(function (_tagName, callback) {
                callback('Error', null);
            });
            this.datastore.save.and.callFake(function (options, _tagName, callback) {
                callback('Error', null);
            });
            this.components = {
                images: {
                    thumbnail: function () {
                        this.loadbackground = function (url) {
                        };
                        this.onChange = function (url) {
                        };
                        this.onDelete = function (url) {
                        };
                        return this;

                    }
                }
            };
        });
    }));


    beforeEach(function () {
        module('soundcloudPluginDesign');

        inject(function ($injector, $q) {
            $rootScope = $injector.get('$rootScope');
            $timeout = $injector.get('$timeout');
            DEFAULT_DATA = $injector.get('$q');
            q = $injector.get('DEFAULT_DATA');
            $scope = $rootScope.$new();
            controller = $injector.get('$controller')('DesignHomeCtrl', {
                $scope: $scope,
                COLLECTIONS: $injector.get('COLLECTIONS'),
                DB: $injector.get('DB'),
                Buildfire: $injector.get('Buildfire'),
                $timeout: $timeout,
                DEFAULT_DATA: DEFAULT_DATA
            });
            q = $q;
        });
    });


    describe('Initialization', function () {
        it('should initialize the listLayouts to the default value', function () {
            $rootScope.$digest();
        });
    });
});