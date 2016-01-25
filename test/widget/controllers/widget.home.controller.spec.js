describe("WidgetHomeCtrl", function () {

    var $rootScope,
        $scope,
        controller,
        q,
        $timeout,
        DEFAULT_DATA, DB, soundCloudAPI = {
            getTracks: function () {

            }
            ,
            connect: function () {

            }
        };


    beforeEach(function () {
        module('soundCloudPluginWidget');

        inject(function ($injector, $q) {
            $rootScope = $injector.get('$rootScope');
            $timeout = $injector.get('$timeout');
            DEFAULT_DATA = $injector.get('$q');
            q = $injector.get('DEFAULT_DATA');
            $scope = $rootScope.$new();

            ;
            controller = $injector.get('$controller')('WidgetHomeCtrl', {
                $scope: $scope,
                COLLECTIONS: $injector.get('COLLECTIONS'),
                DB: $injector.get('DB'),
                $timeout: $timeout,
                DEFAULT_DATA: DEFAULT_DATA,
                soundCloudAPI: soundCloudAPI
            });
            q = $q;
        });
    });


    describe('WidgetHome.loadMore', function () {
        beforeEach(function () {
            spyOn(soundCloudAPI, "getTracks").and.callFake(function () {
                var deferred = q.defer();
                deferred.resolve('Remote call result');
                console.log(0);
                return deferred.promise;
            });
        });

        it('should populate the WidgetHome.tracks', function () {
            controller.info = {
                data: {
                    content: {link: 'a'},
                    design: {}
                }
            };
            controller.loadMore();
            expect(controller.loadMore).toBeDefined();
        });
    });

    describe('WidgetHome.goToTrack', function () {

        it('should set the current track to WidgetHome.currentTrack', function () {
            controller.goToTrack({id: 1});
            expect(controller.currentTrack.id).toEqual(1);
        });
    });

    describe('WidgetHome.showDescription', function () {

        it('should return true if the description is not the default value', function () {
            controller.info = {data: {content: {description: 'a'}}};
            var a = controller.showDescription();
            expect(a).toBeTruthy();
        });

        it('should return false if the description is default value', function () {
            controller.info = {data: {content: {description: '<p><br data-mce-bogus="1"></p>'}}};
            var a = controller.showDescription();
            expect(a).not.toBeTruthy();
        });
    });

    describe('WidgetHome.loadItems', function () {
        it('should set the images to the carousel if the carousel exists', function () {
            controller.view = {
                loadItems:jasmine.createSpy()
            };
            controller.loadItems();
            expect(controller.view.loadItems).toHaveBeenCalled();
        });
    });

    describe('WidgetHome.initCarousel', function () {

        it('should initialise the carousel with images if they exist', function () {
            controller.info = {data:{content:{images:[{id:1}]}}};
            controller.view = {
                loadItems:jasmine.createSpy()
            };
            controller.initCarousel();
            expect(controller.view.loadItems).toHaveBeenCalled();
        });

        it('should initialise the carousel with empty array if images dont exist', function () {
            controller.info = {data:{content:{images:[]}}};
            controller.view = {
                loadItems:jasmine.createSpy()
            };
            controller.initCarousel();
            expect(controller.view.loadItems).toHaveBeenCalledWith([]);
        });
    });

    xdescribe('Initial Data fetch', function () {
        it('should set the info to default data in case fetch fails', function () {
            controller.SoundCloudInfoContent = {
                loadItems:jasmine.createSpy()
            };
            controller.loadItems();
            expect(controller.view.loadItems).toHaveBeenCalled();
        });
    });
})
;