
describe('buildFire-Carousel-Directive', function () {

    var $rootScope, $scope, $compile, el, $body = $('body'), simpleHtml = '<build-fire-carousel images="images"></build-fire-carousel>';


    beforeEach(function () {
        module('soundCloudPluginWidget');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $scope.images = "";//[{"imageUrl":"https://imagelibserver.s3.amazonaws.com/1440481663060-020164419920183718/fca25c50-4af5-11e5-8618-af6c4fe89f23.jpg","title":"","url":"","action":"linkToApp","openIn":"_system","actionName":"Link to App Content"}];
            $compile = $injector.get('$compile');
            el = $compile(angular.element(simpleHtml))($scope);
            $scope.$digest();
        });
    });


    it('should return an empty div with id carousel in case of no images', function () {
        expect(el.html()).toEqual('');
    });



});