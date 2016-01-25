describe("DesignHomeCtrl", function () {

    var $rootScope,
        $scope,
        controller,
        q,
        $timeout,
        DEFAULT_DATA,
        Buildfire;


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
                $timeout: $timeout,
                DEFAULT_DATA: DEFAULT_DATA,
                Buildfire: {
                    /*datastore: {
                        get: function (tagName) {
                            var deferred = q.defer();
                            if(tagName){
                                deferred.resolve({data: {design:{}}});
                            }
                            else{
                                deferred.reject({error:'Error'});
                            }
                            return deferred.promise;

                        },
                        save: function (tagName,data) {
                            var deferred = q.defer();
                            if(tagName){
                                deferred.resolve({data: {design:{}}});
                            }
                            else{
                                deferred.reject({error:'Error'});
                            }
                            return deferred.promise;

                        }
                    },*/
                    imageLib: {
                        showDialog: function (options, callback) {
                            controller._callback(null, {selectedFiles: ['test']});
                        }
                    },
                    components: {
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
                    }
                }
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
            expect(controller.info.data.design.itemListLayout).toEqual('layout2');
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
})
;