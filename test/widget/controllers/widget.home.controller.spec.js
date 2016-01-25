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
        it('should initialize the listLayouts to the default value', function () {
            expect(controller.loadMore).toBeDefined();
        });
    });

})
;